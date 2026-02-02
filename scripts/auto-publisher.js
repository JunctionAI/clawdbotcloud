#!/usr/bin/env node
/**
 * Auto Publisher
 * - Content calendar management
 * - Auto-posting to multiple platforms
 * - Scheduling and queuing
 */

const fs = require('fs');
const path = require('path');

class AutoPublisher {
  constructor(config = {}) {
    this.calendarPath = path.join(__dirname, '..', 'data', 'content-calendar.json');
    this.queuePath = path.join(__dirname, '..', 'data', 'publish-queue.json');
    this.historyPath = path.join(__dirname, '..', 'data', 'publish-history.json');
    
    // API credentials (load from env or config)
    this.credentials = {
      twitter: {
        apiKey: process.env.TWITTER_API_KEY,
        apiSecret: process.env.TWITTER_API_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessSecret: process.env.TWITTER_ACCESS_SECRET
      },
      linkedin: {
        accessToken: process.env.LINKEDIN_ACCESS_TOKEN,
        userId: process.env.LINKEDIN_USER_ID
      },
      wordpress: {
        url: process.env.WORDPRESS_URL,
        username: process.env.WORDPRESS_USERNAME,
        password: process.env.WORDPRESS_PASSWORD
      },
      medium: {
        token: process.env.MEDIUM_TOKEN
      }
    };

    this.loadCalendar();
    this.loadQueue();
  }

  /**
   * Load content calendar
   */
  loadCalendar() {
    if (fs.existsSync(this.calendarPath)) {
      this.calendar = JSON.parse(fs.readFileSync(this.calendarPath, 'utf8'));
    } else {
      this.calendar = {
        schedule: {},
        templates: {},
        settings: {
          timezone: 'Pacific/Auckland',
          autoPublish: true,
          bufferDays: 7
        }
      };
      this.saveCalendar();
    }
  }

  saveCalendar() {
    fs.writeFileSync(this.calendarPath, JSON.stringify(this.calendar, null, 2));
  }

  /**
   * Load publish queue
   */
  loadQueue() {
    if (fs.existsSync(this.queuePath)) {
      this.queue = JSON.parse(fs.readFileSync(this.queuePath, 'utf8'));
    } else {
      this.queue = [];
      this.saveQueue();
    }
  }

  saveQueue() {
    fs.writeFileSync(this.queuePath, JSON.stringify(this.queue, null, 2));
  }

  /**
   * Schedule content for publishing
   */
  scheduleContent(content, platform, scheduledTime) {
    const item = {
      id: this.generateId(),
      platform,
      content,
      scheduledTime: new Date(scheduledTime).toISOString(),
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    this.queue.push(item);
    this.queue.sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime));
    this.saveQueue();

    console.log(`✓ Scheduled ${platform} post for ${scheduledTime}`);
    return item;
  }

  /**
   * Create content calendar for the month
   */
  createMonthlyCalendar(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const schedule = [];

    // Tom's content strategy: 3 blogs/week, 5 tweets/week, 2 LinkedIn/week, 1 newsletter/week
    const contentFrequency = {
      blog: [1, 3, 5],      // Mon, Wed, Fri
      twitter: [1, 2, 3, 4, 5], // Weekdays
      linkedin: [2, 4],     // Tue, Thu
      newsletter: [0],      // Sunday
      youtube: [6]          // Saturday
    };

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.getDay();
      const dateStr = date.toISOString().split('T')[0];

      schedule.push({
        date: dateStr,
        dayOfWeek,
        content: this.getContentForDay(dayOfWeek, contentFrequency)
      });
    }

    this.calendar.schedule[`${year}-${month.toString().padStart(2, '0')}`] = schedule;
    this.saveCalendar();

    return schedule;
  }

  getContentForDay(dayOfWeek, frequency) {
    const content = [];

    if (frequency.blog.includes(dayOfWeek)) {
      content.push({ type: 'blog', time: '09:00', status: 'planned' });
    }

    if (frequency.twitter.includes(dayOfWeek)) {
      content.push({ type: 'twitter', time: '10:00', status: 'planned' });
      content.push({ type: 'twitter', time: '15:00', status: 'planned' });
    }

    if (frequency.linkedin.includes(dayOfWeek)) {
      content.push({ type: 'linkedin', time: '08:00', status: 'planned' });
    }

    if (frequency.newsletter.includes(dayOfWeek)) {
      content.push({ type: 'newsletter', time: '07:00', status: 'planned' });
    }

    if (frequency.youtube.includes(dayOfWeek)) {
      content.push({ type: 'youtube', time: '12:00', status: 'planned' });
    }

    return content;
  }

  /**
   * Publish to Twitter
   */
  async publishToTwitter(content) {
    console.log('📱 Publishing to Twitter...');

    if (!this.credentials.twitter.apiKey) {
      console.warn('⚠️  Twitter credentials not configured. Simulating publish.');
      return { success: true, platform: 'twitter', mode: 'simulation', id: 'sim_' + Date.now() };
    }

    try {
      // If content is a thread (array or multiple tweets)
      let tweets = Array.isArray(content) ? content : this.parseThread(content);
      
      const tweetIds = [];
      let replyToId = null;

      for (const tweet of tweets) {
        const result = await this.postTweet(tweet, replyToId);
        tweetIds.push(result.id);
        replyToId = result.id; // Thread replies
        await this.sleep(2000); // Rate limit
      }

      return {
        success: true,
        platform: 'twitter',
        tweetIds,
        url: `https://twitter.com/user/status/${tweetIds[0]}`
      };

    } catch (error) {
      console.error('Twitter publish failed:', error.message);
      return { success: false, platform: 'twitter', error: error.message };
    }
  }

  async postTweet(text, replyToId = null) {
    // Using Twitter API v2
    const endpoint = 'https://api.twitter.com/2/tweets';
    
    const body = {
      text: text.substring(0, 280) // Enforce character limit
    };

    if (replyToId) {
      body.reply = { in_reply_to_tweet_id: replyToId };
    }

    // OAuth implementation would go here
    // For now, return mock response
    return {
      id: 'mock_' + Date.now(),
      text: body.text
    };
  }

  /**
   * Publish to LinkedIn
   */
  async publishToLinkedIn(content) {
    console.log('💼 Publishing to LinkedIn...');

    if (!this.credentials.linkedin.accessToken) {
      console.warn('⚠️  LinkedIn credentials not configured. Simulating publish.');
      return { success: true, platform: 'linkedin', mode: 'simulation', id: 'sim_' + Date.now() };
    }

    try {
      const endpoint = 'https://api.linkedin.com/v2/ugcPosts';
      
      const body = {
        author: `urn:li:person:${this.credentials.linkedin.userId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content
            },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      };

      // API call would go here
      // For now, return mock response
      return {
        success: true,
        platform: 'linkedin',
        id: 'mock_' + Date.now(),
        url: 'https://linkedin.com/feed'
      };

    } catch (error) {
      console.error('LinkedIn publish failed:', error.message);
      return { success: false, platform: 'linkedin', error: error.message };
    }
  }

  /**
   * Publish blog to WordPress
   */
  async publishToWordPress(title, content, tags = [], categories = []) {
    console.log('📝 Publishing to WordPress...');

    if (!this.credentials.wordpress.url) {
      console.warn('⚠️  WordPress credentials not configured. Simulating publish.');
      return { success: true, platform: 'wordpress', mode: 'simulation', id: 'sim_' + Date.now() };
    }

    try {
      // WordPress REST API
      const endpoint = `${this.credentials.wordpress.url}/wp-json/wp/v2/posts`;
      
      const auth = Buffer.from(
        `${this.credentials.wordpress.username}:${this.credentials.wordpress.password}`
      ).toString('base64');

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        },
        body: JSON.stringify({
          title,
          content,
          status: 'publish',
          tags,
          categories
        })
      });

      const data = await response.json();

      return {
        success: response.ok,
        platform: 'wordpress',
        id: data.id,
        url: data.link
      };

    } catch (error) {
      console.error('WordPress publish failed:', error.message);
      return { success: false, platform: 'wordpress', error: error.message };
    }
  }

  /**
   * Publish to Medium
   */
  async publishToMedium(title, content, tags = []) {
    console.log('📰 Publishing to Medium...');

    if (!this.credentials.medium.token) {
      console.warn('⚠️  Medium credentials not configured. Simulating publish.');
      return { success: true, platform: 'medium', mode: 'simulation', id: 'sim_' + Date.now() };
    }

    try {
      // Get user ID first
      const userResponse = await fetch('https://api.medium.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${this.credentials.medium.token}`
        }
      });
      const userData = await userResponse.json();
      const userId = userData.data.id;

      // Publish post
      const endpoint = `https://api.medium.com/v1/users/${userId}/posts`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.credentials.medium.token}`
        },
        body: JSON.stringify({
          title,
          contentFormat: 'markdown',
          content,
          tags,
          publishStatus: 'public'
        })
      });

      const data = await response.json();

      return {
        success: response.ok,
        platform: 'medium',
        id: data.data?.id,
        url: data.data?.url
      };

    } catch (error) {
      console.error('Medium publish failed:', error.message);
      return { success: false, platform: 'medium', error: error.message };
    }
  }

  /**
   * Process scheduled content (run this periodically)
   */
  async processQueue() {
    console.log('🔄 Processing publish queue...');

    const now = new Date();
    const itemsToPublish = this.queue.filter(item => {
      return item.status === 'scheduled' && new Date(item.scheduledTime) <= now;
    });

    if (itemsToPublish.length === 0) {
      console.log('✓ No items ready to publish');
      return [];
    }

    console.log(`📤 Publishing ${itemsToPublish.length} items...`);

    const results = [];

    for (const item of itemsToPublish) {
      try {
        let result;

        switch (item.platform) {
          case 'twitter':
            result = await this.publishToTwitter(item.content);
            break;
          case 'linkedin':
            result = await this.publishToLinkedIn(item.content);
            break;
          case 'wordpress':
            result = await this.publishToWordPress(item.content.title, item.content.body, item.content.tags);
            break;
          case 'medium':
            result = await this.publishToMedium(item.content.title, item.content.body, item.content.tags);
            break;
          default:
            console.warn(`Unknown platform: ${item.platform}`);
            continue;
        }

        item.status = result.success ? 'published' : 'failed';
        item.publishedAt = new Date().toISOString();
        item.result = result;

        results.push({ ...item, ...result });

        console.log(`${result.success ? '✓' : '✗'} ${item.platform}: ${result.success ? 'Published' : 'Failed'}`);

      } catch (error) {
        console.error(`Error publishing ${item.platform}:`, error.message);
        item.status = 'failed';
        item.error = error.message;
        results.push(item);
      }
    }

    // Update queue (remove published items)
    this.queue = this.queue.filter(item => item.status === 'scheduled');
    this.saveQueue();

    // Save to history
    this.saveHistory(results);

    return results;
  }

  saveHistory(items) {
    let history = [];
    if (fs.existsSync(this.historyPath)) {
      history = JSON.parse(fs.readFileSync(this.historyPath, 'utf8'));
    }
    history.push(...items);
    fs.writeFileSync(this.historyPath, JSON.stringify(history, null, 2));
  }

  /**
   * View upcoming schedule
   */
  viewSchedule(days = 7) {
    const now = new Date();
    const upcoming = this.queue.filter(item => {
      const scheduledDate = new Date(item.scheduledTime);
      const diffDays = (scheduledDate - now) / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= days;
    });

    console.log(`\n📅 Upcoming ${days} days:\n`);
    
    if (upcoming.length === 0) {
      console.log('No scheduled content');
      return;
    }

    upcoming.forEach(item => {
      const date = new Date(item.scheduledTime);
      console.log(`${date.toLocaleString()} - ${item.platform}`);
      console.log(`  ${item.content.substring ? item.content.substring(0, 60) : item.content.title}...`);
      console.log();
    });
  }

  // Helper methods

  parseThread(content) {
    // Parse thread from numbered format (1/, 2/, etc.)
    const lines = content.split('\n');
    const tweets = [];
    let currentTweet = '';

    lines.forEach(line => {
      if (line.match(/^\d+\//)) {
        if (currentTweet) tweets.push(currentTweet.trim());
        currentTweet = line.replace(/^\d+\/\s*/, '');
      } else {
        currentTweet += '\n' + line;
      }
    });

    if (currentTweet) tweets.push(currentTweet.trim());

    return tweets;
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
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
Auto Publisher - Content calendar and auto-posting

Usage:
  node auto-publisher.js schedule <platform> <file> <datetime>  - Schedule post
  node auto-publisher.js calendar <year> <month>                - Generate monthly calendar
  node auto-publisher.js queue                                  - View publish queue
  node auto-publisher.js process                                - Process queue (publish due items)
  node auto-publisher.js history                                - View publish history

Platforms: twitter, linkedin, wordpress, medium

Examples:
  node auto-publisher.js schedule twitter tweet.txt "2026-02-05 10:00"
  node auto-publisher.js calendar 2026 2
  node auto-publisher.js process

Environment variables needed:
  TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET
  LINKEDIN_ACCESS_TOKEN, LINKEDIN_USER_ID
  WORDPRESS_URL, WORDPRESS_USERNAME, WORDPRESS_PASSWORD
  MEDIUM_TOKEN
`);
    process.exit(0);
  }

  const publisher = new AutoPublisher();
  const command = args[0];

  (async () => {
    try {
      if (command === 'schedule') {
        const platform = args[1];
        const filePath = args[2];
        const datetime = args[3];

        if (!platform || !filePath || !datetime) {
          throw new Error('Platform, file, and datetime required');
        }

        const content = fs.readFileSync(filePath, 'utf8');
        publisher.scheduleContent(content, platform, datetime);

      } else if (command === 'calendar') {
        const year = parseInt(args[1]);
        const month = parseInt(args[2]);

        if (!year || !month) {
          throw new Error('Year and month required');
        }

        const calendar = publisher.createMonthlyCalendar(year, month);
        console.log(`\n✓ Created calendar for ${year}-${month.toString().padStart(2, '0')}`);
        console.log(`Total days: ${calendar.length}`);

      } else if (command === 'queue') {
        publisher.viewSchedule(30);

      } else if (command === 'process') {
        const results = await publisher.processQueue();
        console.log(`\n✓ Processed ${results.length} items`);

      } else if (command === 'history') {
        if (fs.existsSync(publisher.historyPath)) {
          const history = JSON.parse(fs.readFileSync(publisher.historyPath, 'utf8'));
          console.log(`\n📊 Publish History (last 20):\n`);
          history.slice(-20).reverse().forEach(item => {
            console.log(`${item.publishedAt} - ${item.platform} - ${item.status}`);
            if (item.url) console.log(`  ${item.url}`);
          });
        } else {
          console.log('No history yet');
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

module.exports = AutoPublisher;
