# LinkedIn Outreach Tracker - Chrome Extension

Track LinkedIn messages, automate follow-ups, never lose a lead.

## Features

✅ **Auto-detection** - Automatically tracks when you send LinkedIn messages
✅ **Smart tracking** - Captures name, company, message text, timestamp
✅ **Follow-up reminders** - Get notifications at 3, 7, and 14 days
✅ **Response detection** - Marks leads as responded automatically
✅ **Lead management** - Organize by status (pending/responded/dead) and temperature (cold/warm/hot)
✅ **Analytics dashboard** - View conversion rates, pending follow-ups, and full history
✅ **CSV Export** - Export your data anytime

## Installation (Development)

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `extension` folder

## Installation (Chrome Web Store)

Coming soon! Extension will be available at: https://chrome.google.com/webstore/

## Usage

1. **Install the extension** and pin it to your toolbar
2. **Go to LinkedIn** and start messaging prospects
3. **Send messages normally** - the extension automatically tracks them
4. **Check the badge** for pending follow-ups (red number on icon)
5. **Click the icon** for quick stats or open the full dashboard

## Monetization

**Free Tier:**
- Track up to 10 leads
- Local storage only
- Basic export

**Pro Tier - $19/month:**
- Unlimited tracking
- Cloud sync across devices
- Advanced analytics
- Priority support

## Tech Stack

- Vanilla JavaScript (lightweight, fast)
- IndexedDB (local storage)
- Chrome Extensions Manifest V3
- No external dependencies

## Privacy

✅ All data stored locally on your device
✅ No data sent to external servers (free tier)
✅ Pro tier: Encrypted cloud backup (opt-in)
✅ No tracking, no ads

## Development

### File Structure

```
extension/
├── manifest.json        # Extension config
├── background.js        # Service worker (alarms, notifications)
├── content.js          # LinkedIn DOM injection
├── storage.js          # IndexedDB wrapper
├── popup.html/js       # Quick view popup
├── dashboard.html/js   # Full analytics dashboard
├── content.css         # Minimal styling for LinkedIn
└── icons/              # Extension icons (16, 48, 128px)
```

### Key Features Implementation

**Auto-detection:**
- MutationObserver watches LinkedIn messaging DOM
- Detects send button clicks and message submissions
- Extracts recipient data from conversation headers
- Deduplicates using message hash

**Follow-up system:**
- Chrome Alarms API checks every hour
- Notifications triggered when nextFollowUp <= now
- Configurable intervals (3/7/14 days)

**Lead limits:**
- Free tier: 10 leads max (enforced in background.js)
- Upgrade modal shown when limit reached
- Pro tier: Unlimited (license key validation)

## Testing

1. Go to https://www.linkedin.com/messaging/
2. Send a test message to a connection
3. Check popup (click extension icon)
4. Verify lead appears in dashboard
5. Test follow-up notifications (set nextFollowUp to past date)

## Chrome Web Store Submission

### Required Assets:
- [ ] Extension icons (16, 48, 128px)
- [ ] Screenshots (1280x800 or 640x400)
- [ ] Promotional tile (440x280)
- [ ] Store description (see below)
- [ ] Privacy policy URL

### Store Description Template:

**Short description (132 chars max):**
Track LinkedIn messages, automate follow-ups, never lose a lead. Free for 10 leads.

**Full description:**
LinkedIn Outreach Tracker helps sales reps, recruiters, and networkers organize their LinkedIn outreach.

Stop losing track of who you've messaged, when to follow up, and who's responded.

KEY FEATURES:
✅ Auto-track sent messages
✅ Follow-up reminders (3, 7, 14 days)
✅ Response detection
✅ Lead status tracking
✅ Conversion analytics
✅ CSV export

PERFECT FOR:
- Sales Development Reps
- Recruiters
- Business Development
- Job seekers networking

FREE TIER: 10 tracked leads
PRO TIER: Unlimited tracking ($19/month)

Privacy: All data stored locally. No tracking, no ads.

## License

Proprietary - All rights reserved

## Support

- Email: support@linkedintracker.app
- Website: https://linkedintracker.app
- Discord: (coming soon)

---

Built with ❤️ for sales professionals who refuse to let leads slip through the cracks.
