#!/usr/bin/env node
/**
 * Generator script for missing city+service combo pages and blog posts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..');

// ─── City data ────────────────────────────────────────────────────────────────
const CITIES = {
  'lower-hutt': {
    name: 'Lower Hutt',
    region: 'Hutt Valley',
    regionLong: 'Hutt Valley and the Greater Wellington region',
    lat: -41.2119,
    lng: 174.8980,
    pop: '110,000',
    desc: 'the heart of the Hutt Valley and part of the greater Wellington metropolitan area',
    seoOpportunity: 'Lower Hutt has a fast-growing commercial sector and underserved digital marketing landscape',
    notable: 'Petone foreshore, Naenae, Stokes Valley, and the Hutt CBD',
    industries: 'manufacturing, technology, professional services, retail, and healthcare',
    googleAdsNote: 'Greater Wellington region including Hutt Valley',
    metaNote: 'Hutt Valley residents, professionals, and families',
    socialNote: 'Hutt Valley community, local businesses, and the Wellington metropolitan audience',
    suburbs: 'Petone, Naenae, Wainuiomata, Stokes Valley, Taita, Moera, Avalon',
  },
  'gisborne': {
    name: 'Gisborne',
    region: 'Tairāwhiti',
    regionLong: 'Tairāwhiti and the East Coast region',
    lat: -38.6621,
    lng: 178.0179,
    pop: '50,000',
    desc: 'the first city in the world to see the sunrise and the gateway to the Tairāwhiti region',
    seoOpportunity: 'Gisborne has a booming horticulture and wine sector with minimal digital competition',
    notable: "Poverty Bay, Māhia Peninsula, Eastwoodhill Arboretum, and New Zealand's first sunrise",
    industries: 'horticulture, viticulture, forestry, fishing, tourism, and agribusiness',
    googleAdsNote: 'Tairāwhiti and East Coast region',
    metaNote: 'Gisborne residents, East Coast community, and tourism visitors',
    socialNote: 'Tairāwhiti community, horticulture sector, and tourism audiences',
    suburbs: 'Kaiti, Elgin, Mangapapa, Whataupoko, Lytton, Makaraka',
  },
  'invercargill': {
    name: 'Invercargill',
    region: 'Southland',
    regionLong: 'Southland and the wider southern New Zealand region',
    lat: -46.4132,
    lng: 168.3538,
    pop: '58,000',
    desc: 'the southernmost city in New Zealand and the commercial hub of the Southland region',
    seoOpportunity: 'Invercargill is underserved digitally despite being the hub of a wealthy farming and manufacturing region',
    notable: "Bluff (New Zealand's southernmost point), Southland Museum, Queens Park, and Stewart Island access",
    industries: 'farming, manufacturing, processing, professional services, retail, and tourism',
    googleAdsNote: 'Southland region including Bluff, Gore, and surrounding towns',
    metaNote: 'Southland residents, farming community, and Invercargill businesses',
    socialNote: 'Southland community, farming and rural sector, and Invercargill businesses',
    suburbs: 'Bluff, Windsor, Waikiwi, Hawthorndale, Georgetown, Strathern',
  },
  'queenstown': {
    name: 'Queenstown',
    region: 'Queenstown-Lakes',
    regionLong: 'Queenstown-Lakes district and the Central Otago region',
    lat: -45.0312,
    lng: 168.6626,
    pop: '45,000',
    desc: "New Zealand's adventure tourism capital and one of the world's premier destination cities",
    seoOpportunity: 'Queenstown has intense tourism competition and high digital spend — but smart SEO still delivers strong ROI for local businesses',
    notable: 'Remarkables, Coronet Peak, Lake Wakatipu, Milford Sound access, and world-class adventure activities',
    industries: 'tourism, hospitality, adventure sports, real estate, retail, and professional services',
    googleAdsNote: 'Queenstown-Lakes district including Wānaka, Frankton, and Arrowtown',
    metaNote: 'Queenstown locals, Otago region, and international tourism audiences',
    socialNote: 'Queenstown community, tourism visitors, adventure sports enthusiasts, and the wider Otago audience',
    suburbs: 'Frankton, Arrowtown, Wānaka, Fernhill, Kelvin Heights, Lake Hayes',
  },
};

const TIER2_CITIES = {
  'whangarei': {
    name: 'Whangarei',
    region: 'Northland',
    regionLong: 'Northland region',
    lat: -35.7275,
    lng: 174.3246,
    pop: '95,000',
    desc: 'the capital of Northland and the gateway to the Bay of Islands',
    notable: 'Whangarei Falls, Town Basin, Tutukaka, Bay of Islands access',
    industries: 'tourism, fishing, agriculture, professional services, retail, and trades',
    metaNote: 'Northland residents, tourism visitors, and Whangarei businesses',
    socialNote: 'Northland community, Bay of Islands tourism audiences, and Whangarei businesses',
    suburbs: 'Kamo, Tikipunga, Otaika, Raumanga, Morningside, Maunu',
  },
  'palmerston-north': {
    name: 'Palmerston North',
    region: 'Manawatū',
    regionLong: 'Manawatū-Whanganui region',
    lat: -40.3523,
    lng: 175.6082,
    pop: '92,000',
    desc: 'the centre of the Manawatū region and home to Massey University',
    notable: "The Square, Victoria Esplanade, Massey University, New Zealand's Rugby Museum",
    industries: 'education, food processing, logistics, retail, healthcare, and professional services',
    metaNote: 'Manawatū residents, Massey University community, and Palmerston North businesses',
    socialNote: 'Manawatū community, university sector, and Palmerston North businesses',
    suburbs: 'Roslyn, Terrace End, Awapuni, Milson, Takaro, Hokowhitu',
  },
  'napier': {
    name: 'Napier',
    region: "Hawke's Bay",
    regionLong: "Hawke's Bay region",
    lat: -39.4928,
    lng: 176.9120,
    pop: '67,000',
    desc: "the Art Deco capital of New Zealand and the heart of Hawke's Bay wine country",
    notable: "Art Deco architecture, Cape Kidnappers gannet colony, Hawke's Bay wine region, Marine Parade",
    industries: 'viticulture, horticulture, tourism, food and beverage, professional services, and retail',
    metaNote: "Hawke's Bay residents, wine tourism visitors, and Napier businesses",
    socialNote: "Hawke's Bay community, wine and food tourism, and Napier businesses",
    suburbs: 'Taradale, Greenmeadows, Maraenui, Onekawa, Bay View, Clive',
  },
  'new-plymouth': {
    name: 'New Plymouth',
    region: 'Taranaki',
    regionLong: 'Taranaki region',
    lat: -39.0556,
    lng: 174.0752,
    pop: '85,000',
    desc: 'the commercial centre of the Taranaki region, home to Mount Taranaki and the energy sector',
    notable: 'Mount Taranaki (Egmont), Govett-Brewster Art Gallery, coastal walkway, and the Len Lye Centre',
    industries: 'energy sector, agriculture, tourism, professional services, retail, and manufacturing',
    metaNote: 'Taranaki residents, energy sector professionals, and New Plymouth businesses',
    socialNote: 'Taranaki community, outdoor and adventure tourism, and New Plymouth businesses',
    suburbs: 'Strandon, Moturoa, Brooklands, Merrilands, Vogeltown, Bell Block',
  },
  'rotorua': {
    name: 'Rotorua',
    region: 'Bay of Plenty',
    regionLong: 'Bay of Plenty and Rotorua region',
    lat: -38.1368,
    lng: 176.2497,
    pop: '78,000',
    desc: "New Zealand's geothermal tourism capital and a hub of Māori culture",
    notable: 'Te Puia geothermal park, Wai-O-Tapu, redwood forests, Te Ara Ahi geothermal trail, and Māori cultural experiences',
    industries: 'tourism, Māori cultural experiences, forestry, agribusiness, healthcare, and professional services',
    metaNote: 'Rotorua locals, Bay of Plenty region, and international tourism visitors',
    socialNote: 'Rotorua community, geothermal and Māori tourism audiences, and Bay of Plenty businesses',
    suburbs: 'Ngongotahā, Lynmore, Holdens Bay, Fenton Park, Glenholme, Koutu',
  },
};

// ─── Service templates ─────────────────────────────────────────────────────────

function seoPage(citySlug, city) {
  const { name, region, regionLong, lat, lng, desc, seoOpportunity, notable, industries, suburbs } = city;
  return `import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency ${name} | AI-Native SEO for ${name} Businesses | Junction Media',
  description: 'Looking for an SEO agency in ${name}? Junction Media delivers AI-powered SEO — technical audits, content strategy, and authority building for ${name} and ${regionLong}. $1,200–$2,500/mo.',
  keywords: 'SEO agency ${name}, ${name} SEO company, SEO ${name}, SEO services ${name}, best SEO agency ${name}, ${name} SEO consultant, local SEO ${name}, SEO company ${name} NZ',
  openGraph: {
    title: 'SEO Agency ${name} | Junction Media',
    description: 'AI-native SEO for ${name} businesses. Technical SEO, content strategy, and authority building. Real results that compound over time.',
    url: 'https://www.junctionmedia.ai/${citySlug}/seo-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/${citySlug}/seo-agency',
  },
}

const faqs = [
  {
    q: 'How much does an SEO agency in ${name} cost?',
    a: '${name} SEO agency pricing at Junction Media starts at $1,200/month NZD for core technical SEO and content, scaling to $2,500/month for aggressive authority building. All engagements are 3-month minimum — meaningful rankings take time to build. This reflects the investment required to produce real, compounding organic results for ${name} businesses.',
  },
  {
    q: 'How long does SEO take to work for ${name} businesses?',
    a: 'For most ${name} businesses targeting competitive local keywords, expect meaningful ranking movement in 3–4 months and strong positions by month 6–9. Less competitive niches in ${region} can move faster. Technical fixes often show impact in 4–8 weeks. ${name}\\'s SEO landscape is less saturated than Auckland, meaning faster gains are often achievable for businesses that invest properly.',
  },
  {
    q: 'Do you specialise in local SEO for ${name}?',
    a: 'Yes — local SEO for ${name} and the wider ${regionLong} is central to our work. Local rankings depend on Google Business Profile optimisation, NZ-specific citations, local schema, and content that signals genuine local relevance in the ${region} market. We understand the ${name} search landscape and build strategies around it.',
  },
  {
    q: 'What makes Junction Media different from other ${name} SEO companies?',
    a: 'We use AI for execution (keyword research, content production, technical monitoring) but lead with human strategy. We work with 3–5 clients at a time — not 50. And we think in systems: topical authority clusters, not individual keywords. For ${name} businesses, this means building an organic channel that compounds over time, not chasing one ranking.',
  },
  {
    q: 'Can you help if my ${name} business has been hit by a Google algorithm update?',
    a: 'Yes. Google Core Updates have hit many NZ sites hard — particularly sites with thin content, poor E-E-A-T signals, or over-reliance on AI-generated filler. We diagnose what changed, identify the root cause, and build a recovery plan. Recovery typically takes 3–6 months but is achievable with the right approach.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      name: 'Junction Media',
      url: 'https://www.junctionmedia.ai',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Auckland',
        addressRegion: 'Auckland',
        addressCountry: 'NZ',
      },
      areaServed: [
        { '@type': 'City', name: '${name}' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'SEO Agency ${name}',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Search Engine Optimisation',
      areaServed: {
        '@type': 'City',
        name: '${name}',
      },
      description: 'AI-native SEO services for ${name} businesses. Technical SEO, content strategy, and authority building that turns organic search into a compounding acquisition channel.',
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '1200',
          maxPrice: '2500',
          priceCurrency: 'NZD',
          unitText: 'month',
        },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ],
}

export default function ${toPascal(citySlug)}SEOAgencyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">
          Junction Media
        </Link>
        <Link
          href="/apply"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Apply to Work With Us
        </Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          ${name} · SEO
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO Agency ${name}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native SEO for ${name} businesses. Technical audits, content strategy, and authority
          building that turns organic search into a compounding acquisition channel — not a
          monthly expense that stops the moment you pause.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Us
          </Link>
          <Link
            href="/services/seo-nz"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View SEO Services
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.2k–$2.5k', label: 'Per month NZD' },
            { stat: '3-month', label: 'Minimum engagement' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: '3–5', label: 'Clients at a time (max)' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">SEO in ${name}: What Actually Moves the Needle</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            ${name} is ${desc}. The local digital marketing landscape is less saturated than
            Auckland or Wellington, which means businesses that invest in proper SEO now can
            establish dominant positions faster and hold them longer.
          </p>
          <p className="text-gray-600 leading-relaxed">
            ${seoOpportunity}. Most established local businesses built their customer base on
            reputation and word of mouth — their digital presence hasn&apos;t kept pace. That
            creates a genuine first-mover advantage for businesses willing to invest in
            systematic, compound-oriented SEO.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Key ${name} industries include ${industries}. Each has addressable organic search
            demand from local customers and regional visitors. The goal: build content and
            authority that compounds over months and years, not campaigns that stop the moment
            you pause the spend.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our ${name} SEO Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Technical SEO Audit & Fixes',
              desc: 'Crawl errors, Core Web Vitals, mobile performance, structured data, internal linking. We find what\\'s suppressing your ${name} rankings — and implement the fixes, not just report them.',
            },
            {
              title: 'Local ${name} SEO',
              desc: 'Google Business Profile optimisation, local citations across NZ directories, local schema markup, and suburb-level content for ${suburbs} and surrounding areas. Built for searches like "trades ${name}" or "professional services ${region}."',
            },
            {
              title: 'Content Strategy & Production',
              desc: 'Topical authority mapping specific to your ${name} niche. AI-assisted content production that builds ranking assets — not keyword-stuffed filler. Content that earns links because it\\'s genuinely useful.',
            },
            {
              title: 'Authority Building',
              desc: 'Digital PR and link acquisition from NZ-relevant publications, industry sites, and ${region} business directories. White-hat, sustainable — no link schemes that create penalty risk.',
            },
            {
              title: 'On-Page Optimisation',
              desc: 'Every priority page on your ${name} site optimised for its target queries. Title tags, meta descriptions, headers, internal links, schema, and content structure — all tuned to current ranking signals.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Plain-English monthly reports: what moved, what we published, what we built, and what comes next. Ranking data tied to traffic and lead data — not vanity metrics.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">A Result Worth Mentioning</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-3xl font-bold text-gray-900 mb-2">+30%</p>
          <p className="text-gray-500 text-sm mb-4">Above previous all-time store record — month 1</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a New Zealand supplement brand — hit their best revenue month ever
            in November 2025. We built AI-native marketing systems across Google Ads, Meta Ads,
            SEO, content, and customer support. The result: 30% above their previous all-time record,
            in month one of the engagement.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">We Know the ${name} Market</h2>
        <div className="space-y-4">
          {[
            '${name} CBD and surrounding suburbs — strong local search intent for trades, professional services, and retail',
            '${region} region — a broader audience reachable through well-structured local SEO and content',
            'Key ${name} industries: ${industries} — all with addressable organic search demand',
            'Notable areas and landmarks: ${notable} — local context that builds genuine geographic relevance',
            'Suburbs including ${suburbs} — suburb-level content that signals real local expertise to Google',
          ].map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">→</span>
              <p className="text-gray-600 text-sm">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Common Questions</h2>
        <div className="space-y-8">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Further Reading</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'SEO Agency ${name} — Full Guide', href: '/blog/seo-agency-${citySlug}' },
            { title: 'SEO Services NZ — Full Overview', href: '/services/seo-nz' },
            { title: '${name} Marketing Hub', href: '/${citySlug}' },
            { title: 'Google Ads Agency ${name}', href: '/${citySlug}/google-ads-agency' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to dominate ${name} search?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re serious about turning organic search into a compounding acquisition channel
            for your ${name} business — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. ${name} & ${region} businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/${citySlug}" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">${name}</Link>
            <Link href="/services/seo-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">SEO NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
`;
}

function googleAdsPage(citySlug, city) {
  const { name, region, regionLong, lat, lng, desc, notable, industries, suburbs, googleAdsNote } = city;
  return `import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency ${name} | PPC Management for ${name} Businesses | Junction Media',
  description: 'Google Ads management for ${name} businesses. AI-optimised PPC campaigns targeting ${name} and the ${regionLong}. Transparent reporting, real results. $1,500–$3,500/mo.',
  keywords: 'Google Ads agency ${name}, PPC agency ${name}, Google Ads ${name}, PPC ${name}, Google Ads management ${name}, paid search ${name}, Google Adwords ${name}, PPC consultant ${name} NZ',
  openGraph: {
    title: 'Google Ads Agency ${name} | Junction Media',
    description: 'AI-optimised Google Ads for ${name} businesses. Active management, transparent reporting, real results.',
    url: 'https://www.junctionmedia.ai/${citySlug}/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/${citySlug}/google-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Google Ads management cost for ${name} businesses?',
    a: 'Junction Media charges $1,500–$3,500/month NZD for Google Ads management, separate from your ad spend. For ${name} businesses in competitive categories, we typically recommend a minimum ad spend of $1,500–$3,000/month to generate meaningful data and results. ${region} markets often have lower CPCs than Auckland, making ad spend go further.',
  },
  {
    q: 'What ${name} industries benefit most from Google Ads?',
    a: '${name}\\'s industry mix makes it particularly strong for Google Ads in: ${industries}. High-intent local searches — "builder ${name}," "accountant ${region}," "plumber ${name}" — capture motivated buyers at the moment of decision.',
  },
  {
    q: 'Can you target specific ${name} suburbs and surrounding areas with Google Ads?',
    a: 'Yes — Google Ads location targeting allows us to focus spend on ${name} and the wider ${googleAdsNote}. We can also set radius targeting around your ${name} office or service area for hyper-local campaigns.',
  },
  {
    q: 'How long does it take for Google Ads to work for a ${name} business?',
    a: 'Traffic starts immediately when campaigns go live. Meaningful optimisation — finding the right keywords, negative lists, bid strategies, and ad copy that converts — typically takes 6–10 weeks of active management. By month 3, a well-managed ${name} Google Ads account should be delivering consistent, measurable returns.',
  },
  {
    q: 'Do you provide conversion tracking for ${name} Google Ads?',
    a: 'Yes — proper GA4 + Google Ads conversion tracking is set up from day one of every engagement. Phone call tracking, form fill tracking, e-commerce purchase tracking — everything is connected so you can see exactly what campaigns are driving revenue for your ${name} business.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      name: 'Junction Media',
      url: 'https://www.junctionmedia.ai',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Auckland',
        addressRegion: 'Auckland',
        addressCountry: 'NZ',
      },
      areaServed: [
        { '@type': 'City', name: '${name}' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Google Ads Agency ${name}',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management',
      areaServed: {
        '@type': 'City',
        name: '${name}',
      },
      description: 'AI-optimised Google Ads management for ${name} businesses. Search, display, and Performance Max campaigns built for the ${region} market.',
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '1500',
          maxPrice: '3500',
          priceCurrency: 'NZD',
          unitText: 'month',
        },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ],
}

export default function ${toPascal(citySlug)}GoogleAdsAgencyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">
          Junction Media
        </Link>
        <Link
          href="/apply"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Apply to Work With Us
        </Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          ${name} · Google Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency ${name}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-optimised Google Ads management for ${name} businesses. We build and manage PPC
          campaigns that capture high-intent ${name} searchers at the exact moment they&apos;re
          ready to buy — turning ad spend into measurable, trackable revenue.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Us
          </Link>
          <Link
            href="/services/google-ads-nz"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View Google Ads Services
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.5k–$3.5k', label: 'Management per month NZD' },
            { stat: '3-month', label: 'Minimum engagement' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: '3–5', label: 'Clients at a time (max)' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Google Ads in ${name}: Capturing Local Intent</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            ${name} is ${desc}. When local residents and regional visitors search Google for
            services — trades, professional services, healthcare, hospitality — they&apos;re ready to
            act. Google Ads puts your ${name} business at the top of those searches, at the
            exact moment of highest intent.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Unlike social media advertising, which interrupts people who aren&apos;t looking for you,
            Google Ads captures demand that already exists. Someone searching &quot;plumber ${name}&quot;
            or &quot;accountant ${region}&quot; has a specific need and is ready to make a decision.
            Being at the top of that result is worth real money.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We manage ${name} Google Ads with an AI-assisted approach — faster keyword discovery,
            smarter negative keyword management, continuous bid optimisation, and creative
            iteration that keeps campaigns improving month over month.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our ${name} Google Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Campaign Strategy & Build',
              desc: 'Full campaign architecture for ${name}: search campaigns, display, and Performance Max where appropriate. Built around your ${region} customer journey — from discovery to conversion.',
            },
            {
              title: 'Keyword Research & Negative Lists',
              desc: '${name}-specific keyword research covering all relevant local search queries. Comprehensive negative keyword lists to eliminate wasted spend on irrelevant searches across the ${region} region.',
            },
            {
              title: 'Ad Copy & Creative',
              desc: 'Compelling search ads that stop ${name} searchers and drive clicks. A/B tested headlines and descriptions, continuously refined based on performance data.',
            },
            {
              title: 'Conversion Tracking',
              desc: 'GA4 + Google Ads conversion tracking: phone calls, form submissions, purchases, and custom events. You know exactly what your ${name} ad spend is returning — not just clicks.',
            },
            {
              title: 'Bid Management & Optimisation',
              desc: 'Active bid management using AI-assisted analysis. Budget allocation across campaigns, dayparting for ${name} business hours, and continuous ROAS improvement.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Plain-English reports: spend, clicks, conversions, ROAS, and what we changed. No vanity metrics — only data that connects your ${name} Google Ads investment to business outcomes.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">A Result Worth Mentioning</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-3xl font-bold text-gray-900 mb-2">+30%</p>
          <p className="text-gray-500 text-sm mb-4">Above previous all-time store record — month 1</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a New Zealand supplement brand — hit their best revenue month ever
            in November 2025. We built AI-native marketing systems across Google Ads, Meta Ads,
            SEO, content, and customer support. Google Ads was a core driver of the result.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Common Questions</h2>
        <div className="space-y-8">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Further Reading</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Google Ads Agency ${name} — Full Guide', href: '/blog/google-ads-agency-${citySlug}' },
            { title: 'Google Ads Services NZ', href: '/services/google-ads-nz' },
            { title: '${name} Marketing Hub', href: '/${citySlug}' },
            { title: 'SEO Agency ${name}', href: '/${citySlug}/seo-agency' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to grow your ${name} business with Google Ads?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want Google Ads campaigns that generate real, measurable results for your
            ${name} business — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. ${name} & ${region} businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/${citySlug}" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">${name}</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
`;
}

function metaAdsPage(citySlug, city) {
  const { name, region, regionLong, desc, notable, industries, metaNote } = city;
  return `import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads Agency ${name} | Facebook & Instagram Ads for ${name} Businesses | Junction Media',
  description: 'Meta Ads agency in ${name} managing Facebook and Instagram advertising for ${regionLong} businesses. AI-assisted targeting, creative strategy, and ROAS-focused campaigns. $1,200–$2,500/mo.',
  keywords: 'Meta Ads agency ${name}, Facebook Ads ${name}, Instagram Ads ${name}, Meta advertising ${name}, Facebook advertising ${name}, social media advertising ${name}, Meta Ads ${region}, paid social ${name}',
  openGraph: {
    title: 'Meta Ads Agency ${name} | Junction Media',
    description: 'AI-managed Meta Ads (Facebook & Instagram) for ${name} and ${region} businesses. Creative strategy, audience targeting, and ROAS-focused campaigns.',
    url: 'https://www.junctionmedia.ai/${citySlug}/meta-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/${citySlug}/meta-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Meta Ads management cost in ${name}?',
    a: 'Meta Ads management for ${name} businesses costs $1,200–$2,500/month for professional management, separate from your ad spend budget. We recommend a minimum ad spend of $1,000–$2,000/month to generate enough data for meaningful optimisation. ${name}\\'s audience size is smaller than Auckland, so spend needs to be sufficient to reach and test effectively.',
  },
  {
    q: 'Is Meta Ads (Facebook/Instagram) effective for ${name} businesses?',
    a: 'Yes — Facebook and Instagram remain the dominant social platforms in New Zealand, and ${name} has strong user bases across both. Meta Ads work particularly well for ${name} businesses selling to consumers: ${industries}. The platform\\'s targeting precision makes it highly effective for reaching ${metaNote}.',
  },
  {
    q: 'Can Meta Ads work for B2B businesses in ${name}?',
    a: 'Meta Ads are primarily a B2C channel, but they can work for B2B businesses in ${name} — particularly for brand awareness, retargeting website visitors, and reaching decision-makers in specific industries. For pure B2B lead generation, we often recommend a blended approach combining Google Ads (for high-intent search) with Meta retargeting.',
  },
  {
    q: 'How do you target ${name} audiences on Meta?',
    a: 'We use geographic targeting to focus spend on ${name} and the ${region} region, combined with interest, behaviour, and demographic targeting relevant to your customer profile. We also leverage custom audiences (website visitors, customer lists) and lookalike audiences built from your best existing customers in the ${region} market.',
  },
  {
    q: 'What results can a ${name} business expect from Meta Ads?',
    a: 'Results vary by industry and offer, but well-managed Meta Ads campaigns for ${name} businesses typically achieve positive ROAS within 30–60 days. The learning phase (Meta\\'s algorithm optimising delivery) takes 2–3 weeks. ${region} businesses targeting local customers can reach highly qualified audiences with precise geographic and interest-based targeting.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      name: 'Junction Media',
      url: 'https://www.junctionmedia.ai',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Auckland',
        addressRegion: 'Auckland',
        addressCountry: 'NZ',
      },
      areaServed: [
        { '@type': 'City', name: '${name}' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Meta Ads Agency ${name}',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Meta Ads Management',
      areaServed: {
        '@type': 'City',
        name: '${name}',
      },
      description: 'AI-managed Meta Ads (Facebook & Instagram) for ${name} and ${region} businesses. Creative strategy, audience targeting, and ROAS-focused campaign management.',
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '1200',
          maxPrice: '2500',
          priceCurrency: 'NZD',
          unitText: 'month',
        },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ],
}

export default function ${toPascal(citySlug)}MetaAdsAgencyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">
          Junction Media
        </Link>
        <Link
          href="/apply"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Apply to Work With Us
        </Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          ${name} · Meta Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Meta Ads Agency ${name}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-managed Facebook and Instagram advertising for ${name} and ${region} businesses. We
          build Meta campaigns that reach the right ${name} audiences and convert attention into
          measurable revenue.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Us
          </Link>
          <Link
            href="/services/meta-ads-nz"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View Meta Ads Services
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.2k–$2.5k', label: 'Management per month NZD' },
            { stat: '3-month', label: 'Minimum engagement' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: '3–5', label: 'Clients at a time (max)' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Meta Ads in ${name}: Reaching ${region}&apos;s Audiences</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            ${name} is ${desc}. The ${region} audience on Facebook and Instagram spans
            ${metaNote} — a diverse and addressable demographic for consumer-facing businesses.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For consumer-facing ${name} businesses, Meta Ads offer unmatched audience reach and
            targeting precision. Reach local ${name} residents by interest, age, location, and
            behaviour. Retarget visitors to your website. Build lookalike audiences from your best
            customers. The platform&apos;s data depth is particularly effective for businesses in
            ${industries}.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We manage Meta Ads with an AI-assisted approach — faster creative iteration, smarter
            audience testing, and continuous optimisation that keeps campaigns improving month over
            month rather than plateauing.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our ${name} Meta Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Audience Research & Targeting',
              desc: 'Deep audience research for the ${name} and ${region} market. Interest targeting, behaviour targeting, demographic segmentation, and custom audience builds specific to your ${name} customer profile.',
            },
            {
              title: 'Creative Strategy & Production',
              desc: 'Ad creative that resonates with ${name} audiences — images, video concepts, copy, and hooks developed for the ${region} market. We iterate creative based on performance data, not guesswork.',
            },
            {
              title: 'Campaign Architecture',
              desc: 'Proper Meta campaign structure: awareness, consideration, and conversion campaigns built around your ${name} customer journey. No wasted spend on audiences that are unlikely to convert.',
            },
            {
              title: 'Pixel & Conversion Tracking',
              desc: 'Meta Pixel setup, conversion event configuration, and accurate attribution. You know exactly which ads are driving ${name} customers to take action — calls, form fills, purchases.',
            },
            {
              title: 'Retargeting & Lookalike Audiences',
              desc: 'Website visitor retargeting and lookalike audience creation from your existing ${name} customers. The highest-efficiency segment of any Meta campaign — reaching people already familiar with your brand.',
            },
            {
              title: 'Monthly Optimisation & Reporting',
              desc: 'Weekly creative and audience testing, budget reallocation, and continuous ROAS improvement. Monthly reports that show what\\'s working in your ${name} Meta campaigns and what we\\'re changing.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">A Result Worth Mentioning</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-3xl font-bold text-gray-900 mb-2">+30%</p>
          <p className="text-gray-500 text-sm mb-4">Above previous all-time store record — month 1</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a New Zealand supplement brand — hit their best revenue month ever
            in November 2025. We built AI-native marketing systems across Google Ads, Meta Ads,
            SEO, content, and customer support. Meta Ads was a key driver of the result.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Common Questions</h2>
        <div className="space-y-8">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Further Reading</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Meta Ads Agency ${name} — Full Guide', href: '/blog/meta-ads-agency-${citySlug}' },
            { title: 'Meta Ads Services NZ', href: '/services/meta-ads-nz' },
            { title: '${name} Marketing Hub', href: '/${citySlug}' },
            { title: 'Google Ads Agency ${name}', href: '/${citySlug}/google-ads-agency' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to grow your ${name} business with Meta Ads?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want Facebook and Instagram campaigns that generate real results for your ${name}
            or ${region} business — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. ${name} & ${region} businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/${citySlug}" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">${name}</Link>
            <Link href="/services/meta-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Meta Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
`;
}

function socialMediaPage(citySlug, city) {
  const { name, region, regionLong, desc, notable, industries, socialNote } = city;
  return `import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media Agency ${name} | Social Media Marketing for ${name} Businesses | Junction Media',
  description: 'Social media agency serving ${name} and ${region} businesses. Strategy, content, community management, and paid social for Instagram, Facebook, LinkedIn, and TikTok. $1,200–$2,500/mo.',
  keywords: 'social media agency ${name}, social media marketing ${name}, social media management ${name}, Instagram marketing ${name}, Facebook marketing ${name}, social media ${name} NZ, ${region} social media agency',
  openGraph: {
    title: 'Social Media Agency ${name} | Junction Media',
    description: 'AI-native social media marketing for ${name} and ${region} businesses. Strategy, content, and paid social that builds brand and drives revenue.',
    url: 'https://www.junctionmedia.ai/${citySlug}/social-media-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/${citySlug}/social-media-agency',
  },
}

const faqs = [
  {
    q: 'How much does social media management cost for a ${name} business?',
    a: 'Social media management for ${name} businesses at Junction Media ranges from $1,200–$2,500/month NZD depending on scope. This includes strategy, content creation, scheduling, and reporting. Paid social advertising (Meta Ads, TikTok Ads) is managed separately with its own ad spend budget. We work with ${name} businesses that are serious about social media as a real business channel.',
  },
  {
    q: 'Which social media platforms work best for ${name} businesses?',
    a: 'Instagram and Facebook (Meta) have the broadest reach for most ${name} consumer businesses. LinkedIn is the go-to for B2B professional services targeting ${region}\\'s professional sector. TikTok is increasingly relevant for hospitality, tourism, and lifestyle brands targeting younger ${name} audiences. We recommend the right platform mix based on your industry and target customer.',
  },
  {
    q: 'Can social media help ${name} businesses attract customers?',
    a: 'Absolutely — social media is one of the most effective ways for ${name} businesses to build brand awareness, engage with the local ${region} community, and attract new customers. Businesses in ${industries} all benefit from consistent, high-quality social media presence. The key is strategy and consistency — not just posting randomly.',
  },
  {
    q: 'How does social media work alongside other marketing channels for ${name} businesses?',
    a: 'Social media works best as part of an integrated approach. For ${name} businesses, the highest-ROI combination is typically: SEO for long-term organic growth, Google Ads for high-intent local search, and Meta/social for brand building, retargeting, and audience nurturing. Social media builds the brand awareness that makes paid search more effective and SEO content more shareable.',
  },
  {
    q: 'Do you create content or just manage accounts for ${name} businesses?',
    a: 'We do both, depending on what your ${name} business needs. Our social media management includes content strategy, copywriting, and creative direction. We can work with your existing visual assets or guide you on content production. For businesses with team members who can capture content on-site in ${name}, we often find a hybrid model works best — we handle strategy and editing, you supply raw content.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      name: 'Junction Media',
      url: 'https://www.junctionmedia.ai',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Auckland',
        addressRegion: 'Auckland',
        addressCountry: 'NZ',
      },
      areaServed: [
        { '@type': 'City', name: '${name}' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Social Media Agency ${name}',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Social Media Marketing',
      areaServed: {
        '@type': 'City',
        name: '${name}',
      },
      description: 'AI-native social media marketing for ${name} and ${region} businesses. Strategy, content, community management, and paid social across Instagram, Facebook, LinkedIn, and TikTok.',
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '1200',
          maxPrice: '2500',
          priceCurrency: 'NZD',
          unitText: 'month',
        },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ],
}

export default function ${toPascal(citySlug)}SocialMediaAgencyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">
          Junction Media
        </Link>
        <Link
          href="/apply"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Apply to Work With Us
        </Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          ${name} · Social Media
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Social Media Agency ${name}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native social media marketing for ${name} and ${region} businesses. Strategy, content
          creation, community management, and paid social that builds genuine brand presence and
          drives real business results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Us
          </Link>
          <Link
            href="/services/social-media-nz"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View Social Media Services
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.2k–$2.5k', label: 'Management per month NZD' },
            { stat: '3-month', label: 'Minimum engagement' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: '3–5', label: 'Clients at a time (max)' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Social Media in ${name}: Building Brand & Community</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            ${name} is ${desc}. The ${region} social media landscape spans ${socialNote} —
            a vibrant and engaged audience for businesses that show up with quality, consistent content.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Most ${name} businesses have inconsistent social media presence: irregular posting, generic
            content, no clear strategy. That creates opportunity. Businesses that invest in systematic,
            high-quality social media stand out clearly in the ${region} market — and the engagement
            compounds as audiences grow.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We build social media systems for ${name} businesses — not one-off campaigns, but
            structured content strategies that build audience, drive engagement, and create real
            commercial outcomes over time.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our ${name} Social Media Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Social Media Strategy',
              desc: 'Platform selection, content pillars, posting cadence, and audience growth strategy — all built around your ${name} business goals and ${region} target customer. Strategy first, execution second.',
            },
            {
              title: 'Content Creation & Scheduling',
              desc: 'High-quality social content for ${name} — copy, creative direction, hashtag strategy, and scheduled posting. AI-assisted production that maintains quality at scale.',
            },
            {
              title: 'Community Management',
              desc: 'Comment responses, DM management, and community engagement for your ${name} social accounts. Building a genuine community around your brand in the ${region} market.',
            },
            {
              title: 'Platform Management',
              desc: 'Instagram, Facebook, LinkedIn, and TikTok management tailored to what works for ${name} businesses in your category. Right platform, right content, right audience.',
            },
            {
              title: 'Paid Social Integration',
              desc: 'Organic social and paid Meta Ads working together — organic builds the audience, paid amplifies what works. A coordinated approach for maximum ${name} impact.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Clear monthly reports: follower growth, engagement rates, reach, and — most importantly — how social is contributing to traffic, leads, and revenue for your ${name} business.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">A Result Worth Mentioning</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-3xl font-bold text-gray-900 mb-2">+30%</p>
          <p className="text-gray-500 text-sm mb-4">Above previous all-time store record — month 1</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a New Zealand supplement brand — hit their best revenue month ever
            in November 2025. We built AI-native marketing systems across Google Ads, Meta Ads,
            SEO, content, and customer support. Social media was part of the integrated system
            that drove the result.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Common Questions</h2>
        <div className="space-y-8">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Further Reading</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Social Media Agency ${name} — Full Guide', href: '/blog/social-media-agency-${citySlug}' },
            { title: 'Social Media Services NZ', href: '/services/social-media-nz' },
            { title: '${name} Marketing Hub', href: '/${citySlug}' },
            { title: 'Meta Ads Agency ${name}', href: '/${citySlug}/meta-ads-agency' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build your ${name} social media presence?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want social media that actually builds brand and drives revenue for your ${name}
            or ${region} business — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. ${name} & ${region} businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/${citySlug}" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">${name}</Link>
            <Link href="/services/social-media-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Social Media NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
`;
}

// ─── Blog post templates ───────────────────────────────────────────────────────

function seoBlogPost(citySlug, city) {
  const { name, region, regionLong, desc, notable, industries, seoOpportunity, pop } = city;
  const today = '2026-02-20';
  return `---
title: "SEO Agency ${name} | ${region}'s Digital Growth Opportunity"
slug: "seo-agency-${citySlug}"
date: "${today}"
excerpt: "${name} is ${desc} — and one of New Zealand's most underserved markets for serious SEO investment. ${seoOpportunity}. Here's how to capitalise on the organic search opportunity."
keywords: ["seo agency ${citySlug}", "seo ${citySlug}", "seo company ${citySlug}", "${citySlug} seo services", "${region.toLowerCase()} seo", "search engine optimisation ${citySlug}", "digital marketing ${citySlug} nz", "local seo ${citySlug}"]
tags: ["seo", "${citySlug}", "new zealand", "${region.toLowerCase().replace(/[^a-z0-9]/g, '-')}"]
description: "A comprehensive guide to SEO for ${name} and ${region} businesses. Understand the ${name} search market, the organic opportunity, and how to build rankings that compound over time."
author: "Junction Media"
---

# SEO Agency ${name}: ${region}'s Digital Growth Opportunity

${name} is ${desc}. With a population of around ${pop} and key industries spanning ${industries}, the city has real commercial depth — and a digital marketing landscape that hasn't kept pace with economic growth.

That gap is the opportunity.

Most established ${name} businesses built their customer base on reputation, referrals, and word of mouth over years or decades. Their digital presence — websites, Google Business Profiles, organic search rankings — reflects an earlier era. For businesses willing to invest in systematic SEO now, dominant organic positions in the ${name} market are achievable faster and at lower cost than in Auckland or Wellington.

---

## The ${name} Search Landscape

### Why ${region} Businesses Are Underinvested in SEO

The SEO competition gap in ${name} is real. Across most service categories, the bar to rank on page one of Google is significantly lower than in Auckland. Local competitors typically have:

- Minimal technical SEO (slow page speeds, poor mobile experience, crawl errors)
- Thin or generic content with no topical depth
- Few inbound links from relevant local sources
- Outdated or unclaimed Google Business Profiles
- No local schema markup

This creates a genuine window. A ${name} business that invests in proper technical foundations, quality local content, and systematic authority building can establish dominant positions within 3–6 months for categories where an Auckland business might take 12–18 months.

### ${name}'s Key Industries and Their SEO Potential

${name}'s economy is built around ${industries}. Each of these sectors has addressable organic search demand:

- **${industries.split(',')[0].trim()}**: Consistent local search volume, clear purchase intent, and relatively low competition from established digital players.
- **Professional services**: Accounting, legal, financial planning — high-value searches with strong conversion intent.
- **Trades**: Builder, electrician, plumber searches in ${name} have high volume and strong local commercial intent.
- **Healthcare**: GPs, specialists, allied health, dentistry — growing demand with strong local search behaviour.
- **Tourism and hospitality**: ${notable} draw regional and national visitors who search online before they arrive.

### The Local SEO Advantage

For most ${name} businesses, local SEO — appearing in Google Maps and the local pack results — is the highest-priority objective. Local pack positions appear above organic results for location-intent searches and capture the majority of clicks.

Winning local pack positions in ${name} requires:

1. **Optimised Google Business Profile**: Complete, accurate, regularly updated, with genuine customer reviews.
2. **Local citations**: Consistent NAP (name, address, phone) across NZ business directories and ${region}-specific listings.
3. **Local content signals**: Website content that clearly signals ${name} and ${region} relevance — suburb pages, local case studies, locally-relevant blog content.
4. **Local schema markup**: Structured data that tells Google your business serves ${name} and the surrounding region.

---

## What Effective SEO Looks Like in ${name}

### Technical Foundation First

Before content, before links — the technical foundation. SEO cannot compound on a broken site. We audit and fix:

- **Crawl errors and indexing issues**: Pages Google can't access don't rank.
- **Page speed and Core Web Vitals**: Slow sites rank poorly and lose visitors before they convert.
- **Mobile responsiveness**: ${name} searchers are predominantly on mobile.
- **Structured data**: Schema markup that helps Google understand what your ${name} business does.
- **Internal linking**: Proper site architecture that distributes authority to priority pages.

Fix the foundation first. Build the rest on solid ground.

### Local SEO: ${name}-Specific Signals

Local SEO for ${name} involves more than claiming a Google Business Profile. It requires:

- **Consistent NAP citations** across NZ directories (Yellow Pages, Localist, NZ Business, Finda, and ${region}-specific directories)
- **Suburb-level content** for the ${name} areas your business serves
- **Local link building** from ${name} and ${region} relevant sites — ${region} Chamber of Commerce, local media, industry associations
- **Review strategy**: A systematic approach to generating genuine customer reviews in ${name}
- **Local schema**: Properly implemented LocalBusiness schema that signals your geographic service area

### Content Strategy Built Around ${name} Intent

Keyword research for ${name} SEO must reflect how local people actually search. Not generic NZ keyword lists, but ${region}-specific research:

- How do ${name} residents search for the services you offer?
- What questions are ${region} customers asking that you can answer?
- What local context (landmarks, suburbs, events) signals genuine ${name} relevance?
- What seasonal patterns affect ${name} search demand in your industry?

The content strategy flows from this research: topical authority clusters that own your niche in the ${name} market, not isolated pages targeting single keywords.

### Authority Building in the ${region} Ecosystem

Links from ${name} and ${region}-relevant sources carry real weight in local SEO. Relevant sources include:

- **Local media**: ${region}-specific news sites and publications
- **Industry associations**: ${region} business groups and trade associations
- **${region} Chamber of Commerce and similar organisations**
- **Local business directories with real editorial standards**
- **National NZ sources**: Stuff, NZ Herald, Scoop — broader authority that complements local relevance

---

## The Cost of Waiting

The SEO competition gap in ${name} won't stay open indefinitely. As the city grows and more businesses invest in digital, the window to establish dominant organic positions at low competitive cost closes.

Businesses that invest in ${name} SEO now will:
- Own positions that compound over time (rankings improve with age)
- Build a moat that's genuinely difficult for later entrants to displace
- Capture organic traffic in 2027 and 2028 from work done today
- Benefit from lower CPCs in paid search as organic reduces dependence on paid

The cost of waiting is the organic traffic, leads, and customers that go to a competitor who invested earlier.

---

## Working With a ${name} SEO Agency

Junction Media works with select ${name} and ${region} businesses on AI-native SEO campaigns: technical foundations, local SEO, content strategy, and authority building — all managed with the quality and consistency that produces compounding results.

We work remotely with ${name} clients — ${region} market knowledge is built into our keyword research and content strategy from day one. We're not a generalist agency applying a template; we understand the ${name} market and build strategies around it.

If you're a ${name} business serious about organic search as a real acquisition channel — [apply to work with us](/apply) or [read more about our SEO services](/services/seo-nz). See the [${name} SEO agency service page](/${citySlug}/seo-agency) for pricing and scope details.
`;
}

function googleAdsBlogPost(citySlug, city) {
  const { name, region, regionLong, desc, notable, industries, pop } = city;
  const today = '2026-02-20';
  return `---
title: "Google Ads Agency ${name} | PPC That Captures ${region} Intent"
slug: "google-ads-agency-${citySlug}"
date: "${today}"
excerpt: "Google Ads captures the highest-intent searches in ${name} — people actively looking for what your business offers. Here's how to run profitable PPC campaigns in the ${region} market."
keywords: ["google ads agency ${citySlug}", "google ads ${citySlug}", "ppc ${citySlug}", "${citySlug} google ads management", "${region.toLowerCase()} google ads", "paid search ${citySlug}", "ppc agency ${citySlug} nz"]
tags: ["google ads", "ppc", "${citySlug}", "new zealand", "${region.toLowerCase().replace(/[^a-z0-9]/g, '-')}"]
description: "A practical guide to Google Ads for ${name} and ${region} businesses. Understand how to structure campaigns, target the right ${name} searches, and get measurable ROI from PPC."
author: "Junction Media"
---

# Google Ads Agency ${name}: PPC That Captures ${region} Intent

When someone in ${name} searches Google for "builder ${name}," "accountant ${region}," or "plumber near me" — they're ready to act. They have a specific need, they're actively comparing options, and they'll make a decision within minutes or hours. That's high-intent search traffic, and Google Ads is how you capture it.

${name} is ${desc}. With key industries including ${industries}, the city has genuine commercial depth and consistent local search volume. Google Ads puts your business at the top of those searches — at the exact moment of highest buying intent.

---

## Why Google Ads Works in ${name}

### Intent is the Fundamental Advantage

The core reason Google Ads outperforms most other advertising channels for direct response is intent. On Facebook or Instagram, you're interrupting people who weren't thinking about you. On Google, you're appearing for people who are actively looking for what you offer.

For ${name} businesses, this means:

- **"Plumber ${name}"** → Someone with a broken pipe who needs a plumber today. Your ad appears. They call.
- **"Accountant ${region}"** → A ${region} business owner looking for accounting services. They click through to your landing page.
- **"${name} real estate agent"** → A vendor or buyer ready to make a move. Your agency appears above the organic results.

High intent means high conversion rates. The quality of the traffic is fundamentally different to broad-reach advertising.

### ${name}'s Cost-Per-Click Advantage

${name} and ${region} typically have lower cost-per-click (CPC) than Auckland for equivalent searches. The ${region} market is less competitive for paid search in most categories, meaning your ad spend goes further per click and per conversion.

A ${name} business can often achieve meaningful Google Ads results at ad spend levels that wouldn't be sufficient in Auckland. This makes the channel particularly accessible for smaller businesses in the ${region} market.

---

## How to Structure Google Ads for a ${name} Business

### Campaign Type Selection

Not all Google Ads campaign types suit every ${name} business. The right approach depends on your goals:

- **Search campaigns**: The core for most ${name} businesses. Target specific search queries. Highest intent. Best for direct leads and sales.
- **Performance Max**: Google's AI-driven campaign type that runs across search, display, YouTube, and Shopping. Works well for businesses with clear conversion tracking and sufficient budget.
- **Display campaigns**: Brand awareness and retargeting. Effective for reaching ${name} audiences who've visited your website but didn't convert.
- **Local campaigns**: Specifically designed to drive store visits and calls. Relevant for ${name} retail, hospitality, and service businesses with physical locations.

For most ${name} businesses, starting with well-structured search campaigns is the right foundation.

### Keyword Strategy for ${name}

Effective ${name} Google Ads keyword strategy requires understanding how local people actually search:

**Geographic modifiers**: "${name}", "${region}", "near me", suburb names (${city.suburbs || 'local suburbs'})
**Service + location combinations**: "[service] ${name}", "[service] ${region}", "[service] near me"
**Long-tail local searches**: More specific queries that indicate clear intent and typically have lower CPCs

**Negative keywords are equally important**: Building a comprehensive negative keyword list prevents your ${name} ads from appearing for irrelevant searches — competitor brand names, DIY searches, job searches, irrelevant geographic terms.

### Bidding and Budget

For ${name} businesses starting with Google Ads, we typically recommend:

- **Minimum monthly ad spend**: $1,500–$2,500/month to generate sufficient data for meaningful optimisation
- **Initial bidding strategy**: Manual CPC or Maximise Clicks for the first 4–6 weeks while building conversion data
- **Target CPA or Target ROAS** once sufficient conversion data exists (typically 30–50 conversions)
- **Dayparting**: Adjusting bids to favour ${name} business hours and suppress spend during hours when ${region} searchers are unlikely to convert

---

## Conversion Tracking: The Foundation of ROI Measurement

Without proper conversion tracking, Google Ads campaigns are flying blind. You see clicks and spend, but not what those clicks are producing for your ${name} business.

Proper conversion tracking for ${name} businesses includes:

- **Phone call tracking**: Tracking calls generated by Google Ads clicks — critical for ${name} trade and service businesses where calls are the primary conversion
- **Form submission tracking**: GA4 events fired when contact forms are submitted
- **E-commerce purchase tracking**: For ${name} online retailers, complete purchase data including revenue
- **Custom event tracking**: Whatever conversion matters for your specific ${name} business — appointment bookings, quote requests, live chat interactions

With proper tracking, you can see exactly which keywords, ads, and campaigns are driving revenue for your ${name} business — and optimise accordingly.

---

## Common Google Ads Mistakes for ${name} Businesses

**Insufficient geographic targeting**: Casting too wide a net (all of New Zealand) instead of focusing on ${name} and the ${region} region.

**Poor negative keyword management**: Wasting budget on irrelevant searches. A ${name} plumber doesn't want to pay for searches about plumbing supplies or "how to fix a tap yourself."

**Sending traffic to the homepage**: Instead of to a dedicated landing page optimised for conversion. Homepage traffic converts at a fraction of the rate of purpose-built landing pages.

**Setting and forgetting**: Google Ads requires active management — bid adjustments, creative testing, negative keyword additions, audience refinements. Campaigns that aren't actively managed decline over time.

**Inadequate budget**: Spreading a small budget across too many campaigns in ${name}. Better to dominate one campaign with sufficient budget than run ten campaigns that each starve for data.

---

## Working With a ${name} Google Ads Agency

Managing Google Ads effectively requires ongoing attention: daily bid monitoring, regular negative keyword reviews, creative testing, and conversion rate optimisation. For most ${name} business owners, this isn't where they should be spending their time.

Junction Media manages Google Ads for select ${name} and ${region} businesses — building campaigns from scratch or taking over existing accounts, with proper tracking, active management, and clear monthly reporting that shows exactly what your ad spend is producing.

[Apply to work with us](/apply), see the [${name} Google Ads agency page](/${citySlug}/google-ads-agency) for pricing, or [read about our Google Ads services](/services/google-ads-nz).
`;
}

function metaAdsBlogPost(citySlug, city) {
  const { name, region, regionLong, desc, notable, industries, metaNote, pop } = city;
  const today = '2026-02-20';
  return `---
title: "Meta Ads Agency ${name} | Facebook & Instagram Advertising for ${region} Businesses"
slug: "meta-ads-agency-${citySlug}"
date: "${today}"
excerpt: "Meta Ads (Facebook and Instagram) give ${name} businesses unmatched audience reach and targeting precision. From local ${region} residents to visitors and online customers, Meta's platform makes ${name} audience targeting highly effective."
keywords: ["meta ads agency ${citySlug}", "facebook ads ${citySlug}", "instagram ads ${citySlug}", "meta advertising ${citySlug}", "facebook advertising ${citySlug}", "social media advertising ${citySlug}", "meta ads ${region.toLowerCase().replace(/[^a-z0-9]/g, '-')}", "paid social ${citySlug}"]
tags: ["meta ads", "facebook ads", "${citySlug}", "new zealand", "${region.toLowerCase().replace(/[^a-z0-9]/g, '-')}"]
description: "A practical guide to Meta Ads (Facebook & Instagram) for ${name} and ${region} businesses. Understand how to target ${name} audiences effectively, which industries benefit most, and how to build profitable paid social campaigns."
author: "Junction Media"
---

# Meta Ads Agency ${name}: Facebook & Instagram Advertising for ${region} Businesses

For consumer-facing businesses in ${name}, Meta Ads — Facebook and Instagram advertising — remain the dominant paid social channel. New Zealand has strong Facebook and Instagram usage rates, and ${name} is no exception: ${metaNote} are all actively engaged on Meta's platforms.

What makes Meta Ads particularly compelling for ${name} is the precision of the targeting. Interest, behaviour, demographic, and geographic targeting lets you reach specific segments of the ${name} and ${region} population with messaging tailored to their situation. Combine that with retargeting of website visitors and lookalike audiences built from your existing customers, and you have a genuinely powerful acquisition channel.

---

## The ${name} Audience on Meta: Who You Can Reach

### Local ${region} Residents

The ${region} population represents the core Meta Ads audience for most ${name} businesses. Facebook and Instagram reach across age groups — from younger demographics on Instagram to established professionals and families on Facebook. The ability to layer geographic targeting (${name} city, specific suburbs) with interest and demographic targeting makes this a highly precise audience for local businesses.

### ${region} Visitors and Tourism

${name} attracts visitors who search for local experiences, accommodation, and hospitality before and during their trips. These audiences — people who've shown interest in ${region} travel, who are currently in ${name}, or who match the profile of typical visitors — are reachable through Meta's sophisticated targeting. Tourism-adjacent businesses can reach national and international audiences with awareness campaigns before visitors arrive.

### Industry-Specific Audiences

${name}'s key industries — ${industries} — each have distinct audience profiles on Meta:

- **Retail and hospitality**: Visual platforms like Instagram are ideal for product and experience marketing
- **Professional services**: LinkedIn captures the professional audience, but Meta reaches them in a consumer mindset, which can work for awareness and retargeting
- **Healthcare and wellness**: Strong targeting precision for health-conscious demographics
- **Tourism and experiences**: Exceptional for reaching visitors and building brand awareness nationally

---

## Meta Ads vs Google Ads: Complementary Channels

Understanding the fundamental difference between Meta and Google Ads sets appropriate expectations:

**Google Ads captures demand**: People who are actively searching for what you offer. High intent, ready to act. The limitation is that demand only exists when people are searching.

**Meta Ads creates demand**: People who aren't searching right now but can be reached based on their interests, demographics, and behaviour. Lower immediate intent, but a far larger addressable audience.

The most effective ${name} marketing strategies use both:
- **Google Ads**: Capture high-intent searches ("builder ${name}", "restaurant ${region}")
- **Meta Ads**: Build brand awareness, retarget website visitors, and nurture audiences who convert over time

For many ${name} businesses, starting with Google Ads for direct response and layering in Meta Ads for retargeting and brand building is the right sequencing.

---

## How to Build Effective Meta Campaigns for a ${name} Business

### Define Your ${name} Customer Precisely

Effective Meta Ads start with a clear picture of who you're targeting in ${name}: their age range, interests, behaviours, income bracket, life stage, and platforms they use. The more precisely you define this, the more efficiently Meta's algorithm finds and optimises toward that audience in the ${region} region.

For most ${name} businesses, this means combining:
- **Geographic targeting**: ${name} city, with radius extensions to surrounding ${region} areas
- **Demographic layers**: Age, gender, household income where relevant
- **Interest targeting**: Relevant to your product or service category
- **Behavioural targeting**: Purchase behaviour, device usage, engagement patterns

### Creative That Resonates With ${name} Audiences

Meta is a visual platform where creative quality determines performance. For ${name} businesses, creative that references local context — local landmarks like ${notable}, local community, and the distinctive ${region} environment — tends to outperform generic national creative.

Key creative principles for ${name} Meta Ads:
- **Stop the scroll**: Strong visual or video hook in the first 1–3 seconds
- **Local context**: Reference ${name} and ${region} where relevant — it builds recognition and trust
- **Clear offer and CTA**: What do you want them to do? Make it obvious.
- **Test systematically**: Run 2–3 creative variants and let data determine what works

### Retargeting: The Highest-Value ${name} Audience

Website visitors who haven't converted are your highest-value Meta Ads audience. They've already shown interest in your ${name} business — they just haven't acted yet. Retargeting campaigns that follow these visitors on Instagram and Facebook with relevant messaging convert at significantly higher rates than cold prospecting.

For any ${name} business with reasonable website traffic, retargeting should be the first Meta Ads campaign built. The Meta Pixel captures visitor data, custom audiences are created, and highly targeted ads follow those visitors until they convert.

### Lookalike Audiences: Scaling What Works

Once you have a customer base in ${name} and ${region}, Meta can build lookalike audiences — finding new people who resemble your existing customers in interests, behaviours, and demographics. Upload your customer list, define the lookalike percentage (1–3% for highest similarity, 5–10% for broader reach), and Meta's algorithm identifies the most similar audience in NZ.

This is one of Meta's most powerful features for scaling ${name} campaigns beyond your initial retargeting pool.

---

## Meta Ads for Specific ${name} Industries

**Retail**: Shopping-oriented formats — dynamic product ads, collection ads, and Instagram Shopping — make Meta ideal for ${name} retail. Local inventory ads can drive foot traffic to ${name} stores.

**Hospitality and food**: Visual content of food, atmosphere, and experience performs exceptionally on Instagram. ${name} hospitality businesses can drive local awareness and bookings.

**Health and wellness**: Gym memberships, physiotherapy, nutrition, wellness services — strong demographic and interest targeting for health-conscious ${name} audiences.

**Tourism and experiences**: ${name}'s connection to ${notable} creates compelling visual content for Meta campaigns targeting national and international visitors.

**Professional services**: B2C professional services (financial planning, legal) can use Meta for awareness and retargeting of high-value prospects in ${name}.

---

## Working With a Meta Ads Agency in ${name}

Managing Meta Ads effectively requires ongoing creative production, audience testing, and algorithm understanding. The platform changes frequently, creative fatigue sets in, and campaigns that worked 3 months ago may underperform today.

A good ${name} Meta Ads agency brings consistent creative iteration, ongoing audience testing, and clear performance reporting that connects spend to business outcomes — not just impressions and clicks.

Junction Media works with select ${name} businesses on AI-managed Meta Ads campaigns. [Apply to work with us](/apply), see the [${name} Meta Ads agency page](/${citySlug}/meta-ads-agency) for pricing and scope, or [read about our Meta Ads services](/services/meta-ads-nz).
`;
}

function socialMediaBlogPost(citySlug, city) {
  const { name, region, regionLong, desc, notable, industries, socialNote, pop } = city;
  const today = '2026-02-20';
  return `---
title: "Social Media Agency ${name} | Building Brand & Community in ${region}"
slug: "social-media-agency-${citySlug}"
date: "${today}"
excerpt: "Social media gives ${name} businesses direct access to ${socialNote}. Here's how to build a social media presence that actually drives brand growth and business results in the ${region} market."
keywords: ["social media agency ${citySlug}", "social media marketing ${citySlug}", "social media management ${citySlug}", "instagram marketing ${citySlug}", "facebook marketing ${citySlug}", "${citySlug} social media", "${region.toLowerCase().replace(/[^a-z0-9]/g, '-')} social media agency"]
tags: ["social media", "${citySlug}", "new zealand", "${region.toLowerCase().replace(/[^a-z0-9]/g, '-')}"]
description: "A practical guide to social media marketing for ${name} and ${region} businesses. Understand which platforms work, what content resonates, and how to build a social presence that compounds over time."
author: "Junction Media"
---

# Social Media Agency ${name}: Building Brand & Community in ${region}

${name} is ${desc}. The ${region} community — ${socialNote} — is active on social media, and businesses that show up consistently and authentically build real brand equity in this market.

Most ${name} businesses approach social media inconsistently: posting when someone remembers, sharing generic content, with no strategy behind what they're doing or why. The businesses that take a systematic approach — clear strategy, consistent quality, regular cadence — stand out clearly in the ${region} market. And because social media compounds (more followers means more reach means more followers), early investment pays dividends over time.

---

## The Social Media Landscape in ${name}

### Platform Overview for ${region} Businesses

**Facebook**: Broad demographic reach across ${name} and ${region}. Strong for community building, local business awareness, event promotion, and reaching older demographic segments. Essential for most ${name} consumer businesses.

**Instagram**: Higher engagement, visual-first platform. Works particularly well for ${name} businesses in hospitality, tourism, retail, health and wellness, and lifestyle categories. The ${region} environment — ${notable} — provides compelling visual content opportunities.

**LinkedIn**: B2B professional audience. Relevant for ${name} professional services, technology businesses, and employers. Less immediate ROI for consumer businesses, but valuable for B2B lead generation and thought leadership in ${region}.

**TikTok**: Fastest-growing platform, skews younger. Increasingly relevant for ${name} hospitality, tourism, retail, and lifestyle brands. Video-native format rewards creativity over production value. Growing organic reach opportunity for businesses early to the platform.

### What ${name} Audiences Respond To

Social media content that performs well for ${name} businesses typically has:

- **Local context**: References to ${name}, ${region}, and familiar local landmarks or experiences
- **Authenticity**: Behind-the-scenes content, team introductions, real customer stories
- **Value and utility**: Content that helps, entertains, or informs the ${region} audience
- **Visual quality**: ${name}'s distinctive environment and character provide naturally compelling visual material
- **Consistency**: Regular posting that builds familiarity and audience trust over time

---

## Building a Social Media Strategy for a ${name} Business

### Step 1: Define Your ${name} Audience

Who are you trying to reach in ${name}? Be specific:

- Age range and life stage
- Professional context or interests
- Geographic targeting (${name} city, specific suburbs, wider ${region})
- Relationship to your product or service category

The more precisely you can define your ${name} social media audience, the more targeted and effective your content strategy will be.

### Step 2: Choose the Right Platforms

Not every ${name} business needs to be on every platform. Spreading effort across too many channels produces mediocre results everywhere. Better to be exceptional on two platforms than average on five.

**For most ${name} consumer businesses**: Instagram + Facebook is the right starting point.
**For ${name} B2B businesses**: LinkedIn, with Facebook secondary.
**For ${name} hospitality, tourism, and lifestyle brands**: Instagram + TikTok.
**For ${name} retail**: Instagram + Facebook, with TikTok if resources allow.

### Step 3: Develop Content Pillars

Content pillars are the recurring themes around which your ${name} social media content is organised. They create consistency and make content planning manageable. Typical pillars for ${name} businesses:

- **Education**: Sharing expertise relevant to your ${region} audience
- **Behind the scenes**: Humanising your ${name} business
- **Customer stories**: Social proof from ${region} customers
- **Local community**: ${name} and ${region} community involvement and local context
- **Promotional**: Products, services, offers — kept to 20–30% of total content to avoid the "all ads" pattern that kills organic reach

### Step 4: Establish a Consistent Cadence

The biggest social media mistake ${name} businesses make is inconsistency. Post when someone remembers, go quiet for weeks, burst of activity, quiet again. Algorithms punish inconsistency with reduced organic reach.

Sustainable cadences for ${name} businesses:
- **Instagram**: 3–5 posts/week (feed + Stories)
- **Facebook**: 3–5 posts/week
- **LinkedIn**: 2–3 posts/week
- **TikTok**: 3–5 videos/week for growth

Consistency beats frequency. Three high-quality posts per week beats seven poor-quality posts.

---

## Social Media and Other Marketing Channels for ${name} Businesses

Social media works best as part of an integrated marketing system. For ${name} businesses, the highest-ROI integration is:

**SEO + Social**: Blog content and SEO-optimised pages can be repurposed and distributed via social, extending their reach. Social shares and engagement can contribute to content authority signals.

**Google Ads + Social**: Google Ads captures high-intent search traffic. Meta Ads (from the social side) retargets that traffic and builds brand awareness with audiences who aren't yet searching. Together, they cover the full funnel.

**Email + Social**: Social media grows an audience that can be converted to email subscribers — the owned channel that doesn't depend on algorithm changes. Email and social reinforce each other.

**Content marketing + Social**: Long-form content (blogs, guides) finds its distribution audience through social. Social engagement data informs what content to create more of.

---

## The Compounding Effect of Social Media for ${name} Businesses

Social media compounds in a way that most paid advertising doesn't. An Instagram post can drive engagement today, surface in explore feeds next month, and get reshared a year from now. Followers gained today see every subsequent post. Audience growth makes future reach more effective.

For ${name} businesses that invest consistently over 12–24 months, social media builds a genuine brand asset: an audience that follows you by choice, engages with your content, and thinks of your brand when they need what you offer in the ${region} market.

This is the opposite of paid advertising, which stops the moment you stop paying. Social media — done well — creates lasting brand equity.

---

## Working With a Social Media Agency in ${name}

Consistent, high-quality social media requires strategy, content creation, scheduling, community management, and ongoing analysis. For most ${name} business owners, this isn't where their time is best spent.

Junction Media works with select ${name} and ${region} businesses on AI-native social media management: strategy, content creation, scheduling, and reporting — all managed with the consistency that builds compound results over time.

[Apply to work with us](/apply), see the [${name} social media agency page](/${citySlug}/social-media-agency) for pricing and scope, or [read about our social media services](/services/social-media-nz).
`;
}

// ─── Helper functions ──────────────────────────────────────────────────────────

function toPascal(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function mkdirp(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeFile(filePath, content) {
  mkdirp(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ Written:', filePath.replace(BASE + path.sep, ''));
}

// ─── Generate Part A: 4 zero-combo cities × 4 services ────────────────────────

console.log('\n=== Part A: Full combo cities (lower-hutt, gisborne, invercargill, queenstown) ===\n');

for (const [citySlug, city] of Object.entries(CITIES)) {
  const appDir = path.join(BASE, 'src', 'app', citySlug);
  const blogDir = path.join(BASE, 'src', 'content', 'blog');

  // SEO page
  writeFile(path.join(appDir, 'seo-agency', 'page.tsx'), seoPage(citySlug, city));
  // Google Ads page
  writeFile(path.join(appDir, 'google-ads-agency', 'page.tsx'), googleAdsPage(citySlug, city));
  // Meta Ads page
  writeFile(path.join(appDir, 'meta-ads-agency', 'page.tsx'), metaAdsPage(citySlug, city));
  // Social Media page
  writeFile(path.join(appDir, 'social-media-agency', 'page.tsx'), socialMediaPage(citySlug, city));

  // Blog posts
  writeFile(path.join(blogDir, `seo-agency-${citySlug}.md`), seoBlogPost(citySlug, city));
  writeFile(path.join(blogDir, `google-ads-agency-${citySlug}.md`), googleAdsBlogPost(citySlug, city));
  writeFile(path.join(blogDir, `meta-ads-agency-${citySlug}.md`), metaAdsBlogPost(citySlug, city));
  writeFile(path.join(blogDir, `social-media-agency-${citySlug}.md`), socialMediaBlogPost(citySlug, city));
}

// ─── Generate Part B: 5 tier-2 cities × 2 missing services ───────────────────

console.log('\n=== Part B: Tier-2 cities (meta + social only) ===\n');

for (const [citySlug, city] of Object.entries(TIER2_CITIES)) {
  const appDir = path.join(BASE, 'src', 'app', citySlug);
  const blogDir = path.join(BASE, 'src', 'content', 'blog');

  // Add required fields for tier-2 cities that use seoOpportunity etc
  const fullCity = {
    ...city,
    seoOpportunity: `${city.name} has a growing digital economy and is underserved by professional marketing agencies`,
    suburbs: city.suburbs || `${city.name} central and surrounding suburbs`,
  };

  // Meta Ads page
  writeFile(path.join(appDir, 'meta-ads-agency', 'page.tsx'), metaAdsPage(citySlug, fullCity));
  // Social Media page
  writeFile(path.join(appDir, 'social-media-agency', 'page.tsx'), socialMediaPage(citySlug, fullCity));

  // Blog posts
  writeFile(path.join(blogDir, `meta-ads-agency-${citySlug}.md`), metaAdsBlogPost(citySlug, fullCity));
  writeFile(path.join(blogDir, `social-media-agency-${citySlug}.md`), socialMediaBlogPost(citySlug, fullCity));
}

console.log('\n✅ All pages and blog posts generated!');
console.log('\nNext: update sitemap.ts, then run npm run build.');
