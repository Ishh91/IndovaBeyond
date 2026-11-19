import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.disable('x-powered-by');
// Set TRUST_PROXY=1 when deployed behind a reverse proxy so rate limiting sees real client IPs
if (process.env.TRUST_PROXY) app.set('trust proxy', 1);

// CORS: same-origin and local dev origins are allowed; add production origins via CORS_ORIGINS (comma-separated)
const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean);
const localOrigin = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
app.use(cors({
  origin: (origin, cb) => cb(null, !origin || localOrigin.test(origin) || allowedOrigins.includes(origin)),
}));

// Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(express.json({ limit: '20kb' }));

// Rate limit for form submissions: RATE_LIMIT_MAX requests per IP per 15 minutes
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = Number(process.env.RATE_LIMIT_MAX) || 10;
const hits = new Map();
const submitLimiter = (req, res, next) => {
  const now = Date.now();
  const entry = hits.get(req.ip);
  if (!entry || now > entry.resetAt) {
    hits.set(req.ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return next();
  }
  if (entry.count >= RATE_MAX) {
    res.setHeader('Retry-After', Math.ceil((entry.resetAt - now) / 1000));
    return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
  }
  entry.count += 1;
  next();
};
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of hits) if (now > entry.resetAt) hits.delete(ip);
}, RATE_WINDOW_MS).unref();

// Submissions are persisted as JSON files in server/data so they survive restarts
const dataDir = path.resolve(__dirname, 'data');
fs.mkdirSync(dataDir, { recursive: true });
const loadStore = (name) => {
  try {
    const parsed = JSON.parse(fs.readFileSync(path.join(dataDir, `${name}.json`), 'utf8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
const saveStore = (name, items) => {
  const file = path.join(dataDir, `${name}.json`);
  fs.writeFileSync(`${file}.tmp`, JSON.stringify(items, null, 2));
  fs.renameSync(`${file}.tmp`, file);
};

const quotes = loadStore('quotes');
const contacts = loadStore('contacts');
const subscribers = loadStore('subscribers');

// Input helpers
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');
const validEmail = (value) => {
  const email = text(value, 254).toLowerCase();
  return EMAIL_RE.test(email) ? email : '';
};

// Service catalog
const services = [
  {
    id: 'ai-automation',
    title: 'AI Automation & Software Development',
    category: 'Core AI',
    shortDesc: 'Automate business workflows and engineer high-scale AI systems tailored to enterprise logic.',
    icon: 'Cpu',
    features: [
      'Custom LLM Fine-Tuning & RAG Pipelines',
      'Autonomous Workflow Automation Agents',
      'Microservices & Enterprise API Engineering',
      'Cloud Architecture & High-Concurrency Scaling'
    ]
  },
  {
    id: 'ai-videos',
    title: 'AI Videos & Ads Creation',
    category: 'Creative AI',
    shortDesc: 'Hyper-realistic video generation, viral ad hooks, and photorealistic virtual avatars that scale conversion.',
    icon: 'Video',
    features: [
      'Hyper-Realistic AI Avatars & Digital Humans',
      'High-Conversion Motion Ad Creatives',
      'Automated Multi-lingual Voiceover & Dubbing',
      'CGI & VFX Commercial Product Renders'
    ]
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    category: 'Engineering',
    shortDesc: 'Bespoke web platforms built with React, Next.js, and modern tech stacks for maximum speed and luxury aesthetics.',
    icon: 'Code',
    features: [
      'Ultra-Fast Next.js & React SPA Architectures',
      'Luxury Dark-Mode & 3D Interactive WebGL Experiences',
      'Full-Stack Node / Python Microservice Backends',
      'Conversion-Optimized Checkout & Lead Capture Funnels'
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Growth',
    shortDesc: 'Data-driven omnichannel campaigns, algorithmic paid acquisition, and viral brand positioning.',
    icon: 'TrendingUp',
    features: [
      'AI-Optimized Meta & Google Ads Scaling',
      'High-Intent SEO & Programmatic Content Engines',
      'Omnichannel Brand Identity & Positioning',
      'Full-Funnel Analytics & Conversion Rate Optimization (CRO)'
    ]
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions & Consulting',
    category: 'Strategy',
    shortDesc: 'End-to-end strategic guidance to integrate cutting-edge machine learning into legacy operations seamlessly.',
    icon: 'CloudLightning',
    features: [
      'Enterprise AI Readiness & Security Auditing',
      'Custom Predictive Modeling & Business Intelligence',
      'Data Lakehouse & Vector Database Integration',
      'Executive Roadmaps & Operational Transformation'
    ]
  },
  {
    id: 'business-growth',
    title: 'Business Growth Strategies',
    category: 'Advisory',
    shortDesc: 'Holistic growth frameworks aligning tech, brand equity, and execution to propel market dominance.',
    icon: 'Handshake',
    features: [
      'Go-To-Market (GTM) Strategy & Execution',
      'Enterprise Sales Pipeline & CRM Automation',
      'Product-Market Fit & Scalable Unit Economics',
      'Global Expansion & Partnership Ecosystems'
    ]
  }
];

// Stats
const stats = {
  projectsDelivered: '100+',
  happyClients: '500+',
  clientSatisfaction: '98%',
  support: '24/7 Support',
  headline: 'Your Trusted Partner in the AI-Powered Future'
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'INDOVA BEYOND',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/services', (req, res) => {
  res.json({ success: true, services });
});

app.get('/api/stats', (req, res) => {
  res.json({ success: true, stats });
});

app.post('/api/quote', submitLimiter, (req, res) => {
  const body = req.body || {};
  const name = text(body.name, 100);
  const email = validEmail(body.email);
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and a valid email are required.' });
  }

  const quoteRequest = {
    id: 'QUOTE-' + Date.now().toString(36).toUpperCase(),
    name,
    email,
    company: text(body.company, 150) || 'N/A',
    service: text(body.service, 150) || 'General Consultation',
    budget: text(body.budget, 50) || 'Undisclosed',
    message: text(body.message, 5000),
    createdAt: new Date().toISOString()
  };

  quotes.push(quoteRequest);
  saveStore('quotes', quotes);
  console.log('[INDOVA BEYOND API] New Quote Received:', quoteRequest);

  res.status(201).json({
    success: true,
    message: 'Your quote request has been transmitted successfully. Our executive solutions architect will contact you within 24 hours.',
    referenceId: quoteRequest.id
  });
});

app.post('/api/contact', submitLimiter, (req, res) => {
  const body = req.body || {};
  const name = text(body.name, 100);
  const email = validEmail(body.email);
  const message = text(body.message, 5000);
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, a valid email, and message are required.' });
  }

  const contactEntry = {
    id: 'MSG-' + Date.now().toString(36).toUpperCase(),
    name,
    email,
    subject: text(body.subject, 200) || 'General Inquiry',
    message,
    createdAt: new Date().toISOString()
  };

  contacts.push(contactEntry);
  saveStore('contacts', contacts);
  console.log('[INDOVA BEYOND API] New Contact Message:', contactEntry);

  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out. We have received your inquiry.',
    ticketId: contactEntry.id
  });
});

app.post('/api/newsletter', submitLimiter, (req, res) => {
  const email = validEmail((req.body || {}).email);
  if (!email) {
    return res.status(400).json({ success: false, message: 'A valid email is required.' });
  }

  if (subscribers.includes(email)) {
    return res.json({ success: true, message: 'You are already subscribed to INDOVA BEYOND briefings.' });
  }

  subscribers.push(email);
  saveStore('subscribers', subscribers);
  res.status(201).json({
    success: true,
    message: 'Welcome to the Vanguard. You are subscribed to INDOVA BEYOND executive updates.'
  });
});

// Unknown API routes return a JSON 404 instead of falling through to the SPA
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found.' });
});

// Serve production static assets if built
const clientDistPath = path.resolve(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Malformed JSON, oversized bodies and unexpected errors return JSON, never a stack trace
app.use((err, req, res, next) => {
  const status = err.status >= 400 && err.status < 500 ? err.status : 500;
  if (status === 500) console.error('[INDOVA BEYOND API] Unhandled error:', err);
  res.status(status).json({
    success: false,
    message: status === 500 ? 'Something went wrong. Please try again.' : 'Invalid request.'
  });
});

app.listen(PORT, () => {
  console.log(`[INDOVA BEYOND Server] Running on http://localhost:${PORT}`);
});
