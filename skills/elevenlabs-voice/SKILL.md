# ElevenLabs Voice Skill

## Overview
ElevenLabs is the leading AI voice platform ($11B valuation, $500M Series D - Feb 2026).

## Key Products

### 1. ElevenLabs Agents (Conversational AI)
Full platform for building voice agents that talk, type, and take action.
- **2M+ agents** created, **33M+ conversations** handled
- Deploys to: phone, web, apps
- Use cases: customer support, lead qualification, outbound calls, personal assistants, NPCs

### 2. Expressive Mode (NEW - Feb 2026)
Emotionally intelligent voice agents:
- **Eleven v3 Conversational** - Context-aware TTS, maintains conversation flow
- **Smart turn-taking** - Knows when to pause, speak, or wait based on user emotion
- **70+ languages** with emotional nuance
- Detects stress, relief, frustration from voice patterns
- Try it: https://elevenlabs.io/agents/expressive-mode

### 3. Eleven v3 (Generally Available - Feb 2026)
Most expressive TTS model ever:
- Natural pauses, emphasis, emotion
- Great for audiobooks, content, dialogue

### 4. Scribe v2 Realtime
Live transcription under 150ms:
- Industry-leading accuracy
- 90+ languages
- Real-time emotion detection

### 5. Eleven Music
Studio-grade AI music generation from text prompts.

### 6. ElevenLabs Image & Video
Integrated creative workflow with Veo, Sora, Kling, Wan, Seedance.

## Integration Options

### For Clawdbot/PREP

**Current capability:** TTS via built-in `tts` tool (works)

**Upgrade paths:**
1. **API Integration** - Use ElevenLabs API for voice cloning, custom voices
2. **ElevenAgents** - Full conversational AI (real-time voice chat)
3. **Scribe Integration** - Better real-time transcription

### API Pricing (2026)
- Free tier: Limited characters/month
- Creator: $5/month - 30k characters
- Pro: $22/month - 100k characters
- Scale: $99/month - 500k characters
- Enterprise: Custom

### API Endpoints
```
POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}
POST https://api.elevenlabs.io/v1/speech-to-text
GET  https://api.elevenlabs.io/v1/voices
```

## Jarvis-Style Setup

For Tom's "Jarvis experience":

1. **Voice Output** ✅ (have TTS)
2. **Voice Input** ✅ (voice memos transcribed)
3. **Expressive Voice** → Upgrade to ElevenLabs API
4. **Real-time Conversation** → ElevenLabs Agents

### Quick Jarvis Mode
Use TTS for:
- Morning briefings
- Update summaries
- Alerts and notifications
- Story narration

Example prompts for voice:
- "Welcome back, Tom. Here's your morning briefing..."
- "Alert: Calendar conflict detected..."
- "Good news: Payment received from..."

## Resources
- Blog: https://elevenlabs.io/blog
- Agents: https://elevenlabs.io/agents
- API Docs: https://elevenlabs.io/docs
- Expressive Mode Demo: https://elevenlabs.io/agents/expressive-mode

## Recent News (Feb 2026)
- Series D: $500M at $11B valuation
- Klarna: 10X faster resolutions with ElevenAgents
- Revolut: 8X ticket resolution improvement
- Deutsche Telekom: European telco partnership
- Government: Ukraine agentic government partnership
