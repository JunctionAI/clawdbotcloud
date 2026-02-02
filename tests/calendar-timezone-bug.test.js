/**
 * BUG REPRODUCTION TEST: Calendar Timezone Display Issue
 * 
 * Issue: Calendar events show wrong dates and times
 * - HEARTBEAT.md says: Wednesday Feb 5, 9am
 * - Calendar shows: Feb 3, 8pm
 * 
 * Root cause: Timezone conversion broken (Pacific/Auckland GMT+13)
 * 
 * FIXED: Now properly converts UTC to Pacific/Auckland using Intl.DateTimeFormat
 */

import { describe, it, expect } from '@jest/globals';
import { convertToLocalTimezone, formatEventTime } from '../scripts/outlook-calendar.js';

describe('Calendar Timezone Bug Reproduction', () => {
  
  it('should display event in correct timezone (Pacific/Auckland)', () => {
    // Known event from Outlook calendar:
    // - Subject: "PG Chairman Breakfast Meeting"
    // - HEARTBEAT.md says "Wednesday Feb 5" but Feb 5, 2026 is actually Thursday
    // - Correct date should be: Wednesday Feb 4, 2026
    // - Expected time: 9:00am NZDT (GMT+13)
    
    const eventFromAPI = {
      subject: "PG Chairman Breakfast Meeting",
      start: {
        dateTime: "2026-02-03T20:00:00.0000000", // UTC: Feb 3 8pm = Feb 4 9am NZDT
        timeZone: "UTC"
      },
      end: {
        dateTime: "2026-02-03T21:00:00.0000000",
        timeZone: "UTC"
      }
    };
    
    // Convert to Pacific/Auckland (GMT+13)
    const displayDate = convertToLocalTimezone(eventFromAPI.start.dateTime, 'Pacific/Auckland');
    
    // Expected output: Wed Feb 4, 9:00am NZDT
    expect(displayDate.date).toBe('2026-02-04');
    expect(displayDate.time).toBe('09:00:00');
    expect(displayDate.dayOfWeek).toBe('Wednesday');
  });
  
  it('should handle DST correctly for Pacific/Auckland', () => {
    // New Zealand is in DST during February (NZDT = GMT+13)
    // This test ensures we're using the correct offset
    
    const utcTime = "2026-02-03T20:00:00Z"; // 8pm UTC on Feb 3
    const nzdtTime = convertToLocalTimezone(utcTime, 'Pacific/Auckland');
    
    // 8pm UTC + 13 hours = 9am Feb 4 NZDT
    expect(nzdtTime.date).toBe('2026-02-04');
    expect(nzdtTime.time).toBe('09:00:00');
  });
  
  it('should format times correctly for display', () => {
    // Meeting: Wednesday Feb 4, 9am NZDT (HEARTBEAT.md had wrong day)
    
    const utcTime = "2026-02-03T20:00:00.0000000";
    const formatted = formatEventTime(utcTime);
    
    // Should contain key parts: Wednesday, Feb 4, 9:00
    expect(formatted).toContain('Wednesday');
    expect(formatted).toContain('Feb');
    expect(formatted).toContain('4');
    expect(formatted).toContain('9:00');
  });
  
  it('should handle Microsoft Graph datetime formats', () => {
    // Microsoft Graph returns various formats
    const formats = [
      "2026-02-03T20:00:00.0000000",
      "2026-02-03T20:00:00Z",
      "2026-02-03T20:00:00"
    ];
    
    formats.forEach(format => {
      const result = convertToLocalTimezone(format, 'Pacific/Auckland');
      expect(result.date).toBe('2026-02-04');
      expect(result.time).toBe('09:00:00');
    });
  });
  
});
