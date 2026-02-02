#!/usr/bin/env node
/**
 * Affiliate Marketing Tracker
 * - Track affiliate links and conversions
 * - Generate affiliate content
 * - Monitor commissions
 */

const fs = require('fs');
const path = require('path');

class AffiliateTracker {
  constructor() {
    this.dataDir = path.join(__dirname, '..', 'data', 'affiliate');
    this.linksPath = path.join(this.dataDir, 'links.json');
    this.conversionsPath = path.join(this.dataDir, 'conversions.json');
    
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }

    this.loadLinks();
    this.loadConversions();
  }

  loadLinks() {
    if (fs.existsSync(this.linksPath)) {
      this.links = JSON.parse(fs.readFileSync(this.linksPath, 'utf8'));
    } else {
      this.links = this.getDefaultLinks();
      this.saveLinks();
    }
  }

  saveLinks() {
    fs.writeFileSync(this.linksPath, JSON.stringify(this.links, null, 2));
  }

  loadConversions() {
    if (fs.existsSync(this.conversionsPath)) {
      this.conversions = JSON.parse(fs.readFileSync(this.conversionsPath, 'utf8'));
    } else {
      this.conversions = [];
      this.saveConversions();
    }
  }

  saveConversions() {
    fs.writeFileSync(this.conversionsPath, JSON.stringify(this.conversions, null, 2));
  }

  /**
   * Default affiliate programs for marketing/AI/productivity
   */
  getDefaultLinks() {
    return {
      'ai-tools': [
        {
          name: 'ChatGPT Plus',
          url: 'https://openai.com/chatgpt?aff=YOUR_ID',
          program: 'OpenAI',
          commission: '20%',
          category: 'AI Tools',
          recurring: true
        },
        {
          name: 'Jasper AI',
          url: 'https://jasper.ai?aff=YOUR_ID',
          program: 'Jasper',
          commission: '30%',
          category: 'AI Writing',
          recurring: true
        },
        {
          name: 'Copy.ai',
          url: 'https://copy.ai?ref=YOUR_ID',
          program: 'Copy.ai',
          commission: '25%',
          category: 'AI Writing',
          recurring: true
        }
      ],
      'marketing-tools': [
        {
          name: 'ConvertKit',
          url: 'https://convertkit.com?lmref=YOUR_ID',
          program: 'ConvertKit',
          commission: '30%',
          category: 'Email Marketing',
          recurring: true
        },
        {
          name: 'Semrush',
          url: 'https://semrush.com?ref=YOUR_ID',
          program: 'Semrush',
          commission: '40%',
          category: 'SEO',
          recurring: true
        },
        {
          name: 'Canva Pro',
          url: 'https://canva.com?ref=YOUR_ID',
          program: 'Canva',
          commission: '$36/sale',
          category: 'Design',
          recurring: false
        }
      ],
      'productivity': [
        {
          name: 'Notion',
          url: 'https://notion.so?r=YOUR_ID',
          program: 'Notion',
          commission: '$10/signup',
          category: 'Productivity',
          recurring: false
        },
        {
          name: 'Todoist Premium',
          url: 'https://todoist.com?ref=YOUR_ID',
          program: 'Todoist',
          commission: '20%',
          category: 'Task Management',
          recurring: true
        }
      ],
      'courses': [
        {
          name: 'Teachable',
          url: 'https://teachable.com?ref=YOUR_ID',
          program: 'Teachable',
          commission: '30%',
          category: 'Course Platform',
          recurring: true
        },
        {
          name: 'Gumroad',
          url: 'https://gumroad.com?ref=YOUR_ID',
          program: 'Gumroad',
          commission: '10%',
          category: 'Digital Products',
          recurring: false
        }
      ]
    };
  }

  /**
   * Add new affiliate link
   */
  addLink(name, url, program, commission, category, recurring = false) {
    if (!this.links[category]) {
      this.links[category] = [];
    }

    const link = {
      name,
      url,
      program,
      commission,
      category,
      recurring,
      addedAt: new Date().toISOString(),
      clicks: 0,
      conversions: 0
    };

    this.links[category].push(link);
    this.saveLinks();

    console.log(`✓ Added affiliate link: ${name}`);
    return link;
  }

  /**
   * Generate affiliate content (blog section, social post)
   */
  generateAffiliateContent(products, style = 'blog') {
    if (style === 'blog') {
      return this.generateBlogSection(products);
    } else if (style === 'twitter') {
      return this.generateTwitterRecommendation(products[0]);
    } else if (style === 'email') {
      return this.generateEmailRecommendation(products);
    }
  }

  generateBlogSection(products) {
    let content = '## Recommended Tools\n\n';
    content += 'These are the tools I personally use and recommend:\n\n';

    products.forEach(product => {
      content += `### ${product.name}\n\n`;
      content += `Perfect for: ${product.category}\n\n`;
      content += `What I love: [Add your personal experience here]\n\n`;
      content += `**[Try ${product.name} →](${product.url})**\n\n`;
      if (product.recurring) {
        content += `*Disclosure: This is an affiliate link. I earn a commission at no extra cost to you.*\n\n`;
      }
    });

    return content;
  }

  generateTwitterRecommendation(product) {
    const templates = [
      `Just upgraded to ${product.name} and it's been a game-changer for ${product.category.toLowerCase()}.\n\nHere's what I love about it:\n\n[Add 2-3 benefits]\n\nWorth checking out: ${product.url}`,
      
      `My ${product.category.toLowerCase()} stack:\n\n✓ ${product.name}\n✓ [Tool 2]\n✓ [Tool 3]\n\n${product.name} has been the MVP for [specific use case].\n\nTry it: ${product.url}`,
      
      `Hot take: ${product.name} is underrated.\n\nMost people don't realize [specific insight].\n\nI've been using it for [time period] and [specific result].\n\n${product.url}`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  }

  generateEmailRecommendation(products) {
    let content = 'P.S. Tools I\'m loving this week:\n\n';

    products.slice(0, 3).forEach(product => {
      content += `• **${product.name}** - ${product.category} tool that [benefit]. `;
      content += `[Check it out →](${product.url})\n`;
    });

    content += '\n*These are affiliate links. I only recommend tools I genuinely use.*';

    return content;
  }

  /**
   * Track conversion
   */
  trackConversion(linkName, amount, currency = 'USD') {
    const conversion = {
      link: linkName,
      amount,
      currency,
      date: new Date().toISOString()
    };

    this.conversions.push(conversion);
    this.saveConversions();

    // Update link stats
    for (const category in this.links) {
      const link = this.links[category].find(l => l.name === linkName);
      if (link) {
        link.conversions = (link.conversions || 0) + 1;
        this.saveLinks();
        break;
      }
    }

    console.log(`✓ Tracked conversion: ${linkName} - ${currency} ${amount}`);
    return conversion;
  }

  /**
   * Get revenue report
   */
  getRevenueReport(period = 'month') {
    const now = new Date();
    let startDate;

    if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (period === 'week') {
      startDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
    } else {
      startDate = new Date(0); // All time
    }

    const relevantConversions = this.conversions.filter(c => 
      new Date(c.date) >= startDate
    );

    const totalRevenue = relevantConversions.reduce((sum, c) => sum + c.amount, 0);
    const conversionCount = relevantConversions.length;

    const byProgram = {};
    relevantConversions.forEach(c => {
      byProgram[c.link] = (byProgram[c.link] || 0) + c.amount;
    });

    return {
      period,
      totalRevenue,
      conversionCount,
      averageConversion: conversionCount > 0 ? totalRevenue / conversionCount : 0,
      byProgram,
      conversions: relevantConversions
    };
  }

  /**
   * Get top performing links
   */
  getTopPerformers(limit = 5) {
    const allLinks = [];
    
    for (const category in this.links) {
      allLinks.push(...this.links[category].map(l => ({ ...l, category })));
    }

    allLinks.sort((a, b) => (b.conversions || 0) - (a.conversions || 0));

    return allLinks.slice(0, limit);
  }

  /**
   * Display dashboard
   */
  displayDashboard() {
    console.log('\n💰 AFFILIATE REVENUE DASHBOARD\n');

    const monthReport = this.getRevenueReport('month');
    const weekReport = this.getRevenueReport('week');
    const allTimeReport = this.getRevenueReport('all');

    console.log('📊 Revenue Summary:');
    console.log(`  This Week:  $${weekReport.totalRevenue.toFixed(2)} (${weekReport.conversionCount} conversions)`);
    console.log(`  This Month: $${monthReport.totalRevenue.toFixed(2)} (${monthReport.conversionCount} conversions)`);
    console.log(`  All Time:   $${allTimeReport.totalRevenue.toFixed(2)} (${allTimeReport.conversionCount} conversions)`);

    console.log('\n🏆 Top Performers:');
    const topPerformers = this.getTopPerformers(5);
    topPerformers.forEach((link, i) => {
      console.log(`  ${i + 1}. ${link.name} - ${link.conversions || 0} conversions (${link.commission})`);
    });

    console.log('\n📈 Growth:');
    if (weekReport.totalRevenue > 0) {
      const weeklyAverage = weekReport.totalRevenue;
      const projectedMonthly = weeklyAverage * 4.33;
      console.log(`  Projected Monthly: $${projectedMonthly.toFixed(2)}`);
      console.log(`  Projected Yearly:  $${(projectedMonthly * 12).toFixed(2)}`);
    } else {
      console.log('  No data yet this week');
    }

    console.log('\n💡 Recommendations:');
    console.log('  - Write more content about top-performing products');
    console.log('  - Test different CTAs for underperforming links');
    console.log('  - Consider removing links with 0 conversions after 3 months');
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Affiliate Tracker - Manage affiliate links and track revenue

Usage:
  node affiliate-tracker.js list [category]           - List all links
  node affiliate-tracker.js add <name> <url> <program> <commission> <category> [recurring]
  node affiliate-tracker.js convert <link-name> <amount>  - Track conversion
  node affiliate-tracker.js report [period]            - Revenue report (week/month/all)
  node affiliate-tracker.js dashboard                  - Full dashboard
  node affiliate-tracker.js content <style> <product>  - Generate affiliate content

Examples:
  node affiliate-tracker.js list ai-tools
  node affiliate-tracker.js add "Jasper AI" "https://jasper.ai?aff=123" "Jasper" "30%" "AI Writing" true
  node affiliate-tracker.js convert "Jasper AI" 29.99
  node affiliate-tracker.js report month
  node affiliate-tracker.js dashboard
`);
    process.exit(0);
  }

  const tracker = new AffiliateTracker();
  const command = args[0];

  try {
    if (command === 'list') {
      const category = args[1];
      
      if (category && tracker.links[category]) {
        console.log(`\n${category.toUpperCase()} Links:\n`);
        tracker.links[category].forEach(link => {
          console.log(`• ${link.name}`);
          console.log(`  ${link.url}`);
          console.log(`  Commission: ${link.commission} ${link.recurring ? '(recurring)' : ''}`);
          console.log(`  Stats: ${link.conversions || 0} conversions\n`);
        });
      } else {
        console.log('\nAll Affiliate Links:\n');
        for (const cat in tracker.links) {
          console.log(`\n${cat.toUpperCase()}:`);
          tracker.links[cat].forEach(link => {
            console.log(`  • ${link.name} (${link.commission})`);
          });
        }
      }

    } else if (command === 'add') {
      const [name, url, program, commission, category, recurring] = args.slice(1);
      if (!name || !url || !program || !commission || !category) {
        throw new Error('Missing required fields');
      }
      tracker.addLink(name, url, program, commission, category, recurring === 'true');

    } else if (command === 'convert') {
      const linkName = args[1];
      const amount = parseFloat(args[2]);
      if (!linkName || isNaN(amount)) {
        throw new Error('Link name and amount required');
      }
      tracker.trackConversion(linkName, amount);

    } else if (command === 'report') {
      const period = args[1] || 'month';
      const report = tracker.getRevenueReport(period);
      
      console.log(`\n📊 ${period.toUpperCase()} Report:\n`);
      console.log(`Total Revenue: $${report.totalRevenue.toFixed(2)}`);
      console.log(`Conversions: ${report.conversionCount}`);
      console.log(`Average: $${report.averageConversion.toFixed(2)}\n`);
      
      console.log('By Program:');
      for (const program in report.byProgram) {
        console.log(`  ${program}: $${report.byProgram[program].toFixed(2)}`);
      }

    } else if (command === 'dashboard') {
      tracker.displayDashboard();

    } else if (command === 'content') {
      const style = args[1] || 'blog';
      const products = tracker.getTopPerformers(3);
      const content = tracker.generateAffiliateContent(products, style);
      console.log('\n' + content);

    } else {
      throw new Error(`Unknown command: ${command}`);
    }

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

module.exports = AffiliateTracker;
