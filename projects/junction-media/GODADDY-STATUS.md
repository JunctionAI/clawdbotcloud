# GoDaddy DNS Status — junctionmedia.ai
**Updated:** 2026-02-19  
**Status:** ⚠️ SITE IS STILL LIVE — Manual action required (2 min)

---

## Current DNS State (Confirmed)

```
junctionmedia.ai → 198.185.159.144  (Squarespace)
junctionmedia.ai → 198.185.159.145  (Squarespace)
junctionmedia.ai → 198.49.23.144    (Squarespace)
junctionmedia.ai → 198.49.23.145    (Squarespace)
junctionmedia.ai → 216.198.79.1     (unknown — may be Squarespace CDN)
```

The site is live and publicly accessible.

---

## What Happened

The GoDaddy DNS management page is already open in Chrome:  
**Tab:** `https://dcc.godaddy.com/manage/junctionmedia.ai/dns`

The Clawdbot browser relay is attached to the Higgsfield tab, not the GoDaddy tab.  
Automated DNS changes were not possible without re-attaching the relay to the GoDaddy tab.

No GoDaddy API keys found in workspace — cannot use the API method.

---

## ✅ Fix: 2 Minutes Manual (GoDaddy DNS Tab Is Already Open)

### Step 1 — Click the GoDaddy Tab
The DNS management page is already open. Just click it.

### Step 2 — Remove the Squarespace A Records

In the DNS Records table, find all **A records** pointing to these IPs:
- `198.185.159.144`
- `198.185.159.145`
- `198.49.23.144`
- `198.49.23.145`
- `216.198.79.1`

For each one: click **Edit** (pencil icon) → **Delete** (or find a delete button)

> **GoDaddy UI tip:** There's usually a ⋮ menu or trash icon on the right of each record row.

### Step 3 — Add a Parking A Record (Optional but Clean)

After deleting, if GoDaddy shows an error about needing at least one A record, you can point it to GoDaddy's parking IP:

```
Type: A
Name: @
Value: 208.109.188.1
TTL: 600
```

This will show a GoDaddy "parked" page instead of Squarespace.

### Step 4 — Save Changes

Click **Save** at the top of the DNS records section.

**DNS TTL is likely 3600s (1 hour)** — the site will keep showing for up to 1 hour while DNS propagates globally. For faster fix, see the Squarespace option below.

---

## 🚀 Faster Alternative: Disable from Squarespace

If you're logged into Squarespace, this takes effect **instantly** (no DNS wait):

1. Go to Squarespace → **Pages** → toggle site to **Password Protected** or **Offline**
2. Or go to **Settings → Site Availability → Private** (requires a plan, but might be available)

The DNS change will still be needed for the permanent fix.

---

## When VSL URL Is Ready

To redirect junctionmedia.ai to the VSL, use GoDaddy **Forwarding**:
1. In GoDaddy DNS page → scroll down to **Forwarding** section
2. **Add Forwarding** → Domain Forwarding
3. Forward to: `[VSL URL]`
4. Type: **Permanent (301)**
5. Settings: **Forward with masking** (optional)

OR update A records to point to a redirect service.

---

## Future: Use GoDaddy API for Automation

Generate API keys at: https://developer.godaddy.com/keys  
Then DNS changes can be done via API:
```bash
curl -X DELETE "https://api.godaddy.com/v1/domains/junctionmedia.ai/records/A" \
  -H "Authorization: sso-key {KEY}:{SECRET}"
```

Save keys to: `C:\Users\Nightgalem\clawd\.env` as `GODADDY_API_KEY` and `GODADDY_API_SECRET`
