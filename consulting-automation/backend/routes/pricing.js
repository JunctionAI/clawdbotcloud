const express = require('express');
const router = express.Router();

// Pricing models for each service
const SERVICE_PRICING = {
  'clawdbot-setup': {
    name: 'Clawdbot Setup',
    base_price: 1500,
    hourly_rate: 150,
    components: {
      'basic-setup': { hours: 4, price: 1000, description: 'Basic Clawdbot installation, 1 channel, basic skills' },
      'standard-setup': { hours: 8, price: 2000, description: 'Full setup, 2-3 channels, custom skills, email integration' },
      'enterprise-setup': { hours: 16, price: 4000, description: 'Complete automation, multi-channel, custom workflows, CRM integration' },
      'channel-integration': { hours: 2, price: 300, description: 'Per additional channel (Discord, Telegram, WhatsApp, etc.)' },
      'skill-development': { hours: 3, price: 450, description: 'Per custom skill' },
      'api-integration': { hours: 4, price: 600, description: 'Per external API (email, calendar, CRM, etc.)' },
      'training-session': { hours: 2, price: 300, description: '1-on-1 training session' },
      'ongoing-support': { hours: 4, price: 600, description: 'Monthly support & maintenance' }
    }
  },
  
  'marketing-consulting': {
    name: 'Marketing Consulting',
    base_price: 2500,
    hourly_rate: 200,
    components: {
      'strategy-audit': { hours: 8, price: 2000, description: 'Comprehensive marketing audit & strategy' },
      'email-marketing-setup': { hours: 12, price: 3000, description: 'Email marketing strategy, Klaviyo/Mailchimp setup, sequences' },
      'funnel-optimization': { hours: 10, price: 2500, description: 'Sales funnel analysis & optimization' },
      'content-strategy': { hours: 8, price: 2000, description: 'Content calendar, SEO strategy, content production plan' },
      'ad-campaign-setup': { hours: 12, price: 3000, description: 'Meta/Google ads strategy, campaign setup, tracking' },
      'analytics-dashboard': { hours: 6, price: 1500, description: 'Custom analytics dashboard & reporting' },
      'retainer-basic': { hours: 10, price: 2000, description: 'Monthly retainer (10h/month)' },
      'retainer-standard': { hours: 20, price: 3500, description: 'Monthly retainer (20h/month)' },
      'retainer-premium': { hours: 40, price: 6000, description: 'Monthly retainer (40h/month)' }
    }
  },
  
  'ai-automation': {
    name: 'AI Automation',
    base_price: 5000,
    hourly_rate: 250,
    components: {
      'process-audit': { hours: 8, price: 2500, description: 'Business process audit & automation roadmap' },
      'workflow-automation': { hours: 16, price: 5000, description: 'Custom workflow automation (per workflow)' },
      'ai-chatbot': { hours: 20, price: 6000, description: 'Custom AI chatbot for customer support' },
      'data-extraction': { hours: 12, price: 4000, description: 'Automated data extraction & processing' },
      'api-development': { hours: 24, price: 7500, description: 'Custom API development & integration' },
      'ai-agent-system': { hours: 40, price: 12000, description: 'Complete AI agent system (Clawdbot-level)' },
      'training-deployment': { hours: 8, price: 2500, description: 'Team training & deployment support' },
      'ongoing-optimization': { hours: 8, price: 2000, description: 'Monthly optimization & maintenance' }
    }
  }
};

// Value multipliers based on client factors
const VALUE_MULTIPLIERS = {
  company_size: {
    'solo': 1.0,
    'small': 1.2,      // 2-10 employees
    'medium': 1.5,     // 11-50 employees
    'large': 2.0,      // 51-200 employees
    'enterprise': 3.0  // 200+ employees
  },
  
  industry: {
    'startup': 1.0,
    'smb': 1.2,
    'ecommerce': 1.5,
    'saas': 1.8,
    'finance': 2.0,
    'enterprise': 2.5
  },
  
  urgency: {
    'exploring': 1.0,
    'this-quarter': 1.2,
    'this-month': 1.5,
    'urgent': 2.0
  },
  
  complexity: {
    'simple': 1.0,
    'moderate': 1.3,
    'complex': 1.7,
    'very-complex': 2.5
  }
};

// POST /api/pricing/calculate - Calculate project pricing
router.post('/calculate', (req, res) => {
  const { 
    service_type, 
    components = [], 
    company_size = 'small',
    industry = 'smb',
    urgency = 'exploring',
    complexity = 'moderate',
    custom_hours = null,
    pricing_model = 'fixed' // 'fixed', 'hourly', 'value-based'
  } = req.body;
  
  // Validate service type
  if (!SERVICE_PRICING[service_type]) {
    return res.status(400).json({ 
      error: 'Invalid service type', 
      valid_types: Object.keys(SERVICE_PRICING) 
    });
  }
  
  const service = SERVICE_PRICING[service_type];
  
  // Calculate base price from components
  let total_hours = 0;
  let base_total = 0;
  const selected_components = [];
  
  components.forEach(comp => {
    if (service.components[comp]) {
      const component = service.components[comp];
      total_hours += component.hours;
      base_total += component.price;
      selected_components.push({
        id: comp,
        name: component.description,
        hours: component.hours,
        price: component.price
      });
    }
  });
  
  // If custom hours provided, use that
  if (custom_hours) {
    total_hours = custom_hours;
    base_total = total_hours * service.hourly_rate;
  }
  
  // Apply value-based multipliers
  let value_multiplier = 1.0;
  if (pricing_model === 'value-based') {
    value_multiplier = 
      (VALUE_MULTIPLIERS.company_size[company_size] || 1.0) *
      (VALUE_MULTIPLIERS.industry[industry] || 1.0) *
      (VALUE_MULTIPLIERS.urgency[urgency] || 1.0) *
      (VALUE_MULTIPLIERS.complexity[complexity] || 1.0);
  }
  
  const value_adjusted_price = base_total * value_multiplier;
  
  // Round to nearest $100
  const final_price = Math.round(value_adjusted_price / 100) * 100;
  
  // Calculate price range (for proposal flexibility)
  const min_price = Math.round(final_price * 0.85 / 100) * 100;
  const max_price = Math.round(final_price * 1.15 / 100) * 100;
  
  res.json({
    service_type,
    service_name: service.name,
    pricing_model,
    components: selected_components,
    calculations: {
      total_hours,
      hourly_rate: service.hourly_rate,
      base_total,
      value_multiplier: pricing_model === 'value-based' ? value_multiplier : null,
      value_adjusted_price,
      final_price,
      price_range: {
        min: min_price,
        recommended: final_price,
        max: max_price
      }
    },
    breakdown: {
      company_size,
      industry,
      urgency,
      complexity
    }
  });
});

// GET /api/pricing/services - Get all services and components
router.get('/services', (req, res) => {
  res.json({ services: SERVICE_PRICING });
});

// GET /api/pricing/services/:service_type - Get specific service pricing
router.get('/services/:service_type', (req, res) => {
  const service = SERVICE_PRICING[req.params.service_type];
  
  if (!service) {
    return res.status(404).json({ 
      error: 'Service not found',
      valid_types: Object.keys(SERVICE_PRICING)
    });
  }
  
  res.json({ service_type: req.params.service_type, ...service });
});

// POST /api/pricing/estimate - Quick estimate (for lead forms)
router.post('/estimate', (req, res) => {
  const { service_type, budget_range } = req.body;
  
  if (!service_type || !SERVICE_PRICING[service_type]) {
    return res.status(400).json({ error: 'Valid service_type required' });
  }
  
  const service = SERVICE_PRICING[service_type];
  
  // Suggest components based on budget range
  let suggested_components = [];
  let estimated_price = 0;
  
  switch (budget_range) {
    case '1k-5k':
      // Suggest basic/entry components
      if (service_type === 'clawdbot-setup') {
        suggested_components = ['basic-setup', 'channel-integration'];
        estimated_price = 1500;
      } else if (service_type === 'marketing-consulting') {
        suggested_components = ['strategy-audit'];
        estimated_price = 2000;
      } else {
        suggested_components = ['process-audit'];
        estimated_price = 2500;
      }
      break;
      
    case '5k-10k':
      // Suggest standard components
      if (service_type === 'clawdbot-setup') {
        suggested_components = ['standard-setup', 'api-integration', 'training-session'];
        estimated_price = 3000;
      } else if (service_type === 'marketing-consulting') {
        suggested_components = ['strategy-audit', 'email-marketing-setup', 'analytics-dashboard'];
        estimated_price = 6500;
      } else {
        suggested_components = ['process-audit', 'workflow-automation'];
        estimated_price = 7500;
      }
      break;
      
    case '10k+':
      // Suggest premium/enterprise components
      if (service_type === 'clawdbot-setup') {
        suggested_components = ['enterprise-setup', 'api-integration', 'skill-development', 'ongoing-support'];
        estimated_price = 5500;
      } else if (service_type === 'marketing-consulting') {
        suggested_components = ['strategy-audit', 'email-marketing-setup', 'ad-campaign-setup', 'retainer-basic'];
        estimated_price = 10000;
      } else {
        suggested_components = ['ai-agent-system', 'training-deployment', 'ongoing-optimization'];
        estimated_price = 16500;
      }
      break;
      
    default:
      estimated_price = service.base_price;
  }
  
  res.json({
    service_type,
    service_name: service.name,
    budget_range,
    estimated_price,
    suggested_components: suggested_components.map(comp => ({
      id: comp,
      ...service.components[comp]
    })),
    next_steps: 'Book a free consultation to get a detailed proposal'
  });
});

module.exports = router;
