# Ally Email Templates

Transactional email templates for Clawdbot/Ally.

## Templates

| Template | Purpose | Trigger |
|----------|---------|---------|
| `welcome` | New user onboarding | After signup |
| `upgrade-confirmation` | Plan upgrade receipt | After successful upgrade |
| `payment-failed` | Payment issue notification | After failed payment attempt |
| `trial-ending` | Trial expiration warning | 3 days before trial ends |
| `weekly-digest` | Activity summary | Weekly (configurable day) |
| `family-invite` | Family plan invitation | When user invites family member |

## File Structure

Each template has two versions:
- `.html` — Full HTML email with inline CSS
- `.txt` — Plain text fallback

## Template Variables

Templates use Handlebars-style `{{variable}}` syntax. Common variables:

### Global (all templates)
- `{{companyName}}` — Company name
- `{{companyAddress}}` — Physical address (CAN-SPAM)
- `{{unsubscribeUrl}}` — Unsubscribe link
- `{{preferencesUrl}}` — Email preferences link
- `{{appUrl}}` — Main app URL

### User-specific
- `{{firstName}}` — User's first name
- `{{email}}` — User's email address

### Template-specific

**upgrade-confirmation:**
- `{{planName}}` — Name of the plan (e.g., "Ally Pro")
- `{{amount}}` — Price (e.g., "$19.99")
- `{{billingPeriod}}` — "month" or "year"
- `{{nextBillingDate}}` — Next charge date
- `{{features}}` — Array of unlocked feature strings
- `{{billingUrl}}` — Billing management URL
- `{{receiptUrl}}` — Receipt URL

**payment-failed:**
- `{{planName}}` — Current plan name
- `{{cardBrand}}` — Card type (Visa, Mastercard, etc.)
- `{{cardLast4}}` — Last 4 digits of card
- `{{amount}}` — Failed charge amount
- `{{updatePaymentUrl}}` — Payment update URL
- `{{gracePeriodEnd}}` — Date account will be paused
- `{{billingUrl}}` — Billing management URL

**trial-ending:**
- `{{tasksCompleted}}` — Number of tasks completed
- `{{timeSaved}}` — Hours saved (e.g., "4.5")
- `{{conversations}}` — Number of conversations
- `{{highlights}}` — Array of `{icon, text}` objects
- `{{planName}}` — Recommended plan name
- `{{amount}}` — Plan price
- `{{billingPeriod}}` — "month" or "year"
- `{{upgradeUrl}}` — Upgrade URL
- `{{comparePlansUrl}}` — Plan comparison URL

**weekly-digest:**
- `{{weekDateRange}}` — e.g., "Jan 20 - Jan 26, 2025"
- `{{tasksCompleted}}` — Tasks completed this week
- `{{timeSaved}}` — Hours saved this week
- `{{emailsManaged}}` — Emails managed
- `{{remindersSet}}` — Reminders created
- `{{activities}}` — Array of `{icon, iconBg, title, description, timestamp}`
- `{{upcoming}}` — Array of `{date, event}` for next week
- `{{tip}}` — Tip of the week text
- `{{feedbackUrl}}` — Feedback form URL

**family-invite:**
- `{{inviterName}}` — Name of person who sent invite
- `{{acceptInviteUrl}}` — Invitation acceptance URL
- `{{expirationDate}}` — When invitation expires
- `{{personalNote}}` — Optional note from inviter (conditional)
- `{{helpUrl}}` — Help center URL

## Design System

### Colors
- **Primary:** `#6366f1` (Indigo)
- **Success:** `#22c55e` (Green)
- **Warning:** `#f59e0b` (Amber)
- **Error:** `#ef4444` (Red)
- **Text primary:** `#1f2937`
- **Text secondary:** `#6b7280`
- **Text muted:** `#9ca3af`
- **Background:** `#f8f9fa`

### Typography
- Font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- Headers: 24-28px, weight 600
- Body: 15-16px, line-height 1.6
- Small: 12-14px

### Spacing
- Container padding: 48px horizontal
- Section spacing: 32px vertical
- Border radius: 10-16px

## Brand Voice

- **Warm, not corporate** — "Hey {{firstName}}" not "Dear Customer"
- **Helpful, not pushy** — Show value, don't demand action
- **Personal** — Ally speaks in first person ("I helped you...")
- **Emoji-friendly** — Use sparingly for warmth (👋 ✨ 💜)
- **Life, handled.** — Always include tagline

## Testing

Test templates with:
1. [Litmus](https://litmus.com) or [Email on Acid](https://emailonacid.com)
2. Real email clients (Gmail, Outlook, Apple Mail)
3. Mobile devices (iOS Mail, Gmail app)

## Rendering

Templates can be rendered with any Handlebars-compatible library:

```javascript
const Handlebars = require('handlebars');
const template = Handlebars.compile(htmlString);
const html = template({
  firstName: 'Sarah',
  appUrl: 'https://app.ally.so',
  // ... other variables
});
```

## Notes

- All CSS is inline for maximum email client compatibility
- Tables used for layout (email clients don't support flexbox/grid reliably)
- Images should be hosted on CDN (not embedded)
- Test dark mode rendering in supported clients
- Keep total email size under 102KB (Gmail clipping threshold)
