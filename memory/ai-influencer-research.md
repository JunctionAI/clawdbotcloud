# AI Influencer Research — Tom's Digital Twin

*Created: February 17, 2026*
*Context: TOM-VISION-2026.md Layer 2 & 3 strategy*

---

## Executive Summary

Creating an AI influencer version of yourself bridges "where you are" and "where you're going." It lets you visualize the brand/lifestyle, generate consistent imagery showing aspirational scenarios, and build anticipation before everything is fully real. Key: **balance AI-generated with authentic content** and always disclose.

---

## 1. TOOL RECOMMENDATIONS

### Tier 1: Best for Consistent Character (PRIMARY)

**Midjourney v6+**
- **Pros:** Highest quality photorealistic images, excellent lighting/composition, great for lifestyle/fashion
- **Cons:** Character consistency requires skill (--cref, --sref flags), Discord-based workflow
- **Cost:** $10-60/month
- **Best for:** High-end imagery, events, lifestyle shots
- **Consistency method:** Use `--cref [image URL]` (character reference) + `--cw` (character weight)

**Flux (via Replicate/ComfyUI)**
- **Pros:** Excellent faces, open-source options, LoRA training for perfect consistency
- **Cons:** More technical setup
- **Cost:** Free-$30/month depending on platform
- **Best for:** Training a custom model of "Tom" face
- **Consistency method:** Train LoRA on 10-20 reference photos → perfect consistency

**Leonardo.ai**
- **Pros:** Character consistency built-in, easy workflow, Alchemy refinement
- **Cons:** Slightly less photorealistic than MJ
- **Cost:** $12-48/month
- **Best for:** Quick iterations, consistent character across scenarios
- **Consistency method:** Built-in "Consistent Character" feature

### Tier 2: Specialized Tools

**DALL-E 3 (ChatGPT)**
- **Pros:** Natural language prompting, good for concepts
- **Cons:** Faces less consistent, won't do real people
- **Cost:** ChatGPT Plus ($20/month)
- **Best for:** Quick concept exploration

**Stable Diffusion + LoRA**
- **Pros:** Full control, free, train on your own face
- **Cons:** Technical setup required
- **Cost:** Free (GPU required) or $10-50/month via RunPod
- **Best for:** Maximum consistency with custom-trained model

**Pika / Runway**
- **Pros:** Image-to-video, bring still images to life
- **Cons:** Still emerging tech
- **Cost:** $8-76/month
- **Best for:** Making AI Tom images into short video clips

### RECOMMENDED STACK FOR TOM

1. **Primary:** Midjourney v6 for high-end lifestyle shots
2. **Consistency:** Leonardo.ai or Flux LoRA for guaranteed face consistency
3. **Video:** Runway/Pika for bringing images to life
4. **Backup:** DALL-E 3 for quick concepts

---

## 2. VISUAL CONSISTENCY WORKFLOW

### The Challenge
AI image generators create "similar" but not "identical" faces. For a digital twin to feel real, every image must look like the same person.

### Solution A: Character Reference (Midjourney)
```
Workflow:
1. Generate or select ONE perfect "Tom" base image
2. Use --cref [URL] on all future prompts
3. Add --cw 100 for maximum face matching
4. Keep style consistent with --sref [style URL]

Example prompt:
"Professional photo of a confident 25-year-old man in a tailored suit at a tech conference, candid moment, natural lighting --cref [base_tom_url] --cw 100 --ar 4:5"
```

### Solution B: LoRA Training (Most Consistent)
```
Workflow:
1. Gather 15-25 photos of Tom (different angles, lighting, expressions)
2. Train LoRA on Flux or SD (Civitai, Replicate, or local)
3. Use trigger word in all prompts: "tom_ht man..."
4. Result: Perfect consistency, same face every time

Training services:
- Replicate: ~$5 per training
- Civitai: Free with GPU
- Astria.ai: $10-50 per model
```

### Solution C: Leonardo Consistent Character
```
Workflow:
1. Upload 1-3 reference photos
2. Enable "Consistent Character" in settings
3. Generate variations in different scenarios
4. Slight variations but recognizably same person
```

### Maintaining Style Consistency

**Create a "Tom Style Guide":**
- **Wardrobe palette:** Dark grays, black, navy, occasional bold accent
- **Hair style:** Describe specifically (length, texture, styling)
- **Aesthetic:** Modern professional, tech-forward, confident
- **Settings:** Clean backgrounds, good lighting, cinematic
- **Avoid:** Overly casual, dated styles, unflattering angles

**Prompt template:**
```
[Scene description], featuring a confident young professional man with [Tom's specific features], wearing [wardrobe from style guide], [lighting/mood], professional photography, candid authentic moment --cref [URL] --ar [ratio]
```

---

## 3. SUCCESSFUL AI INFLUENCER EXAMPLES

### Virtual Influencers (Fully AI)

**Lil Miquela** (@lilmiquela)
- 2.8M Instagram followers
- Collaborations with Prada, Samsung, Calvin Klein
- Started 2016, pioneered the space
- Lesson: Consistent aesthetic, mysterious origin, high-fashion positioning

**Imma** (@imma.gram)
- Japanese virtual model
- Works with IKEA, Porsche, Valentino
- Lesson: Hyper-realistic, places AI character in real-world photos

**Shudu** (@shudu.gram)
- Called "world's first digital supermodel"
- Featured in Vogue, Harper's Bazaar
- Lesson: Quality over quantity, editorial aesthetic

### Digital Twins (Real Person + AI Enhancement)

**What brands are doing:**
- Creating AI versions of celebrities for campaigns
- Generating B-roll content without shoots
- Testing looks/scenarios before production

**How creators use it:**
- Visualize brand direction before investing
- Generate content for engagement
- A/B test aesthetics

### Key Lessons from Successful AI Influencers

1. **Consistent aesthetic is everything** — same lighting, colors, vibe
2. **Quality > quantity** — 10 amazing images > 100 mediocre ones
3. **Mix AI + authentic** — pure AI feels hollow
4. **Have a narrative** — who is this person, what do they stand for?
5. **Disclose appropriately** — audience respects transparency

---

## 4. TOM SCENARIO CONCEPTS (5 Examples)

### Scenario 1: Tech Conference Speaker
**Setting:** Modern conference stage, large screen behind, audience visible
**Tom:** Tailored dark blazer, confident posture, mid-gesture speaking
**Lighting:** Stage lighting, professional photography
**Vibe:** Authority, expertise, commanding room
**Caption concept:** "Keynote on AI transformation in business"

### Scenario 2: High-End Consulting Session
**Setting:** Minimalist office, floor-to-ceiling windows, city view
**Tom:** Sleek business casual, leaning forward engaged in conversation
**Props:** MacBook, espresso, strategic documents
**Vibe:** Premium advisor, strategic thinker
**Caption concept:** "Building the next phase with a client"

### Scenario 3: Creative Project / On Set
**Setting:** Film set or creative workspace, monitors/equipment visible
**Tom:** More casual but still sharp, director energy
**Action:** Reviewing footage, discussing with collaborator (Zach implied)
**Vibe:** Creative visionary, hands-on leader
**Caption concept:** "Late nights building ALTERNATE"

### Scenario 4: Industry Event / Networking
**Setting:** Upscale venue, evening lighting, dressed-up crowd
**Tom:** Sharp suit, drink in hand, mid-conversation
**Context:** Film premiere, product launch, exclusive gathering
**Vibe:** Connected, social, "in the room where it happens"
**Caption concept:** "Some conversations only happen in person"

### Scenario 5: Focused Work Session
**Setting:** Clean modern workspace, multiple monitors, good lighting
**Tom:** Focused expression, casual premium (nice hoodie or henley)
**Action:** Deep work, building something
**Props:** Code on screen, AI tools visible, coffee
**Vibe:** Builder, maker, behind-the-scenes grind
**Caption concept:** "The work behind the work"

### BONUS Scenarios:
- **Travel:** Airport lounge, business class, international setting
- **Health/Fitness:** Morning routine, movement, vitality (not gym-bro)
- **Mentor moment:** Explaining something, teaching gesture
- **Product launch:** Unveiling something, ALTERNATE branded

---

## 5. ETHICAL CONSIDERATIONS & DISCLOSURE

### Current Best Practices (2025-2026)

**Disclosure Requirements:**
- **FTC (US):** Must disclose if AI-generated content in endorsements
- **ASA (UK):** AI influencers must be clearly labeled
- **General principle:** Transparency builds trust, deception destroys it

### Recommended Disclosure Approaches

**Option A: Bio disclosure**
```
"Content includes AI-assisted imagery ✨"
"AI-enhanced visuals | Real perspective"
```

**Option B: Per-post when heavily AI**
```
"[AI-assisted imagery]" in caption
"Visualizing the vision 🎨" (softer approach)
```

**Option C: Transparent positioning**
- Don't claim AI images are real photos
- Use language like "visualizing," "concept," "mood"
- When posting real photos, can note "📸 real moment"

### Tom's Recommended Approach

**Philosophy:** Be transparent without making it the whole story.

1. **Bio statement:** "Building at the intersection of AI + business. Some imagery AI-enhanced."

2. **Content mix guideline:**
   - 60% authentic (real photos, real moments)
   - 30% AI-enhanced or AI-generated
   - 10% pure creative/concept

3. **Caption approach:**
   - Real photos: No label needed
   - AI images that look real: Subtle indicator ("visualizing the brand")
   - Obviously stylized AI: No disclosure needed (clearly artistic)

4. **Never do:**
   - Claim AI image is from real event that didn't happen
   - Use AI images for testimonials/endorsements
   - Mislead about current reality

### Why This Matters for Tom's Brand

- **Layer 2 (Authority):** Credibility is everything. Getting caught being deceptive = brand death.
- **Layer 3 (Creative):** AI-generated content for creative projects is totally acceptable and even impressive.
- **Overall:** Use AI to visualize where you're going, be authentic about where you are.

---

## 6. IMPLEMENTATION WORKFLOW

### Phase 1: Foundation (Week 1-2)
1. **Gather reference photos** — 20-30 photos of Tom from multiple angles
2. **Define style guide** — wardrobe, aesthetic, settings, mood
3. **Choose primary tool** — Recommend: Midjourney + Leonardo.ai
4. **Create base character reference** — Generate ideal "Tom" base image

### Phase 2: Training & Testing (Week 2-3)
1. **Train LoRA** (optional) — For perfect consistency
2. **Test scenarios** — Generate 3-5 images per scenario
3. **Refine prompts** — Document what works
4. **Build prompt library** — Save successful prompts as templates

### Phase 3: Content Production (Ongoing)
1. **Weekly batch** — Generate 10-15 images per week
2. **Curate ruthlessly** — Only use best 20-30%
3. **Mix with authentic** — 60/40 real vs AI minimum
4. **Schedule content** — Plan posting cadence

### Phase 4: Iteration
1. **Track engagement** — Which images perform?
2. **Refine aesthetic** — Evolve based on feedback
3. **Upgrade tools** — As tech improves, adopt
4. **Eventually reduce AI** — As real life catches up to the vision

---

## 7. QUICK START ACTION ITEMS

- [ ] Subscribe to Midjourney ($30/month plan)
- [ ] Create Leonardo.ai account (free tier to start)
- [ ] Gather 20+ reference photos of Tom
- [ ] Write Tom's visual style guide (wardrobe, aesthetic, vibe)
- [ ] Generate first "base Tom" character reference image
- [ ] Create 5 test images (one per scenario above)
- [ ] Draft bio disclosure language
- [ ] Set up folder structure for AI imagery
- [ ] Document successful prompts as templates

---

## Resources & Links

- **Midjourney:** discord.gg/midjourney
- **Leonardo.ai:** leonardo.ai
- **Flux:** replicate.com/black-forest-labs/flux-1.1-pro
- **LoRA Training:** civitai.com, replicate.com
- **Virtual influencer inspo:** @lilmiquela, @imma.gram, @shudu.gram

---

*This research supports TOM-VISION-2026 Layer 2 (Personal Brand) and Layer 3 (Creative Business). The AI influencer approach visualizes the target before it's fully real, accelerating the manifestation of the brand.*
