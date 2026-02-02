#!/usr/bin/env node
/**
 * AI Content Generator
 * Generates blogs, Twitter threads, LinkedIn posts, YouTube scripts
 * Uses OpenAI API (or Anthropic Claude)
 */

const fs = require('fs');
const path = require('path');

class ContentGenerator {
  constructor(config = {}) {
    this.apiKey = config.apiKey || process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;
    this.model = config.model || 'gpt-4';
    this.expertise = config.expertise || ['marketing', 'AI', 'productivity'];
    this.templatesDir = path.join(__dirname, '..', 'templates');
    this.outputDir = path.join(__dirname, '..', 'data', 'generated');
    
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Generate blog post
   */
  async generateBlogPost(topic, keywords = [], length = 1500) {
    const template = this.loadTemplate('blog', 'default.txt');
    const prompt = `You are an expert in ${this.expertise.join(', ')}.

Write a comprehensive blog post about: ${topic}

Target keywords: ${keywords.join(', ')}
Length: approximately ${length} words

Include:
- Compelling headline (SEO-optimized)
- Hook that grabs attention
- Clear subheadings (H2, H3)
- Actionable insights
- Personal anecdotes or examples
- Strong CTA at the end
- Meta description (150 chars)

Write in a conversational, authoritative tone. Make it valuable and shareable.`;

    const content = await this.callAI(prompt);
    
    const fileName = `blog_${this.slugify(topic)}_${Date.now()}.md`;
    const filePath = path.join(this.outputDir, fileName);
    
    fs.writeFileSync(filePath, content);
    
    return {
      type: 'blog',
      topic,
      keywords,
      content,
      filePath,
      wordCount: content.split(/\s+/).length
    };
  }

  /**
   * Generate Twitter thread
   */
  async generateTwitterThread(topic, tweetCount = 7) {
    const prompt = `You are a ${this.expertise.join('/')} expert on Twitter with a large following.

Create a viral Twitter thread about: ${topic}

Requirements:
- ${tweetCount} tweets (numbered)
- First tweet must be a hook that stops scrolling
- Each tweet max 280 characters
- Mix of insights, stats, and actionable tips
- End with a CTA (follow, retweet, check link in bio)
- Use line breaks for readability
- No hashtags in first tweet, max 2 hashtags total

Make it valuable, shareable, and conversation-starting.`;

    const content = await this.callAI(prompt);
    
    const fileName = `twitter_${this.slugify(topic)}_${Date.now()}.txt`;
    const filePath = path.join(this.outputDir, fileName);
    
    fs.writeFileSync(filePath, content);
    
    return {
      type: 'twitter',
      topic,
      content,
      filePath,
      tweetCount: this.parseThreadCount(content)
    };
  }

  /**
   * Generate LinkedIn post
   */
  async generateLinkedInPost(topic, style = 'professional') {
    const prompt = `You are a thought leader in ${this.expertise.join(', ')} on LinkedIn.

Write a LinkedIn post about: ${topic}

Style: ${style}

Requirements:
- Hook in first line (no "I'm excited to share...")
- 1300-1500 characters (optimal length)
- Personal story or case study
- Clear value/lesson
- Strong CTA
- 3-5 relevant hashtags at the end

Make it:
- Authentic and vulnerable (where appropriate)
- Actionable
- Shareable
- Comment-worthy`;

    const content = await this.callAI(prompt);
    
    const fileName = `linkedin_${this.slugify(topic)}_${Date.now()}.txt`;
    const filePath = path.join(this.outputDir, fileName);
    
    fs.writeFileSync(filePath, content);
    
    return {
      type: 'linkedin',
      topic,
      content,
      filePath,
      charCount: content.length
    };
  }

  /**
   * Generate YouTube video script
   */
  async generateYouTubeScript(topic, duration = 10) {
    const prompt = `You are a successful YouTuber in the ${this.expertise.join('/')} niche.

Create a video script about: ${topic}

Video duration: ${duration} minutes

Format:
[HOOK] - First 15 seconds (must grab attention)
[INTRO] - Introduce yourself and video topic
[CONTENT] - Main content broken into sections
[CTA] - Subscribe, like, comment prompts throughout
[OUTRO] - Summary and next steps

Include:
- Timestamps
- B-roll suggestions
- On-screen text suggestions
- Engagement hooks (questions, polls)
- Pattern interrupts
- Strong calls-to-action

Target audience: Professionals wanting to improve their ${this.expertise.join('/')}.`;

    const content = await this.callAI(prompt);
    
    const fileName = `youtube_${this.slugify(topic)}_${Date.now()}.txt`;
    const filePath = path.join(this.outputDir, fileName);
    
    fs.writeFileSync(filePath, content);
    
    return {
      type: 'youtube',
      topic,
      duration,
      content,
      filePath
    };
  }

  /**
   * Generate newsletter content
   */
  async generateNewsletter(theme, sections = ['intro', 'main', 'resources', 'cta']) {
    const prompt = `You are writing a weekly newsletter for professionals interested in ${this.expertise.join(', ')}.

Theme: ${theme}

Structure:
${sections.map((s, i) => `${i + 1}. ${s.toUpperCase()}`).join('\n')}

Requirements:
- Catchy subject line (under 50 chars)
- Preview text (under 100 chars)
- Personal, conversational tone
- Value-packed content
- Mix of insights, resources, tips
- Clear CTAs
- Sign-off that builds connection

Make it worth opening, reading, and sharing.`;

    const content = await this.callAI(prompt);
    
    const fileName = `newsletter_${this.slugify(theme)}_${Date.now()}.md`;
    const filePath = path.join(this.outputDir, fileName);
    
    fs.writeFileSync(filePath, content);
    
    return {
      type: 'newsletter',
      theme,
      content,
      filePath
    };
  }

  /**
   * Generate course outline
   */
  async generateCourseOutline(topic, modulesCount = 6) {
    const prompt = `You are a course creator with expertise in ${this.expertise.join(', ')}.

Create a comprehensive course outline for: ${topic}

Structure:
- Course title and tagline
- Target audience
- Learning outcomes
- ${modulesCount} modules
- Each module: 3-5 lessons
- Each lesson: key concepts, activities, deliverables
- Bonus materials
- Pricing recommendation

Make it:
- Structured for progressive learning
- Actionable (students get results)
- Sellable (clear transformation)
- Scalable (can be pre-recorded)

Suggested platform: Gumroad or Teachable`;

    const content = await this.callAI(prompt);
    
    const fileName = `course_${this.slugify(topic)}_${Date.now()}.md`;
    const filePath = path.join(this.outputDir, fileName);
    
    fs.writeFileSync(filePath, content);
    
    return {
      type: 'course',
      topic,
      content,
      filePath,
      modules: modulesCount
    };
  }

  /**
   * Batch generate content
   */
  async batchGenerate(contentPlan) {
    const results = [];
    
    for (const item of contentPlan) {
      try {
        let result;
        
        switch (item.type) {
          case 'blog':
            result = await this.generateBlogPost(item.topic, item.keywords, item.length);
            break;
          case 'twitter':
            result = await this.generateTwitterThread(item.topic, item.tweetCount);
            break;
          case 'linkedin':
            result = await this.generateLinkedInPost(item.topic, item.style);
            break;
          case 'youtube':
            result = await this.generateYouTubeScript(item.topic, item.duration);
            break;
          case 'newsletter':
            result = await this.generateNewsletter(item.theme, item.sections);
            break;
          case 'course':
            result = await this.generateCourseOutline(item.topic, item.modules);
            break;
          default:
            console.warn(`Unknown content type: ${item.type}`);
            continue;
        }
        
        results.push(result);
        console.log(`✓ Generated ${item.type}: ${item.topic || item.theme}`);
        
        // Rate limiting
        await this.sleep(1000);
        
      } catch (error) {
        console.error(`✗ Failed to generate ${item.type}:`, error.message);
        results.push({ type: item.type, error: error.message });
      }
    }
    
    return results;
  }

  /**
   * Call AI API (OpenAI or Anthropic)
   */
  async callAI(prompt) {
    // Check if we have API key
    if (!this.apiKey) {
      console.warn('No API key found. Returning mock content.');
      return this.mockContent(prompt);
    }

    // Determine which API to use
    if (this.apiKey.startsWith('sk-ant-')) {
      return await this.callAnthropic(prompt);
    } else if (this.apiKey.startsWith('sk-')) {
      return await this.callOpenAI(prompt);
    } else {
      throw new Error('Invalid API key format');
    }
  }

  async callOpenAI(prompt) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: 'You are an expert content creator.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2500
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API error');
    }
    
    return data.choices[0].message.content;
  }

  async callAnthropic(prompt) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2500,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Anthropic API error');
    }
    
    return data.content[0].text;
  }

  mockContent(prompt) {
    return `[MOCK CONTENT - Set OPENAI_API_KEY or ANTHROPIC_API_KEY to generate real content]\n\nPrompt was:\n${prompt.substring(0, 200)}...`;
  }

  loadTemplate(type, fileName) {
    const templatePath = path.join(this.templatesDir, type, fileName);
    if (fs.existsSync(templatePath)) {
      return fs.readFileSync(templatePath, 'utf8');
    }
    return '';
  }

  slugify(text) {
    return text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
  }

  parseThreadCount(content) {
    const matches = content.match(/^\d+\//gm);
    return matches ? matches.length : 0;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Content Generator - AI-powered content creation

Usage:
  node content-generator.js <type> <topic> [options]

Types:
  blog       - Blog post
  twitter    - Twitter thread
  linkedin   - LinkedIn post
  youtube    - YouTube script
  newsletter - Newsletter content
  course     - Course outline

Examples:
  node content-generator.js blog "How to use AI for marketing"
  node content-generator.js twitter "5 productivity hacks for 2026"
  node content-generator.js youtube "Complete guide to SEO" --duration 15
  node content-generator.js course "AI for Marketers"

Environment:
  OPENAI_API_KEY or ANTHROPIC_API_KEY required for real content generation
`);
    process.exit(0);
  }

  const type = args[0];
  const topic = args[1];
  
  const generator = new ContentGenerator({
    expertise: ['marketing', 'AI', 'productivity']
  });

  (async () => {
    try {
      let result;
      
      switch (type) {
        case 'blog':
          result = await generator.generateBlogPost(topic);
          break;
        case 'twitter':
          result = await generator.generateTwitterThread(topic);
          break;
        case 'linkedin':
          result = await generator.generateLinkedInPost(topic);
          break;
        case 'youtube':
          const duration = parseInt(args.find(a => a.includes('--duration'))?.split('=')[1]) || 10;
          result = await generator.generateYouTubeScript(topic, duration);
          break;
        case 'newsletter':
          result = await generator.generateNewsletter(topic);
          break;
        case 'course':
          result = await generator.generateCourseOutline(topic);
          break;
        default:
          console.error(`Unknown type: ${type}`);
          process.exit(1);
      }
      
      console.log('\n✓ Content generated successfully!\n');
      console.log(`File: ${result.filePath}`);
      console.log(`Type: ${result.type}`);
      if (result.wordCount) console.log(`Words: ${result.wordCount}`);
      if (result.charCount) console.log(`Characters: ${result.charCount}`);
      
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  })();
}

module.exports = ContentGenerator;
