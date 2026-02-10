---
name: higgsfield
description: Generate AI videos and images using Higgsfield.ai via browser automation. Use when generating cinematic video content, AI video clips, image-to-video, or text-to-video. Triggers: Higgsfield, AI video, generate video, video generation, animate image.
---

# Higgsfield Browser Automation

Generate AI videos and images through higgsfield.ai using Chrome browser relay.

## Prerequisites

1. User must have Chrome extension relay active
2. User must be logged into higgsfield.ai
3. Tab must be attached (click Clawdbot extension icon on Higgsfield tab)

## Quick Start

```
1. browser action=snapshot profile=chrome → verify Higgsfield UI loaded
2. Navigate to generation page if needed
3. Fill prompt field
4. Select model/settings
5. Click generate
6. Poll for completion
7. Download result
```

## UI Navigation

### Main Pages
- **Home:** `https://higgsfield.ai/` - Dashboard with recent generations
- **Create:** `https://higgsfield.ai/create` - New generation interface
- **Gallery:** `https://higgsfield.ai/gallery` - Browse all outputs

### Generation Flow

1. **Open Create Page**
   ```
   browser action=navigate targetUrl="https://higgsfield.ai/create" profile=chrome
   ```

2. **Take Snapshot**
   ```
   browser action=snapshot profile=chrome
   ```
   Look for: prompt textarea, model selector, generate button

3. **Enter Prompt**
   Find the prompt textarea ref, then:
   ```
   browser action=act profile=chrome request={kind:"type", ref:"<textarea_ref>", text:"your prompt here"}
   ```

4. **Select Model** (if needed)
   Click model dropdown, select desired model

5. **Click Generate**
   Find generate button ref:
   ```
   browser action=act profile=chrome request={kind:"click", ref:"<generate_button_ref>"}
   ```

6. **Wait for Generation**
   Poll snapshot every 30-60s, look for:
   - Progress indicator (percentage, loading spinner)
   - Completed video/image preview
   - Download button appearance

7. **Download Result**
   Click download button when available

## Model Options

See `references/models.md` for full model specs and use cases.

### Quick Reference
- **Image Gen:** Fast image generation from text
- **Image-to-Video:** Animate a static image
- **Text-to-Video:** Full video from text prompt

## Prompt Engineering

### Cinematic Style Keywords
- Aspect ratios: "16:9 cinematic", "2:3 portrait", "1:1 square"
- Quality: "film grain", "anamorphic lens", "theatrical quality"
- Lighting: "golden hour", "neon-soaked", "dramatic chiaroscuro"
- Style refs: "Blade Runner aesthetic", "Wes Anderson colors", "Ridley Scott epic"

### Structure
```
[Subject] + [Action/Pose] + [Environment] + [Lighting] + [Style] + [Technical]
```

Example:
```
Young man with dark curly hair wearing orange tactical visor, riding futuristic motorcycle through neon Tokyo streets. Rain-slicked road reflecting pink cyan lights. Motion blur, anamorphic lens flares, Blade Runner meets Akira. 16:9 cinematic.
```

## Error Handling

### Common Issues

| Issue | Solution |
|-------|----------|
| "No tab connected" | Ask user to click Clawdbot extension icon on Higgsfield tab |
| Login required | Ask user to log in, then reattach tab |
| Generation stuck | Refresh page, retry generation |
| Rate limited | Wait 5-10 minutes, try again |
| Credits exhausted | Alert user, check subscription status |

### Recovery Pattern
```
1. Take snapshot to assess state
2. If error visible, capture error text
3. Navigate back to /create if needed
4. Retry generation
5. If persistent, alert user with details
```

## Task Queue Integration

For autonomous operation, add tasks to `autonomous/task-queue.json`:

```json
{
  "id": "hf_001",
  "type": "video_generation",
  "priority": "high",
  "project": "PROJECT_NAME",
  "title": "Descriptive Title",
  "prompt": "Full generation prompt",
  "model": "text-to-video",
  "outputPath": "autonomous/output/higgsfield/filename.mp4",
  "status": "pending",
  "createdAt": "ISO_TIMESTAMP"
}
```

## Best Practices

1. **Always snapshot first** - Confirm UI state before actions
2. **Use targetId** - Keep the same tab across actions
3. **Poll patiently** - Video gen can take 2-5 minutes
4. **Save outputs** - Download and archive all generations
5. **Log everything** - Update task-queue.json with status
