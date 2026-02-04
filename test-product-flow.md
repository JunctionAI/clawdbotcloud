# Product Testing Checklist - Run Before Launch

## Test #1: Landing Page
- [ ] Visit https://clawdbotdashboard2.vercel.app/
- [ ] Check hero loads properly
- [ ] Verify all pricing tiers display correctly  
- [ ] Test "Start Free Trial" buttons work
- [ ] Check mobile responsive
- [ ] Verify FAQ section loads
- [ ] Test footer links

## Test #2: Checkout Flow
- [ ] Click "Start Free Trial" on Pro ($79)
- [ ] Redirects to Stripe Checkout
- [ ] Test card: 4242 4242 4242 4242
- [ ] Fills in test email + details
- [ ] Completes payment
- [ ] Redirects to success page

## Test #3: Success Page & Provisioning
- [ ] Success page shows "provisioning..." spinner
- [ ] Polls backend for status
- [ ] Shows credentials when ready (workspace ID, URL, API key)
- [ ] "Go to Dashboard" button works

## Test #4: Workspace Chat
- [ ] Visit workspace URL from success page
- [ ] Chat interface loads
- [ ] Send message: "Hello, who are you?"
- [ ] Get response from Clawdbot
- [ ] Send message: "Remember: my favorite color is blue"
- [ ] Send message: "What's my favorite color?"
- [ ] Verify it remembers

## Test #5: Backend Verification
- [ ] Check Railway logs for webhook received
- [ ] Verify customer in database (query Neon)
- [ ] Confirm workspace folder created
- [ ] Check config.json has correct limits
- [ ] Verify email sent (check Railway logs)

## Test #6: Dashboard
- [ ] Visit /dashboard
- [ ] Shows usage stats
- [ ] Plan information correct
- [ ] "Manage Billing" link works

## Test #7: Edge Cases
- [ ] Try invalid Stripe card (4000 0000 0000 0002)
- [ ] Verify error handling
- [ ] Test with already-used email
- [ ] Check rate limiting works
- [ ] Test SQL injection attempt
- [ ] Test XSS attempt

## Test #8: Performance
- [ ] Page load time < 2 seconds
- [ ] Chat response time < 3 seconds
- [ ] No console errors
- [ ] Mobile performance good
- [ ] Lighthouse score > 90

## Test #9: User Experience
- [ ] Signup to working bot < 2 minutes
- [ ] UI feels premium
- [ ] No confusing steps
- [ ] Error messages helpful
- [ ] Loading states present

## Test #10: Marketing
- [ ] Copy is compelling
- [ ] Social proof visible
- [ ] Pricing is clear
- [ ] CTAs are obvious
- [ ] Differentiation from ChatGPT clear

---

## Critical Bugs (Fix Immediately)
- [ ] 

## Minor Issues (Fix If Time)
- [ ] 

## Enhancement Ideas (Post-Launch)
- [ ] 

---

**Test Results:**
- Date: 2026-02-04
- Tester: 
- Pass/Fail: 
- Notes:
