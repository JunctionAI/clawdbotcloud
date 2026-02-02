# TESTING.md - Bug Fixing Protocol

## Core Rule: Test-Driven Bug Fixes

When you (or Tom) report a bug, **DO NOT** start by trying to fix it.

### Protocol:

1. **Reproduce the bug**
   - Document exact steps to reproduce
   - Capture current (wrong) behavior
   - Identify expected (correct) behavior

2. **Write a test that fails**
   - Create a minimal test case that exposes the bug
   - The test should FAIL with the current code
   - Make it specific and verifiable

3. **Fix the bug**
   - Make the minimum change to make the test pass
   - Don't change anything else
   - If complex, spawn a sub-agent to fix it

4. **Prove the fix**
   - Run the test - it should PASS
   - Run other related tests - they should still pass
   - Document what changed and why

5. **Commit the fix + test**
   - Both go in together
   - Commit message: "Fix: [bug description] + test"

## Example: Calendar Timezone Bug (Feb 3, 2026)

**❌ What I did (wrong):**
- Changed offset to -1 day
- Checked calendar → wrong
- Changed to +2 days
- Checked calendar → wrong
- Changed to -2 days
- Checked calendar → wrong
- Repeated 6 times, wasted 30 minutes

**✅ What I should have done:**

1. **Reproduce:**
   ```
   Input: "2026-02-05T09:00:00" (Wed 9am)
   Expected: Shows Wed 9am in Outlook
   Actual: Shows Tue 7am in Outlook
   Offset: -1 day -2 hours
   ```

2. **Write test:**
   ```javascript
   // test: add event for Wed 9am, verify it shows Wed 9am
   const testEvent = await addEvent({
     subject: "TEST",
     start: "2026-02-05T09:00:00",
     end: "2026-02-05T10:00:00"
   });
   const listed = await listEvents();
   const found = listed.find(e => e.subject === "TEST");
   assert(found.start === "Wed 9am"); // FAILS with -1 day offset
   ```

3. **Fix:**
   ```javascript
   // Needed: +1 day +2 hours to compensate
   date.setDate(date.getDate() + 1);
   date.setHours(date.getHours() + 2);
   ```

4. **Prove:**
   ```
   Run test → PASSES (event shows Wed 9am)
   ```

## When to Use Sub-Agents

If the fix is complex (touches multiple files, requires research, or you're uncertain):

1. Write the failing test
2. Spawn a sub-agent: `sessions_spawn` with task "Fix [bug] - test in tests/[name].test.js must pass"
3. Sub-agent works in isolation
4. You verify the test passes when they're done

## Benefits

- No thrashing (changing code randomly hoping it works)
- Proof the bug is actually fixed
- Prevents regressions (test stays in repo)
- Faster debugging (test pinpoints the exact issue)
- Less frustration for Tom (one fix, done right)

---

**Apply this to EVERYTHING:** Calendar bugs, API issues, timezone problems, script errors, integration failures.

**No more "try this... no wait, try this... hmm, one more time..."**

Write the test. Fix the code. Prove it works. Done.
