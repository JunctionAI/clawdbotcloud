/**
 * AI-Assisted Content Generator for Affiliate Posts
 * Uses OpenAI API to generate SEO-optimized blog posts
 */

const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate a comprehensive product review post
 */
async function generateProductReview(productName, category, features, pricing, pros, cons) {
  const prompt = `
Write a comprehensive, SEO-optimized product review for an affiliate website.

Product: ${productName}
Category: ${category}
Key Features: ${features.join(', ')}
Pricing: ${pricing}
Pros: ${pros.join(', ')}
Cons: ${cons.join(', ')}

Structure:
1. Introduction (hook with pain point, 100-150 words)
2. What is ${productName}? (overview, 150-200 words)
3. Key Features (detailed breakdown, 400-500 words)
4. Pricing Breakdown (all plans explained, 200-300 words)
5. Pros & Cons (honest analysis)
6. Who Should Use ${productName}? (use cases, 200 words)
7. Alternatives to ${productName} (3-4 competitors)
8. Final Verdict (recommendation, 150 words)
9. FAQ (5 common questions)

Tone: Professional but conversational, helpful, unbiased
SEO: Include keyword "${productName} review" naturally
Word count: 2,500-3,000 words
Include: Comparison table, bullet points, subheadings
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are an expert affiliate content writer who creates comprehensive, SEO-optimized product reviews.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const content = response.choices[0].message.content;

  // Save to file
  const filename = `${productName.toLowerCase().replace(/\s+/g, '-')}-review.md`;
  const outputPath = path.join(__dirname, '../../output/blog-posts', filename);
  
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content);

  console.log(`✅ Review generated: ${filename}`);
  return { filename, content };
}

/**
 * Generate a comparison post (Product A vs Product B)
 */
async function generateComparison(product1, product2, category) {
  const prompt = `
Write an SEO-optimized comparison article for an affiliate website.

Products: ${product1} vs ${product2}
Category: ${category}

Structure:
1. Introduction (which is better for what use case?)
2. Quick Comparison Table (features, pricing, best for)
3. ${product1} Overview (strengths, weaknesses, 300 words)
4. ${product2} Overview (strengths, weaknesses, 300 words)
5. Feature Comparison (head-to-head, 500 words)
6. Pricing Comparison (value analysis, 200 words)
7. Use Case Scenarios (when to choose each, 300 words)
8. Final Recommendation (who should pick which, 200 words)
9. FAQ (5 questions)

Tone: Balanced, helpful, data-driven
SEO: Include "${product1} vs ${product2}" keyword
Word count: 2,000-2,500 words
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are an expert at writing balanced, data-driven comparison articles.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 3500,
  });

  const content = response.choices[0].message.content;

  const filename = `${product1.toLowerCase().replace(/\s+/g, '-')}-vs-${product2.toLowerCase().replace(/\s+/g, '-')}.md`;
  const outputPath = path.join(__dirname, '../../output/blog-posts', filename);
  
  fs.writeFileSync(outputPath, content);

  console.log(`✅ Comparison generated: ${filename}`);
  return { filename, content };
}

/**
 * Generate a "Best [Category] Tools" roundup post
 */
async function generateRoundup(category, tools, year = new Date().getFullYear()) {
  const toolsList = tools.map(t => `${t.name}: ${t.description}`).join('\n');

  const prompt = `
Write an SEO-optimized roundup article for an affiliate website.

Title: "Best ${category} Tools in ${year}"
Tools to include:
${toolsList}

Structure:
1. Introduction (why you need ${category} tools, 150 words)
2. How We Chose These Tools (criteria, 100 words)
3. Quick Comparison Table (all tools)
4. Detailed Reviews (each tool: features, pricing, pros/cons, best for, 250 words each)
5. How to Choose (buying guide, 300 words)
6. FAQ (7 questions)
7. Final Recommendations (top pick, budget pick, premium pick)

Tone: Authoritative, helpful, comprehensive
SEO: Include "best ${category} tools ${year}" keyword
Word count: 3,000-3,500 words
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are an expert at creating comprehensive roundup articles with in-depth product analysis.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const content = response.choices[0].message.content;

  const filename = `best-${category.toLowerCase().replace(/\s+/g, '-')}-tools-${year}.md`;
  const outputPath = path.join(__dirname, '../../output/blog-posts', filename);
  
  fs.writeFileSync(outputPath, content);

  console.log(`✅ Roundup generated: ${filename}`);
  return { filename, content };
}

/**
 * Automatically publish to WordPress
 */
async function publishToWordPress(title, content, categories, tags) {
  const axios = require('axios');
  const wpUrl = process.env.WORDPRESS_URL;
  const wpApiKey = process.env.WORDPRESS_API_KEY;

  const response = await axios.post(
    `${wpUrl}/wp-json/wp/v2/posts`,
    {
      title,
      content,
      status: 'draft', // Change to 'publish' to auto-publish
      categories,
      tags,
    },
    {
      headers: {
        Authorization: `Bearer ${wpApiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`✅ Post published to WordPress: ${response.data.link}`);
  return response.data;
}

// Example usage
async function main() {
  // Generate a product review
  await generateProductReview(
    'ClickFunnels',
    'Sales Funnel Software',
    ['Landing page builder', 'A/B testing', 'Email automation', 'Payment integration'],
    'Basic: $147/mo, Pro: $197/mo, Funnel Hacker: $297/mo',
    ['All-in-one solution', 'Great templates', 'Active community'],
    ['Expensive', 'Learning curve', 'Limited customization']
  );

  // Generate a comparison
  await generateComparison('ClickFunnels', 'Leadpages', 'Sales Funnel Builders');

  // Generate a roundup
  await generateRoundup('CRM', [
    { name: 'HubSpot', description: 'All-in-one CRM with marketing automation' },
    { name: 'Salesforce', description: 'Enterprise-grade CRM solution' },
    { name: 'Pipedrive', description: 'Sales-focused CRM for small teams' },
  ]);
}

// Uncomment to run
// main().catch(console.error);

module.exports = {
  generateProductReview,
  generateComparison,
  generateRoundup,
  publishToWordPress,
};
