# Dashboard Mockups - UI/UX Specifications

**Version:** 1.0  
**Designer:** Subagent  
**Status:** Ready for Implementation

---

## Design Philosophy

**Principles:**
- **Simplicity:** Clean, minimal interface (no clutter)
- **Clarity:** Every feature is self-explanatory
- **Speed:** Fast load times, instant feedback
- **Trust:** Professional, secure, reliable feel

**Inspiration:**
- Stripe (billing clarity)
- Linear (task management elegance)
- Notion (content organization)
- Vercel (developer experience)

---

## Color Palette

### Primary Colors
- **Purple 600:** #667eea (brand, CTAs)
- **Purple 700:** #764ba2 (hover states)
- **Purple 50:** #f5f3ff (backgrounds)

### Neutral Colors
- **Gray 900:** #111827 (headings)
- **Gray 600:** #4b5563 (body text)
- **Gray 200:** #e5e7eb (borders)
- **White:** #ffffff (cards, backgrounds)

### Status Colors
- **Green 500:** #10b981 (success, active)
- **Red 500:** #ef4444 (errors, alerts)
- **Yellow 500:** #f59e0b (warnings)
- **Blue 500:** #3b82f6 (info)

---

## Typography

**Font Family:** Inter (sans-serif)

**Scale:**
- **Heading 1:** 36px, bold (page titles)
- **Heading 2:** 24px, semibold (section headers)
- **Heading 3:** 18px, semibold (card titles)
- **Body:** 16px, regular (paragraphs)
- **Small:** 14px, regular (labels, captions)
- **Tiny:** 12px, regular (timestamps, metadata)

---

## Layout Structure

### Sidebar Navigation (Left, 240px wide)

```
┌─────────────────────┐
│ 🤖 Clawdbot         │  Logo + brand
├─────────────────────┤
│ 📊 Dashboard        │  Active (purple bg)
│ 🔌 Integrations     │
│ 🤖 Agents           │
│ 💳 Billing          │
│ ⚙️ Settings         │
├─────────────────────┤
│ 📚 Docs             │  Bottom section
│ 💬 Community        │
│ 🆘 Support          │
└─────────────────────┘
```

### Main Content Area

```
┌──────────────────────────────────┐
│ Page Title              [CTA]    │  Header (64px)
├──────────────────────────────────┤
│                                  │
│ Content Cards                    │  Main area
│ (grid or flex layout)            │
│                                  │
└──────────────────────────────────┘
```

---

## Screen 1: Dashboard Overview

### Layout

```
┌─────────────────────────────────────────────────────┐
│ Welcome back, Tom!                    [Run Task]    │
│ Here's what your AI did today                       │
├─────────────────────────────────────────────────────┤
│ ┌───────────┐ ┌───────────┐ ┌───────────┐         │
│ │ 📧 Emails │ │ 📅 Cal    │ │ ⏱️ Time   │         │
│ │ 47        │ │ 8 events  │ │ 4.5 hrs   │         │
│ │ triaged   │ │ optimized │ │ saved     │         │
│ └───────────┘ └───────────┘ └───────────┘         │
├─────────────────────────────────────────────────────┤
│ Recent Activity                         [View All]  │
│ ┌─────────────────────────────────────────────┐   │
│ │ 📧 Triaged 5 urgent emails          2m ago  │   │
│ │ 📅 Rescheduled meeting with Jakob   10m ago │   │
│ │ 🔍 Completed market research        1h ago  │   │
│ │ 💬 Summarized Slack #general        2h ago  │   │
│ └─────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│ Active Agents                                       │
│ ┌────────────────────┐ ┌────────────────────┐     │
│ │ 📧 Email Agent     │ │ 📅 Calendar Agent  │     │
│ │ ✅ Active          │ │ ✅ Active          │     │
│ │ Last: 2m ago       │ │ Last: 10m ago      │     │
│ └────────────────────┘ └────────────────────┘     │
└─────────────────────────────────────────────────────┘
```

### Key Elements

**Stats Cards (Top Row):**
- Icon + Number + Label
- White background, subtle shadow
- Hover effect: slight lift
- Click: Navigate to detailed view

**Activity Feed:**
- Icon + Description + Timestamp
- Real-time updates (Convex realtime)
- Max 10 items, "View All" link
- Click: View details/logs

**Agent Cards:**
- Agent name + icon
- Status badge (Active/Idle/Error)
- Last activity timestamp
- Configure button

---

## Screen 2: Integrations

### Layout

```
┌─────────────────────────────────────────────────────┐
│ Integrations                        [Add New]       │
│ Connect your tools to unlock automation             │
├─────────────────────────────────────────────────────┤
│ Connected (3)                                       │
│ ┌──────────────────────────────────────────────┐  │
│ │ 📧 Gmail               ✅ Connected          │  │
│ │ Last sync: 2 minutes ago   [Configure] [Remove]│
│ │ ▼ Settings                                    │  │
│ │   Auto-triage: On                             │  │
│ │   Draft responses: On                         │  │
│ └──────────────────────────────────────────────┘  │
│ ┌──────────────────────────────────────────────┐  │
│ │ 📅 Google Calendar     ✅ Connected          │  │
│ │ Last sync: 10 minutes ago  [Configure] [Remove]│
│ └──────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│ Available Integrations                              │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│ │ 💬 Slack    │ │ 💬 Discord  │ │ 📊 Notion   │  │
│ │ [Connect]   │ │ [Connect]   │ │ [Connect]   │  │
│ └─────────────┘ └─────────────┘ └─────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Interaction Flow

**Connect Integration:**
1. Click "Connect" button
2. OAuth popup opens (Gmail/Slack/etc.)
3. User grants permissions
4. Popup closes → Success message
5. Integration appears in "Connected" section
6. Agent auto-configures (skills enabled)

**Configure Integration:**
1. Click "Configure" button
2. Settings panel expands
3. Toggle switches for features
4. Changes save automatically (realtime)

---

## Screen 3: Agents

### Layout

```
┌─────────────────────────────────────────────────────┐
│ AI Agents                           [Create New]    │
│ Manage your automation workforce                    │
├─────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────┐ │
│ │ 📧 Email Intelligence Agent          ✅ Active │ │
│ │ Triages inbox, drafts responses, flags urgent  │ │
│ │                                                 │ │
│ │ Today: 47 emails triaged, 12 drafts written    │ │
│ │                                                 │ │
│ │ [View Logs] [Configure] [Pause]                │ │
│ └────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────┐ │
│ │ 📅 Calendar Optimizer           ✅ Active      │ │
│ │ Schedules meetings, blocks focus time          │ │
│ │                                                 │ │
│ │ Today: 8 events optimized, 3 hours protected   │ │
│ │                                                 │ │
│ │ [View Logs] [Configure] [Pause]                │ │
│ └────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│ Activity Logs (Real-time)                          │
│ ┌────────────────────────────────────────────────┐ │
│ │ 14:32  Email Agent: Triaged 5 emails          │ │
│ │ 14:30  Calendar Agent: Blocked 2pm-4pm        │ │
│ │ 14:28  Email Agent: Drafted response to Jakob │ │
│ └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Agent Card Details

**Header:**
- Icon + Name
- Status badge (green = active, red = error, gray = paused)
- Actions dropdown (Configure, Pause, Delete)

**Body:**
- Description (what this agent does)
- Today's stats (tasks completed)
- Last activity timestamp

**Footer:**
- View Logs (opens activity feed)
- Configure (opens settings modal)
- Pause/Resume button

---

## Screen 4: Billing

### Layout

```
┌─────────────────────────────────────────────────────┐
│ Billing                                             │
├─────────────────────────────────────────────────────┤
│ Current Plan: Professional                          │
│ ┌────────────────────────────────────────────────┐ │
│ │ 💳 $499/month                                  │ │
│ │ Next billing date: February 10, 2026           │ │
│ │                                                 │ │
│ │ [Upgrade to Enterprise] [Change Payment]       │ │
│ └────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│ Usage This Month                                    │
│ ┌────────────────────────────────────────────────┐ │
│ │ API Calls: 3,482 / 10,000                      │ │
│ │ [███████████░░░░░░░░] 34%                      │ │
│ │                                                 │ │
│ │ Agents Active: 3 / 5                           │ │
│ │ Storage Used: 1.2 GB / 10 GB                   │ │
│ └────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│ Invoices                                [View All]  │
│ ┌────────────────────────────────────────────────┐ │
│ │ Jan 2026    $499    Paid    [Download PDF]    │ │
│ │ Dec 2025    $499    Paid    [Download PDF]    │ │
│ │ Nov 2025    $499    Paid    [Download PDF]    │ │
│ └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Interactions

**Upgrade Plan:**
- Modal opens with plan comparison
- Click "Upgrade" → Confirm → Stripe charges difference
- Plan updated immediately

**Change Payment Method:**
- Stripe payment form embedded
- Update card → Success message

**Download Invoice:**
- PDF generated and downloaded
- Includes: Date, amount, services, payment method

---

## Screen 5: Settings

### Layout

```
┌─────────────────────────────────────────────────────┐
│ Settings                                            │
├─────────────────────────────────────────────────────┤
│ Tabs: [Profile] [Security] [Notifications] [API]   │
├─────────────────────────────────────────────────────┤
│ Profile                                             │
│ ┌────────────────────────────────────────────────┐ │
│ │ Name:         [Tom                          ]  │ │
│ │ Email:        [tom@example.com              ]  │ │
│ │ Company:      [Clawdbot                     ]  │ │
│ │ Timezone:     [Pacific/Auckland             ▼] │ │
│ │                                                 │ │
│ │ [Save Changes]                                  │ │
│ └────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│ Security                                            │
│ ┌────────────────────────────────────────────────┐ │
│ │ Password:     **********    [Change]           │ │
│ │ 2FA:          Enabled ✅     [Manage]           │ │
│ │ Sessions:     3 active       [View All]        │ │
│ └────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│ Danger Zone                                         │
│ ┌────────────────────────────────────────────────┐ │
│ │ ⚠️ Cancel Subscription                          │ │
│ │ Your data will be kept for 30 days             │ │
│ │ [Cancel Subscription]                           │ │
│ └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## Mobile Responsiveness

### Breakpoints
- **Desktop:** >1024px (full layout)
- **Tablet:** 768-1024px (sidebar collapses to hamburger)
- **Mobile:** <768px (single column, bottom nav)

### Mobile Adaptations
- Sidebar → Hamburger menu (top left)
- Stats cards → Stack vertically
- Tables → Cards (easier to scroll)
- CTAs → Fixed bottom bar

---

## Animations & Microinteractions

### Page Transitions
- Fade in (200ms) when navigating
- Slide up (300ms) for modals

### Button Interactions
- Hover: Slight darken (100ms)
- Click: Scale down 0.95 (50ms)
- Success: Green checkmark animation (500ms)

### Loading States
- Skeleton screens (no spinners)
- Progress bars for long operations
- Optimistic UI updates (update immediately, sync in background)

---

## Accessibility (WCAG 2.1 AA)

### Requirements
- **Contrast:** 4.5:1 minimum (text/background)
- **Focus:** Visible focus indicators (purple outline)
- **Keyboard:** All actions keyboard-accessible
- **Screen Readers:** Semantic HTML, ARIA labels
- **Text:** Resizable to 200% without breaking layout

### Testing Tools
- Lighthouse (Chrome DevTools)
- axe DevTools (browser extension)
- WAVE (web accessibility evaluation tool)

---

## Implementation Notes

### Frontend Stack
- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Components:** Headless UI (accessible by default)
- **Icons:** Heroicons or Lucide
- **Charts:** Recharts (for usage graphs)

### State Management
- **Server State:** React Query (Convex integration)
- **Client State:** Zustand (minimal, for UI state)
- **Forms:** React Hook Form + Zod validation

### Performance Targets
- **First Contentful Paint:** <1.5s
- **Largest Contentful Paint:** <2.5s
- **Time to Interactive:** <3.5s
- **Lighthouse Score:** >90

---

## Design Assets

### Mockup Files (To Create)
- `overview.png` - Dashboard overview screen
- `integrations.png` - Integrations management
- `agents.png` - Agent configuration
- `billing.png` - Billing & usage
- `settings.png` - Settings & profile

### Figma Link
(Create Figma file with full mockups)  
URL: https://figma.com/clawdbot-dashboard

---

## Next Steps

1. **Designer:** Create high-fidelity mockups in Figma
2. **Developer:** Implement components in React
3. **QA:** Test all interactions and responsive layouts
4. **Launch:** Deploy to production

---

**Built by:** Subagent (saas-final-build)  
**For:** Tom (Clawdbot CEO)  
**Status:** Ready for Design ✅
