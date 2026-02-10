#!/usr/bin/env node

/**
 * Microsoft Graph Calendar Integration
 * Access Outlook calendar for tom@junctionmedia.ai
 */

import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load credentials
const credsPath = path.join(__dirname, '..', 'microsoft-graph-credentials.json');
const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));

// Create credential
const credential = new ClientSecretCredential(
  creds.tenantId,
  creds.clientId,
  creds.clientSecret
);

// Create Graph client
const client = Client.initWithMiddleware({
  authProvider: {
    getAccessToken: async () => {
      const token = await credential.getToken('https://graph.microsoft.com/.default');
      return token.token;
    }
  }
});

/**
 * List calendar events
 */
async function listEvents(options = {}) {
  const {
    userEmail = creds.email,
    startDate = new Date(),
    endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    limit = 50
  } = options;

  try {
    const events = await client
      .api(`/users/${userEmail}/calendar/events`)
      .filter(`start/dateTime ge '${startDate.toISOString()}' and end/dateTime le '${endDate.toISOString()}'`)
      .orderby('start/dateTime')
      .top(limit)
      .select('subject,start,end,location,organizer,attendees')
      .get();

    return events.value;
  } catch (error) {
    console.error('Error fetching events:', error.message);
    throw error;
  }
}

/**
 * Add calendar event
 */
async function addEvent(options = {}) {
  const {
    userEmail = creds.email,
    subject,
    start,
    end,
    location = '',
    body = '',
    attendees = []
  } = options;

  if (!subject || !start || !end) {
    throw new Error('subject, start, and end are required');
  }

  // Format datetime for Microsoft Graph
  // Microsoft Graph + Pacific/Auckland has a +1 day bug
  // Workaround: subtract 1 day from the date string directly
  const formatDateTime = (dateStr) => {
    // Parse the date string manually (format: YYYY-MM-DDTHH:mm:ss)
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/);
    if (!match) return dateStr;

    let [, year, month, day, hour, minute, second] = match;
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day) - 1; // Subtract 1 day

    // Handle day underflow (e.g., day 0 becomes last day of previous month)
    if (day < 1) {
      month--;
      if (month < 1) {
        month = 12;
        year--;
      }
      // Days in each month (not accounting for leap years perfectly but close enough)
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (month === 2 && year % 4 === 0) daysInMonth[1] = 29; // Leap year
      day = daysInMonth[month - 1];
    }

    // Return formatted string
    const pad = (n) => String(n).padStart(2, '0');
    return `${year}-${pad(month)}-${pad(day)}T${hour}:${minute}:${second || '00'}`;
  };

  const event = {
    subject,
    start: {
      dateTime: formatDateTime(start),
      timeZone: 'Pacific/Auckland'
    },
    end: {
      dateTime: formatDateTime(end),
      timeZone: 'Pacific/Auckland'
    },
    location: {
      displayName: location
    },
    body: {
      contentType: 'text',
      content: body
    },
    attendees: attendees.map(email => ({
      emailAddress: { address: email },
      type: 'required'
    }))
  };

  try {
    const result = await client
      .api(`/users/${userEmail}/calendar/events`)
      .post(event);

    return result;
  } catch (error) {
    console.error('Error creating event:', error.message);
    throw error;
  }
}

/**
 * Get calendar availability (free/busy)
 */
async function getAvailability(options = {}) {
  const {
    userEmail = creds.email,
    startDate = new Date(),
    endDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  } = options;

  try {
    const response = await client
      .api('/users/' + userEmail + '/calendar/getSchedule')
      .post({
        schedules: [userEmail],
        startTime: {
          dateTime: startDate.toISOString(),
          timeZone: 'Pacific/Auckland'
        },
        endTime: {
          dateTime: endDate.toISOString(),
          timeZone: 'Pacific/Auckland'
        },
        availabilityViewInterval: 60 // 60-minute intervals
      });

    return response.value;
  } catch (error) {
    console.error('Error fetching availability:', error.message);
    throw error;
  }
}

/**
 * Delete calendar event
 */
async function deleteEvent(eventId, userEmail = creds.email) {
  try {
    await client
      .api(`/users/${userEmail}/calendar/events/${eventId}`)
      .delete();
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting event:', error.message);
    throw error;
  }
}

/**
 * Convert UTC datetime to Pacific/Auckland timezone with proper formatting
 * 
 * Microsoft Graph returns UTC times (e.g., "2026-02-04T20:00:00.0000000")
 * We need to convert to Pacific/Auckland (NZDT = UTC+13 during DST, NZST = UTC+12)
 * 
 * Example: "2026-02-04T20:00:00" UTC → "Wednesday Feb 5, 9:00am NZDT"
 */
function formatEventTime(utcDateTimeString) {
  // Parse the UTC datetime string
  // Microsoft Graph format: "2026-02-04T20:00:00.0000000" or "2026-02-04T20:00:00Z"
  const cleanedDateStr = utcDateTimeString.replace(/\.0+$/, '').replace(/Z$/, '');
  
  // Create Date object from UTC string
  const utcDate = new Date(cleanedDateStr + 'Z'); // Ensure it's parsed as UTC
  
  // Convert to Pacific/Auckland timezone using Intl.DateTimeFormat
  const nzFormatter = new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  });
  
  return nzFormatter.format(utcDate);
}

/**
 * Convert UTC datetime to Pacific/Auckland for testing/programmatic use
 * Returns object with date, time, dayOfWeek, timezone
 */
function convertToLocalTimezone(utcDateTimeString, timezone = 'Pacific/Auckland') {
  const cleanedDateStr = utcDateTimeString.replace(/\.0+$/, '').replace(/Z$/, '');
  const utcDate = new Date(cleanedDateStr + 'Z');
  
  // Get date components in target timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  const parts = formatter.formatToParts(utcDate);
  const get = (type) => parts.find(p => p.type === type)?.value;
  
  const dayFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long'
  });
  
  const tzFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'short'
  });
  const tzParts = tzFormatter.formatToParts(utcDate);
  const tzName = tzParts.find(p => p.type === 'timeZoneName')?.value || 'NZDT';
  
  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    time: `${get('hour')}:${get('minute')}:${get('second')}`,
    dayOfWeek: dayFormatter.format(utcDate),
    timezone: tzName
  };
}

/**
 * CLI interface
 */
async function main() {
  const [action, ...args] = process.argv.slice(2);

  if (!action) {
    console.log(`
Microsoft Graph Calendar CLI

Usage:
  node scripts/outlook-calendar.js list [--days 7] [--limit 50]
  node scripts/outlook-calendar.js add --subject "Meeting" --start "2026-02-03T10:00" --end "2026-02-03T11:00" [--location "Office"] [--body "Description"]
  node scripts/outlook-calendar.js delete --id "EVENT_ID"
  node scripts/outlook-calendar.js availability [--hours 24]
    `);
    return;
  }

  try {
    switch (action) {
      case 'list': {
        const daysArg = args.find(a => a.startsWith('--days='));
        const limitArg = args.find(a => a.startsWith('--limit='));
        
        const days = daysArg ? parseInt(daysArg.split('=')[1]) : 7;
        const limit = limitArg ? parseInt(limitArg.split('=')[1]) : 50;
        const jsonOutput = args.includes('--json');

        const endDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
        const events = await listEvents({ endDate, limit });

        const showIds = args.includes('--ids');
        
        // JSON output for programmatic access (e.g., JARVIS HUD)
        if (jsonOutput) {
          const jsonEvents = events.map(event => ({
            id: event.id,
            subject: event.subject,
            start: event.start.dateTime,
            end: event.end.dateTime,
            location: event.location?.displayName || ''
          }));
          console.log(JSON.stringify({ events: jsonEvents }));
          break;
        }
        
        console.log(`\n📅 Calendar Events (next ${days} days):\n`);
        if (events.length === 0) {
          console.log('   No events scheduled.');
        } else {
          events.forEach(event => {
            // Fix: Properly convert to Pacific/Auckland timezone
            // Microsoft Graph returns UTC times, we need to display in Pacific/Auckland (NZDT/NZST)
            const startLocal = formatEventTime(event.start.dateTime);
            const endLocal = formatEventTime(event.end.dateTime);
            
            console.log(`   📌 ${event.subject}`);
            console.log(`      ${startLocal} → ${endLocal}`);
            if (event.location?.displayName) {
              console.log(`      📍 ${event.location.displayName}`);
            }
            if (showIds) {
              console.log(`      🆔 ${event.id}`);
            }
            console.log('');
          });
        }
        break;
      }

      case 'add': {
        const subject = args.find(a => a.startsWith('--subject='))?.split('=')[1];
        const start = args.find(a => a.startsWith('--start='))?.split('=')[1];
        const end = args.find(a => a.startsWith('--end='))?.split('=')[1];
        const location = args.find(a => a.startsWith('--location='))?.split('=')[1] || '';
        const body = args.find(a => a.startsWith('--body='))?.split('=')[1] || '';

        if (!subject || !start || !end) {
          console.error('❌ Missing required arguments: --subject, --start, --end');
          process.exit(1);
        }

        const event = await addEvent({ subject, start, end, location, body });
        console.log(`✅ Event created: ${event.subject}`);
        console.log(`   ID: ${event.id}`);
        break;
      }

      case 'delete': {
        const idArg = args.find(a => a.startsWith('--id='));
        const eventId = idArg?.split('=')[1];

        if (!eventId) {
          console.error('❌ Missing required argument: --id');
          process.exit(1);
        }

        await deleteEvent(eventId);
        console.log(`✅ Event deleted: ${eventId}`);
        break;
      }

      case 'availability': {
        const hoursArg = args.find(a => a.startsWith('--hours='));
        const hours = hoursArg ? parseInt(hoursArg.split('=')[1]) : 24;

        const endDate = new Date(Date.now() + hours * 60 * 60 * 1000);
        const availability = await getAvailability({ endDate });

        console.log(`\n🕐 Availability (next ${hours} hours):\n`);
        console.log(JSON.stringify(availability, null, 2));
        break;
      }

      default:
        console.error(`❌ Unknown action: ${action}`);
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run main
main();

export { listEvents, addEvent, getAvailability, convertToLocalTimezone, formatEventTime };
