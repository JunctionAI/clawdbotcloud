# Agency Workflow - Agency-Style Workflow System

## Purpose
Think like an agency: Audit → Research → Ideation → Wireframes → Testing → Report. Multi-variant testing with screenshots, comparison reports with recommendations. Example: E-commerce CRO, content optimization.

## How It Works

1. **Audit Phase**
   - Analyze current state (website, email flow, content)
   - Identify problems and opportunities
   - Baseline metrics

2. **Research Phase**
   - Competitor analysis
   - Industry best practices
   - User behavior patterns

3. **Ideation Phase**
   - Generate 5-10 concepts/variants
   - Hypothesis for each variant
   - Expected impact

4. **Wireframe/Design Phase**
   - Create mockups for each variant
   - A/B/C/D testing setup
   - Implementation specs

5. **Testing Phase**
   - Deploy variants
   - Track performance (7-14 days)
   - Capture screenshots at intervals

6. **Report Phase**
   - Comparison with screenshots
   - Winner declared with data
   - Recommendations for next iteration

## Usage

**Start New Project:**
```bash
node scripts/agency-workflow.cjs start --type=cro --target="https://example.com"
```

**Project Types:**
- `cro` - Conversion Rate Optimization
- `email` - Email campaign optimization
- `content` - Content performance testing
- `landing-page` - Landing page variants

**View Project:**
```bash
node scripts/agency-workflow.cjs status --project-id=abc123
```

**Generate Report:**
```bash
node scripts/agency-workflow.cjs report --project-id=abc123
```

## Workflow Phases

### Phase 1: Audit (Day 1)
- Screenshot current state
- Identify conversion blockers
- Analyze heatmaps/analytics
- List optimization opportunities

### Phase 2: Research (Day 1-2)
- Analyze 5-10 competitors
- Industry benchmarks
- Best practice patterns
- User research

### Phase 3: Ideation (Day 2-3)
- Generate variant concepts
- Hypothesis for each
- Prioritize by impact/effort

### Phase 4: Wireframes (Day 3-4)
- Design mockups
- Get client approval
- Technical implementation specs

### Phase 5: Testing (Day 5-19)
- Deploy variants (A/B/C/D)
- Track metrics daily
- Screenshot each variant
- Collect user feedback

### Phase 6: Report (Day 20)
- Data analysis
- Winner declaration
- Visual comparison
- Next steps

## Example Output

```
📊 CRO PROJECT REPORT: DBH Product Page

PROJECT: product-page-cro-001
CLIENT: DBH
TYPE: Conversion Rate Optimization
DURATION: 14 days

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AUDIT FINDINGS:
✅ Strong product imagery
⚠️  CTA below fold (65% don't see it)
⚠️  No social proof above fold
⚠️  Long product description (8% read it all)
❌ No urgency/scarcity signals

BASELINE METRICS:
- Conversion rate: 2.1%
- Add-to-cart rate: 4.3%
- Bounce rate: 58%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VARIANTS TESTED:

┌─────────────────────────────────────────────────────┐
│ Variant A (Control)                                 │
│ Conversion: 2.1% | Traffic: 1,240 | Orders: 26    │
│ [Screenshot: control.png]                           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Variant B: CTA Above Fold                          │
│ Conversion: 2.8% (+33%) | Traffic: 1,255 | Orders: 35 │
│ Hypothesis: Moving CTA above fold increases visibility │
│ Result: ✅ WINNER - 33% lift in conversions        │
│ [Screenshot: variant-b.png]                         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Variant C: Social Proof + Urgency                  │
│ Conversion: 2.6% (+24%) | Traffic: 1,232 | Orders: 32 │
│ Hypothesis: Urgency drives action                   │
│ Result: ✅ Strong performer, 2nd place             │
│ [Screenshot: variant-c.png]                         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Variant D: Simplified Description                   │
│ Conversion: 2.0% (-5%) | Traffic: 1,198 | Orders: 24 │
│ Hypothesis: Shorter copy reduces friction           │
│ Result: ❌ Worse than control                      │
│ [Screenshot: variant-d.png]                         │
└─────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏆 WINNER: Variant B (+33% conversion rate)

RECOMMENDATION:
1. Ship Variant B to 100% of traffic
2. Next iteration: Combine Variant B + Variant C elements
3. Expected annual impact: +$18k revenue

NEXT STEPS:
- Deploy winner to production
- Monitor for 7 days
- Start next test: Product bundles

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Integration Points

- **Morning Brief**: Active projects status
- **Mission Control**: Track project phases
- **Puppeteer**: Automated screenshots
- **Analytics**: Track metrics
- **Supermemory**: Store learnings

## Dependencies

- Puppeteer for screenshots
- Analytics integration
- Image comparison tools

