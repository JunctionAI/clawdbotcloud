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

        const endDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
        const events = await listEvents({ endDate, limit });

        const showIds = args.includes('--ids');
        
        console.log(`\n📅 Calendar Events (next ${days} days):\n`);
        if (events.length === 0) {
          console.log('   No events scheduled.');
        } else {
          events.forEach(event => {
            const start = new Date(event.start.dateTime);
            const end = new Date(event.end.dateTime);
            console.log(`   📌 ${event.subject}`);
            console.log(`      ${start.toLocaleString('en-NZ')} → ${end.toLocaleString('en-NZ')}`);
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

main();

export { listEvents, addEvent, getAvailability };
