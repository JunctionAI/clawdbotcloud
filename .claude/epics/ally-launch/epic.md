---
name: ally-launch
status: backlog
created: 2026-02-04T20:44:57Z
progress: 0%
prd: .claude/prds/ally-launch.md
github:
---

# Epic: Ally Launch

## Overview

Launch Ally as a consumer-facing AI personal assistant brand powered by Clawdbot. This epic covers branding, pricing infrastructure, marketing pages, and core feature differentiation from competitors.

The technical implementation leverages existing Clawdbot infrastructure — this epic focuses on **productizing and packaging** rather than building from scratch.

## Architecture Decisions

### Key Technical Decisions

1. **Leverage Clawdbot Core:** Ally is a brand layer on top of existing Clawdbot capabilities
   - Conversation engine: Already built
   - Memory system: Already built
   - Action framework: Already built
   - Multi-channel: Already built

2. **Brand Separation:** Ally has its own identity but shares backend with Clawdbot
   - Separate landing pages, docs, onboarding
   - Shared authentication and billing infrastructure
   - Clawdbot = power users/developers, Ally = consumers

3. **Pricing via Stripe:** Use Stripe for subscription management
   - Product catalog with tier metadata
   - Metered billing for overages (future)
   - Family plan as multi-seat subscription

4. **Memory as Differentiator:** Emphasize memory in UX
   - "Ally remembers" callouts throughout
   - Memory settings page
   - Export your memory feature

## Technical Approach

### Branding & Design
- Logo, color palette, typography
- Consistent "Life, handled" messaging
- Warm, approachable, trustworthy aesthetic
- Mobile-first responsive design

### Landing & Marketing Pages
- Homepage with value proposition
- Feature comparison vs competitors
- Pricing page with tier selector
- About/team page

### Onboarding Flow
- Account creation (email, Google, Apple)
- Integration connection wizard
- Memory seeding questions
- First conversation guidance

### Pricing Infrastructure
- Stripe product setup
- Subscription management
- Usage tracking
- Upgrade/downgrade flows

### Mobile Experience
- Web app (PWA initially)
- iOS/Android apps (React Native)
- Push notifications
- Widget support

## Implementation Strategy

### Phase 1: Foundation (Tasks 001-003)
- Brand identity finalization
- Landing page
- Basic pricing setup

### Phase 2: Onboarding (Tasks 004-006)
- Auth flows
- Integration wizard
- Memory seeding

### Phase 3: Distribution (Tasks 007-010)
- Mobile apps
- Marketing automation
- Launch materials

### Risk Mitigation
- Start with PWA before native apps
- Soft launch via Discord community
- A/B test pricing page messaging

## Task Breakdown Preview

- [ ] 001: Brand identity and design system
- [ ] 002: Landing page and marketing site
- [ ] 003: Pricing infrastructure (Stripe)
- [ ] 004: User onboarding flow
- [ ] 005: Integration connection wizard
- [ ] 006: Memory UX and settings
- [ ] 007: Mobile web app (PWA)
- [ ] 008: iOS/Android apps
- [ ] 009: Family plan implementation
- [ ] 010: Launch campaign materials

## Dependencies

### External Dependencies
- Stripe account and API keys
- Domain registration (ally.ai or similar)
- App store developer accounts
- Design assets (logo, illustrations)

### Internal Dependencies
- Clawdbot core platform stable
- Memory system API finalized
- Integration framework documented
- Multi-tenant capability

## Success Criteria (Technical)

- Landing page loads in <2s (LCP)
- Onboarding completion rate >70%
- Integration success rate >90%
- App store approval (iOS/Android)
- Zero critical bugs in payment flow

## Estimated Effort

- **Overall timeline:** 6-8 weeks
- **Team size:** 2-3 developers + 1 designer
- **Critical path:** Brand → Landing → Pricing → Onboarding → Launch

### Effort by Task Category
| Category | Effort | Parallelizable |
|----------|--------|----------------|
| Branding | 1 week | No |
| Landing Pages | 1 week | Yes (after brand) |
| Pricing | 1 week | Yes (after brand) |
| Onboarding | 2 weeks | Yes |
| Mobile | 2 weeks | Yes |
| Launch | 1 week | No |

## Subagent Integration

This epic is designed for parallel execution using Clawdbot's subagent system:

### Parallel Work Streams

**Stream A: Brand & Design**
- Agent focus: Visual identity, design system, assets
- Files: `/brand/*`, `/design/*`
- Owner: Designer subagent

**Stream B: Frontend**
- Agent focus: Landing pages, onboarding UI
- Files: `/web/*`, `/components/*`
- Owner: Frontend subagent

**Stream C: Backend/Infrastructure**
- Agent focus: Stripe, auth, APIs
- Files: `/api/*`, `/services/*`
- Owner: Backend subagent

**Stream D: Mobile**
- Agent focus: PWA, native apps
- Files: `/mobile/*`, `/pwa/*`
- Owner: Mobile subagent

### Coordination Points
- Brand must complete before other streams start heavy work
- Pricing backend must complete before frontend integration
- All streams sync daily via progress files

### Subagent Commands
```bash
# Start epic with subagent coordination
/pm:epic-start ally-launch

# Check status across all streams
/pm:epic-status ally-launch

# Sync work from all subagents
/pm:epic-sync ally-launch
```

## Tasks Created

- [ ] 001.md - Brand identity and design system (parallel: false) — BLOCKING
- [ ] 002.md - Landing page and marketing site (parallel: true)
- [ ] 003.md - Pricing infrastructure (Stripe) (parallel: true)
- [ ] 004.md - User onboarding flow (parallel: true)
- [ ] 005.md - Integration connection wizard (parallel: true)
- [ ] 006.md - Memory UX and settings (parallel: true)
- [ ] 007.md - Mobile web app (PWA) (parallel: true)
- [ ] 008.md - iOS/Android apps (parallel: true)
- [ ] 009.md - Family plan implementation (parallel: true)
- [ ] 010.md - Launch campaign materials (parallel: true)

**Total tasks:** 10
**Parallel tasks:** 9 (after 001 completes)
**Sequential tasks:** 1 (001 - brand blocks everything)
**Estimated total effort:** 220-320 hours (6-8 weeks with 2-3 devs)

### Dependency Graph

```
001 (Brand) ─┬─→ 002 (Landing) ─┬─→ 007 (PWA) ─→ 008 (Native)
             │                   │
             ├─→ 003 (Pricing) ──┼─→ 004 (Onboarding) ─→ 005 (Integrations)
             │                   │
             ├─→ 006 (Memory) ───┘
             │
             └─→ 010 (Marketing)
                                   
003 (Pricing) + 006 (Memory) ─→ 009 (Family)
```

## Notes

- Family plan is key differentiator — don't deprioritize
- Memory UX should be prominent, not hidden in settings
- Landing page should A/B test "AI that does things" vs "Life, handled"
- Consider soft launch via existing Clawdbot Discord community
