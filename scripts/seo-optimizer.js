#!/usr/bin/env node
/**
 * SEO Optimizer
 * - Keyword research
 * - On-page SEO analysis
 * - Content optimization suggestions
 * - Competitor analysis
 */

const fs = require('fs');
const path = require('path');

class SEOOptimizer {
  constructor(config = {}) {
    this.apiKey = config.apiKey || process.env.OPENAI_API_KEY;
    this.dataDir = path.join(__dirname, '..', 'data', 'seo');
    
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  /**
   * Keyword research using search volume estimation
   */
  async researchKeywords(topic, niche = 'marketing') {
    console.log(`🔍 Researching keywords for: ${topic}`);
    
    // Generate keyword ideas
    const keywords = this.generateKeywordIdeas(topic, niche);
    
    // Score keywords by potential
    const scoredKeywords = keywords.map(kw => ({
      keyword: kw,
      searchVolume: this.estimateSearchVolume(kw),
      difficulty: this.estimateDifficulty(kw),
      opportunity: 0,
      intent: this.classifyIntent(kw)
    }));

    // Calculate opportunity score
    scoredKeywords.forEach(kw => {
      kw.opportunity = (kw.searchVolume / (kw.difficulty + 1)) * this.intentMultiplier(kw.intent);
    });

    // Sort by opportunity
    scoredKeywords.sort((a, b) => b.opportunity - a.opportunity);

    // Save results
    const fileName = `keywords_${this.slugify(topic)}_${Date.now()}.json`;
    const filePath = path.join(this.dataDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(scoredKeywords, null, 2));

    return {
      topic,
      keywords: scoredKeywords.slice(0, 20), // Top 20
      filePath
    };
  }

  /**
   * Analyze on-page SEO for content
   */
  analyzeOnPage(content, targetKeyword) {
    console.log(`📊 Analyzing on-page SEO for: ${targetKeyword}`);
    
    const analysis = {
      keyword: targetKeyword,
      score: 0,
      issues: [],
      recommendations: []
    };

    // Extract metadata
    const title = this.extractTitle(content);
    const metaDesc = this.extractMetaDescription(content);
    const headings = this.extractHeadings(content);
    const wordCount = content.split(/\s+/).length;
    const keywordDensity = this.calculateKeywordDensity(content, targetKeyword);

    // Check title
    if (!title) {
      analysis.issues.push('Missing title tag');
    } else if (!title.toLowerCase().includes(targetKeyword.toLowerCase())) {
      analysis.issues.push(`Title doesn't contain target keyword: ${targetKeyword}`);
    } else if (title.length < 30 || title.length > 60) {
      analysis.issues.push(`Title length (${title.length}) should be 30-60 characters`);
      analysis.score += 5;
    } else {
      analysis.score += 15;
    }

    // Check meta description
    if (!metaDesc) {
      analysis.issues.push('Missing meta description');
    } else if (metaDesc.length < 120 || metaDesc.length > 160) {
      analysis.issues.push(`Meta description length (${metaDesc.length}) should be 120-160 characters`);
      analysis.score += 5;
    } else {
      analysis.score += 10;
    }

    // Check headings
    if (headings.h1.length === 0) {
      analysis.issues.push('Missing H1 heading');
    } else if (headings.h1.length > 1) {
      analysis.issues.push('Multiple H1 headings found (should be only 1)');
      analysis.score += 5;
    } else {
      analysis.score += 15;
    }

    if (headings.h2.length < 2) {
      analysis.issues.push('Too few H2 headings (should have at least 2-3)');
    } else {
      analysis.score += 10;
    }

    // Check keyword in first paragraph
    const firstParagraph = content.split('\n\n')[0];
    if (!firstParagraph.toLowerCase().includes(targetKeyword.toLowerCase())) {
      analysis.issues.push('Target keyword not in first paragraph');
    } else {
      analysis.score += 10;
    }

    // Check word count
    if (wordCount < 300) {
      analysis.issues.push(`Content too short (${wordCount} words). Aim for 1000+ for blog posts`);
    } else if (wordCount < 1000) {
      analysis.issues.push(`Content length (${wordCount} words) is good but could be longer`);
      analysis.score += 10;
    } else {
      analysis.score += 20;
    }

    // Check keyword density
    if (keywordDensity < 0.5) {
      analysis.issues.push(`Keyword density too low (${keywordDensity.toFixed(2)}%). Aim for 0.5-2.5%`);
    } else if (keywordDensity > 2.5) {
      analysis.issues.push(`Keyword density too high (${keywordDensity.toFixed(2)}%). Risk of keyword stuffing`);
      analysis.score += 5;
    } else {
      analysis.score += 15;
    }

    // Check internal/external links
    const links = this.extractLinks(content);
    if (links.internal < 2) {
      analysis.issues.push('Add 2-3 internal links to other relevant content');
    } else {
      analysis.score += 5;
    }

    if (links.external < 1) {
      analysis.issues.push('Add 1-2 external links to authoritative sources');
    } else {
      analysis.score += 5;
    }

    // Generate recommendations
    if (analysis.score < 60) {
      analysis.recommendations.push('🚨 Critical: Address all issues above before publishing');
    } else if (analysis.score < 80) {
      analysis.recommendations.push('⚠️  Good foundation. Fix remaining issues for better ranking');
    } else {
      analysis.recommendations.push('✅ Well optimized! Minor tweaks for perfection');
    }

    analysis.recommendations.push(`Target keyword: "${targetKeyword}"`);
    analysis.recommendations.push(`- Use in title (✓ or ✗)`);
    analysis.recommendations.push(`- Use in first paragraph (✓ or ✗)`);
    analysis.recommendations.push(`- Use in 1-2 H2 headings`);
    analysis.recommendations.push(`- Current density: ${keywordDensity.toFixed(2)}% (aim for 0.5-2.5%)`);

    return analysis;
  }

  /**
   * Optimize content for target keyword
   */
  async optimizeContent(content, targetKeyword) {
    const analysis = this.analyzeOnPage(content, targetKeyword);
    
    console.log('\n📈 SEO Score:', analysis.score, '/ 100');
    console.log('\n❌ Issues:');
    analysis.issues.forEach(issue => console.log(`  - ${issue}`));
    console.log('\n💡 Recommendations:');
    analysis.recommendations.forEach(rec => console.log(`  ${rec}`));

    // Generate optimized suggestions using AI
    if (this.apiKey) {
      const suggestions = await this.generateOptimizationSuggestions(content, targetKeyword, analysis);
      analysis.aiSuggestions = suggestions;
    }

    return analysis;
  }

  /**
   * Generate optimization suggestions using AI
   */
  async generateOptimizationSuggestions(content, keyword, analysis) {
    const prompt = `You are an SEO expert. Analyze this content and provide specific optimization suggestions.

Target Keyword: ${keyword}
Current SEO Score: ${analysis.score}/100

Issues found:
${analysis.issues.map(i => `- ${i}`).join('\n')}

Content preview:
${content.substring(0, 500)}...

Provide:
1. Optimized title (include keyword, 50-60 chars)
2. Optimized meta description (include keyword, 140-160 chars)
3. 3-5 H2 heading suggestions
4. First paragraph rewrite (include keyword naturally)
5. Internal linking opportunities
6. Additional LSI keywords to include

Be specific and actionable.`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI optimization failed:', error.message);
      return null;
    }
  }

  // Helper methods

  generateKeywordIdeas(topic, niche) {
    // In real implementation, this would call keyword research APIs
    // For now, generate logical variations
    
    const modifiers = [
      'how to', 'best', 'top', 'guide', 'tips', 'strategies',
      'beginners', 'advanced', '2026', 'tools', 'software',
      'free', 'paid', 'review', 'tutorial', 'course'
    ];

    const relatedTerms = {
      'marketing': ['digital marketing', 'content marketing', 'email marketing', 'social media marketing'],
      'AI': ['artificial intelligence', 'machine learning', 'automation', 'chatbots'],
      'productivity': ['time management', 'workflow', 'efficiency', 'organization']
    };

    const keywords = [topic];

    // Add modifier combinations
    modifiers.forEach(mod => {
      keywords.push(`${mod} ${topic}`);
    });

    // Add related terms
    if (relatedTerms[niche]) {
      relatedTerms[niche].forEach(term => {
        keywords.push(term);
        keywords.push(`${topic} ${term}`);
      });
    }

    // Add question-based keywords
    ['what is', 'how to', 'why', 'when to', 'where to'].forEach(q => {
      keywords.push(`${q} ${topic}`);
    });

    return [...new Set(keywords)]; // Remove duplicates
  }

  estimateSearchVolume(keyword) {
    // Simplified estimation based on keyword characteristics
    const length = keyword.split(' ').length;
    let volume = 1000;

    if (length === 1) volume = 50000;
    else if (length === 2) volume = 10000;
    else if (length === 3) volume = 3000;
    else volume = 1000;

    // Adjust for modifiers
    if (keyword.includes('how to')) volume *= 1.5;
    if (keyword.includes('best')) volume *= 1.3;
    if (keyword.includes('2026')) volume *= 0.7;
    if (keyword.includes('free')) volume *= 1.2;

    return Math.round(volume);
  }

  estimateDifficulty(keyword) {
    // Simplified difficulty score (0-100)
    const length = keyword.split(' ').length;
    let difficulty = 50;

    if (length === 1) difficulty = 90; // Very competitive
    else if (length === 2) difficulty = 70;
    else if (length === 3) difficulty = 50;
    else difficulty = 30; // Long-tail, easier

    // High-competition modifiers
    if (keyword.includes('best')) difficulty += 10;
    if (keyword.includes('top')) difficulty += 10;
    if (keyword.includes('review')) difficulty += 5;

    // Low-competition modifiers
    if (keyword.includes('2026')) difficulty -= 10;
    if (keyword.includes('beginners')) difficulty -= 5;

    return Math.max(10, Math.min(100, difficulty));
  }

  classifyIntent(keyword) {
    // Search intent: informational, commercial, transactional, navigational
    if (keyword.match(/how to|what is|guide|tutorial|tips/i)) return 'informational';
    if (keyword.match(/best|top|review|vs|compare/i)) return 'commercial';
    if (keyword.match(/buy|price|discount|coupon|deal/i)) return 'transactional';
    return 'informational';
  }

  intentMultiplier(intent) {
    // Commercial intent = higher conversion potential
    const multipliers = {
      'transactional': 2.0,
      'commercial': 1.5,
      'informational': 1.0,
      'navigational': 0.8
    };
    return multipliers[intent] || 1.0;
  }

  extractTitle(content) {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1] : null;
  }

  extractMetaDescription(content) {
    const match = content.match(/Meta description:\s*(.+)/i);
    return match ? match[1] : null;
  }

  extractHeadings(content) {
    return {
      h1: content.match(/^#\s+.+$/gm) || [],
      h2: content.match(/^##\s+.+$/gm) || [],
      h3: content.match(/^###\s+.+$/gm) || []
    };
  }

  calculateKeywordDensity(content, keyword) {
    const words = content.toLowerCase().split(/\s+/);
    const keywordWords = keyword.toLowerCase().split(/\s+/);
    let count = 0;

    for (let i = 0; i <= words.length - keywordWords.length; i++) {
      const phrase = words.slice(i, i + keywordWords.length).join(' ');
      if (phrase === keyword.toLowerCase()) count++;
    }

    return (count / words.length) * 100;
  }

  extractLinks(content) {
    const internalLinks = (content.match(/\[.*?\]\(\/.*?\)/g) || []).length;
    const externalLinks = (content.match(/\[.*?\]\(https?:\/\/.*?\)/g) || []).length;
    
    return {
      internal: internalLinks,
      external: externalLinks
    };
  }

  slugify(text) {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').substring(0, 50);
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
SEO Optimizer - Keyword research and content optimization

Usage:
  node seo-optimizer.js research <topic>        - Research keywords
  node seo-optimizer.js analyze <file> <keyword> - Analyze content
  node seo-optimizer.js optimize <file> <keyword> - Full optimization

Examples:
  node seo-optimizer.js research "AI marketing tools"
  node seo-optimizer.js analyze blog-post.md "AI marketing"
  node seo-optimizer.js optimize blog-post.md "AI marketing"
`);
    process.exit(0);
  }

  const optimizer = new SEOOptimizer();
  const command = args[0];

  (async () => {
    try {
      if (command === 'research') {
        const topic = args[1];
        if (!topic) throw new Error('Topic required');
        
        const result = await optimizer.researchKeywords(topic);
        console.log('\n📊 Top Keywords:\n');
        result.keywords.slice(0, 10).forEach((kw, i) => {
          console.log(`${i + 1}. ${kw.keyword}`);
          console.log(`   Volume: ${kw.searchVolume} | Difficulty: ${kw.difficulty} | Intent: ${kw.intent}`);
          console.log(`   Opportunity Score: ${kw.opportunity.toFixed(2)}\n`);
        });
        console.log(`\nFull results saved: ${result.filePath}`);
        
      } else if (command === 'analyze' || command === 'optimize') {
        const filePath = args[1];
        const keyword = args[2];
        
        if (!filePath || !keyword) {
          throw new Error('File path and keyword required');
        }
        
        const content = fs.readFileSync(filePath, 'utf8');
        const result = await optimizer.optimizeContent(content, keyword);
        
        if (result.aiSuggestions) {
          console.log('\n🤖 AI Suggestions:\n');
          console.log(result.aiSuggestions);
        }
        
      } else {
        throw new Error(`Unknown command: ${command}`);
      }
      
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  })();
}

module.exports = SEOOptimizer;
