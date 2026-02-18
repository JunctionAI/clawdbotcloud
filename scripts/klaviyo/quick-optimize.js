#!/usr/bin/env node
/**
 * Quick Subject Line Optimizer
 * Single command to generate variations for any subject line
 * 
 * Usage: node scripts/klaviyo/quick-optimize.js "Your subject line here"
 */

const subject = process.argv.slice(2).join(' ');

if (!subject) {
  console.log('Usage: node quick-optimize.js "Your email subject line"');
  process.exit(1);
}

console.log(`\n📧 Original: "${subject}"\n`);
console.log('🔄 Generating variations...\n');

// Quick rule-based variations (no API needed)
const variations = [
  { type: '🎯 Curiosity', subject: `The secret to ${subject.toLowerCase().replace(/^(the|your|our)\s+/i, '')}`.slice(0, 50) },
  { type: '❓ Question', subject: `${subject.replace(/\.$/, '')}?`.slice(0, 50) },
  { type: '⚡ Urgency', subject: `Today: ${subject}`.slice(0, 50) },
  { type: '✨ Emoji', subject: `✨ ${subject}`.slice(0, 50) },
  { type: '📱 Short', subject: subject.split(' ').slice(0, 4).join(' ').slice(0, 30) },
  { type: '🎁 Benefit', subject: `Get ${subject.toLowerCase().replace(/^(how to|the|your)\s+/i, '')}`.slice(0, 50) },
  { type: '🔢 Number', subject: `3 ways to ${subject.toLowerCase().replace(/^(how to|the|your)\s+/i, '')}`.slice(0, 50) },
  { type: '👤 Personal', subject: `{{first_name}}, ${subject.toLowerCase()}`.slice(0, 50) }
];

variations.forEach(v => {
  console.log(`${v.type}: "${v.subject}" (${v.subject.length} chars)`);
});

console.log(`\n💡 Tips:`);
console.log(`   - Under 40 chars = best mobile preview`);
console.log(`   - Emojis: +5-15% for health segment`);
console.log(`   - Questions drive curiosity clicks`);
console.log(`   - Personalization {{first_name}} = +10-20%`);
