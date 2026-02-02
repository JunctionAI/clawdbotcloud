#!/usr/bin/env node
/**
 * Book & PDF Resource Digestion
 * Extracts key concepts, frameworks, and insights from books and PDFs
 */

import SupermemoryClient from './supermemory-sync.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATE_PATH = path.join(__dirname, '..', 'config', 'book-digest-state.json');

class BookDigest {
  constructor() {
    this.state = null;
    this.supermemory = null;
  }

  async init() {
    // Load state
    try {
      this.state = JSON.parse(await fs.readFile(STATE_PATH, 'utf8'));
    } catch (err) {
      this.state = {
        processedBooks: [],
        library: []
      };
    }

    // Initialize Supermemory
    this.supermemory = await new SupermemoryClient().init();

    return this;
  }

  /**
   * Extract text from PDF
   */
  async extractPDFText(filePath) {
    console.log(`  📄 Extracting text from PDF...`);
    
    // Placeholder for PDF text extraction
    // In production, use pdf-parse or similar library
    // npm install pdf-parse
    
    try {
      // const pdfParse = require('pdf-parse');
      // const dataBuffer = await fs.readFile(filePath);
      // const data = await pdfParse(dataBuffer);
      // return data.text;
      
      console.log('  ⚠️  PDF parsing not yet implemented');
      console.log('  TODO: Install pdf-parse: npm install pdf-parse');
      return '';
    } catch (err) {
      console.error(`  ❌ PDF extraction failed: ${err.message}`);
      return '';
    }
  }

  /**
   * Analyze book content for key concepts
   */
  analyzeContent(text, metadata = {}) {
    console.log(`  🔍 Analyzing content...`);
    
    // Placeholder for intelligent content analysis
    // In production, use Claude API for deep analysis
    
    const analysis = {
      keyFrameworks: [],
      keyConcepts: [],
      actionableInsights: [],
      quotes: [],
      chapterSummaries: []
    };

    // Simple keyword detection (would be replaced with AI analysis)
    const frameworkPatterns = [
      /framework for .+/gi,
      /\d+ steps? to .+/gi,
      /model of .+/gi
    ];

    const quotePattern = /[""]([^"""]+)[""]( - .+)?/g;
    let match;
    while ((match = quotePattern.exec(text)) !== null && analysis.quotes.length < 10) {
      analysis.quotes.push(match[1]);
    }

    return analysis;
  }

  /**
   * Generate book summary
   */
  generateSummary(text, analysis, metadata = {}) {
    console.log(`  📝 Generating summary...`);
    
    // Placeholder for AI-powered summarization
    // In production, use Claude API
    
    return {
      title: metadata.title || 'Unknown',
      author: metadata.author || 'Unknown',
      mainThesis: 'Main thesis would be extracted here...',
      keyTakeaways: [
        'Key takeaway 1',
        'Key takeaway 2',
        'Key takeaway 3'
      ],
      whoShouldRead: 'Target audience analysis...',
      rating: 0,
      readingTime: Math.ceil(text.length / 1000) + ' hours'
    };
  }

  /**
   * Extract chapter-by-chapter insights
   */
  extractChapterInsights(text) {
    console.log(`  📖 Extracting chapter insights...`);
    
    // Placeholder for chapter detection and summarization
    // Would use AI to identify chapters and summarize each
    
    return [
      {
        chapter: 'Chapter 1',
        summary: 'Chapter summary...',
        keyPoints: ['Point 1', 'Point 2']
      }
    ];
  }

  /**
   * Process a book/PDF
   */
  async processBook(filePath, metadata = {}) {
    console.log(`\n📚 Processing book: ${filePath}\n`);

    try {
      // Check if already processed
      if (this.state.processedBooks.includes(filePath)) {
        console.log('⚠️  Already processed. Use --force to reprocess.');
        return null;
      }

      // Extract text
      let text = '';
      if (filePath.toLowerCase().endsWith('.pdf')) {
        text = await this.extractPDFText(filePath);
      } else if (filePath.toLowerCase().endsWith('.txt')) {
        text = await fs.readFile(filePath, 'utf8');
      } else {
        throw new Error('Unsupported file format. Use .pdf or .txt');
      }

      if (!text) {
        throw new Error('No text extracted from file');
      }

      console.log(`  📊 Extracted ${text.length} characters`);

      // Analyze content
      const analysis = this.analyzeContent(text, metadata);
      
      // Generate summary
      const summary = this.generateSummary(text, analysis, metadata);
      
      // Extract chapter insights
      const chapters = this.extractChapterInsights(text);

      // Create digest
      const digest = {
        file: filePath,
        title: summary.title,
        author: summary.author,
        processedAt: new Date().toISOString(),
        summary,
        analysis,
        chapters
      };

      // Save to Supermemory
      const content = `
BOOK DIGEST: ${summary.title}
Author: ${summary.author}
Reading Time: ${summary.readingTime}

MAIN THESIS:
${summary.mainThesis}

KEY TAKEAWAYS:
${summary.keyTakeaways.map((t, i) => `${i + 1}. ${t}`).join('\n')}

KEY FRAMEWORKS:
${analysis.keyFrameworks.join('\n')}

KEY CONCEPTS:
${analysis.keyConcepts.join(', ')}

ACTIONABLE INSIGHTS:
${analysis.actionableInsights.map(i => `→ ${i}`).join('\n')}

TOP QUOTES:
${analysis.quotes.map(q => `"${q}"`).join('\n\n')}

WHO SHOULD READ:
${summary.whoShouldRead}
      `.trim();

      await this.supermemory.add(content, {
        type: 'book_digest',
        title: summary.title,
        author: summary.author,
        file: filePath,
        timestamp: new Date().toISOString()
      });

      console.log('\n✅ Book digest saved to Supermemory');

      // Update state
      this.state.processedBooks.push(filePath);
      this.state.library.push({
        file: filePath,
        title: summary.title,
        author: summary.author,
        processedAt: digest.processedAt
      });
      await this.saveState();

      return digest;

    } catch (err) {
      console.error(`❌ Failed to process book: ${err.message}`);
      throw err;
    }
  }

  /**
   * Save state
   */
  async saveState() {
    await fs.writeFile(STATE_PATH, JSON.stringify(this.state, null, 2));
  }

  /**
   * Show library
   */
  showLibrary() {
    console.log('📚 Book Library\n');
    console.log('='.repeat(60));
    
    if (this.state.library.length === 0) {
      console.log('(empty - process books to build your library)');
    } else {
      this.state.library.forEach((book, i) => {
        console.log(`${i + 1}. ${book.title} by ${book.author}`);
        console.log(`   Processed: ${new Date(book.processedAt).toLocaleString()}`);
        console.log(`   File: ${book.file}`);
        console.log();
      });
    }
    
    console.log('='.repeat(60));
  }
}

// CLI interface
async function main() {
  try {
    const [command, ...args] = process.argv.slice(2);

    const digest = await new BookDigest().init();

    switch (command) {
      case 'process':
        const filePath = args[0];
        if (!filePath) {
          console.error('❌ Usage: node book-digest.js process <file.pdf>');
          process.exit(1);
        }
        
        const metadata = {
          title: args[1],
          author: args[2]
        };
        
        await digest.processBook(filePath, metadata);
        break;

      case 'library':
        digest.showLibrary();
        break;

      default:
        console.log(`
📚 Book & PDF Resource Digestion

Usage:
  node scripts/book-digest.js process <file> [title] [author]
  node scripts/book-digest.js library

Examples:
  node scripts/book-digest.js process ~/Downloads/atomic-habits.pdf "Atomic Habits" "James Clear"
  node scripts/book-digest.js library

Note: PDF parsing requires pdf-parse package
Install: npm install pdf-parse

AI-Powered Analysis:
  For best results, integrate with Claude API for:
  - Intelligent chapter summarization
  - Framework extraction
  - Key concept identification
  - Actionable insight generation
        `);
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  }
}

main();
