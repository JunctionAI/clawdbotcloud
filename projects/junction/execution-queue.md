# Junction Execution Queue
> **Autonomous Operations Loop** — AI executes, human approves blockers

*Last Updated: 2026-02-18 17:40 NZDT*

---

## 🚨 HUMAN BLOCKERS (Needs Tom — post-DBH, 6pm+)

### 1. GoDaddy DNS — Apex Domain
**Status:** 🔴 WAITING ON TOM
**What's needed:** Update A record at GoDaddy for `junctionmedia.ai` → `76.76.21.21` (Vercel)
**Why it matters:** Apex domain still points to Squarespace. SEO impact goes to wrong server.
**5-min fix:** GoDaddy DNS manager → A record → point to 76.76.21.21

### 2. Hero Stat Verification
**Status:** 🔴 WAITING ON TOM
**What's needed:** Confirm whether "15+ Years Experience" is accurate for Tom's bio
**Location:** Hero section on junctionmedia.ai
**Action:** Tom confirms or suggests replacement stat

### 3. Real DBH Testimonial
**Status:** 🟡 LOW PRIORITY
**What's needed:** A real quote from a DBH stakeholder (with permission to publish)
**Current state:** No testimonials live on site (fake ones removed)
**Action:** Tom to ask DBH contact for a 1-2 sentence quote

### 4. Social Handles for Nav
**Status:** 🔴 WAITING ON TOM
**What's needed:** LinkedIn URL (e.g. `/in/tomhalltaylor`) + X handle (`@tomhalltaylor` or correct handle)
**Location:** EducationContent.tsx — links currently use placeholder `#`
**Action:** Tom confirms exact handles

---

## ✅ COMPLETED (V2 Personal Brand)

- [x] Repositioned site: agency → personal brand (Tom Hall-Taylor)
- [x] New sections live: PersonalBio, AlternateShowcase, EducationContent, WorkWithMe
- [x] Removed: fake testimonials, fake scarcity, agency pricing table
- [x] CTAs updated: "Apply to Work With Us" + "Book a Strategy Call"
- [x] SEO metadata updated to personal brand positioning
- [x] OG image bug fixed (dynamic `/api/og` route)
- [x] CTA mailto links fixed (were broken `#` links)
- [x] Deployed to: www.junctionmedia.ai ✅

---

## 🤖 AI EXECUTION QUEUE (Autonomous)

### Priority 1: LinkedIn Content — Personal Brand V2 ✅ DONE
- **Status:** 3 new posts drafted (posts #4, #5, #6)
- **Tone:** Personal brand, not agency marketing
- **Location:** `projects/junction/content/linkedin/`
- **Posts ready:**
  - `post-04-personal-brand-v2-intro.md` — Who Tom is, DBH result, apply CTA
  - `post-05-ai-systems-vs-ai-tools.md` — Thought leadership, AI systems vs tools
  - `post-06-the-boutique-why.md` — Why small client count is a feature, not a bug
- **Next step:** Tom reviews + schedules (suggest: post #4 first, then #5 and #6 over 2 weeks)

### Priority 2: SEO Strategy Refresh — QUEUED
- **Status:** Pending — old SEO keyword strategy (Feb 10) targets agency keywords
- **Needed:** Refresh for personal brand / boutique positioning
- **Target keywords should shift to:**
  - "AI marketing consultant Auckland"
  - "AI marketing specialist NZ"
  - "Fractional CMO AI New Zealand"
  - Tom Hall-Taylor (personal brand SERP)
- **Blocker:** None — can do autonomously
- **ETA:** Next heartbeat if no other tasks

### Priority 3: Blog Posts Audit — QUEUED
- **Status:** Pending — 3 blog posts exist (Feb 11) targeting old agency keywords
- **Needed:** Review + update to align with personal brand positioning
- **Action:** Read existing posts, assess if salvageable or needs rewrite

### Priority 4: Case Study Draft (DBH) — QUEUED
- **Status:** Waiting for Tom confirmation of stats + permission
- **Asset:** 30% store record beat (November)
- **Format:** 1-page PDF + webpage version
- **Blocker:** Tom permission to publish DBH results publicly

---

## 📋 Execution Rules

1. **Always be working** — If blocked on one task, move to next
2. **Flag blockers early** — Surface immediately, don't wait
3. **Ship drafts for review** — 80% > waiting for 100%
4. **Personal brand voice** — Tom Hall-Taylor, not Junction Media agency
5. **No fake scarcity** — Confidence beats desperation

---

## 📊 Status Updates

### 2026-02-18 18:38 NZDT
- V2 personal brand site fully deployed ✅
- SEO keyword strategy V2 complete ✅
- 3 LinkedIn posts drafted (personal brand voice) ✅
- H1/H2 keyword hierarchy verified — clean ✅
- Image alt text: OptimizedImage component handles alt props natively ✅
- Tom pinged post-DBH with blocker list (Discord)
- Blog section scaffold: QUEUED (next autonomous task)

### 2026-02-18 17:40 NZDT
- V2 personal brand site fully deployed ✅
- 3 new LinkedIn posts drafted (personal brand voice) ✅
- Execution queue refreshed to reflect current state ✅
- Blockers documented for Tom (post-DBH, 6pm ping)
- Next autonomous task: SEO strategy refresh
