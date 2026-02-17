# NANOConnect - Deployment Guide

## Prerequisites

- Tencent EdgeOne account
- Supabase account
- OpenAI API key
- Node.js v16+ installed

## 1. Supabase Setup

### Create Database Schema

```sql
-- Run all SQL from specdb.sql in Supabase SQL Editor
-- This creates all necessary tables:
-- - users
-- - influencers
-- - smes
-- - bookings
-- - messages
-- - reviews
-- - and more...
```

### Environment Variables

Create `.env` in project root:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_OPENAI_API_KEY=sk-xxxxx
VITE_EDGEONE_DOMAIN=nanoconnect.com
```

## 2. Tencent EdgeOne Deployment

### 2.1 Install EdgeOne CLI

```bash
npm install -g edge-cli
edge login
```

### 2.2 Configure EdgeOne

File: `edgeone.json` (already configured)

```json
{
  "name": "nanoconnect-app",
  "version": "1.0.0",
  "build": {
    "command": "npm install && npm run build",
    "output": "dist"
  },
  "function": {
    "directory": "functions",
    "runtime": "nodejs"
  },
  "caches": [
    {
      "source": "/images/*",
      "cacheTtl": 86400
    }
  ]
}
```

### 2.3 Deploy to EdgeOne

```bash
# Build locally first
npm run build

# Deploy to EdgeOne
edge deploy

# Or deploy with specific domain
edge deploy --domain nanoconnect.com
```

### 2.4 Edge Functions

Deploy `functions/` directory:

```bash
edge functions deploy
```

Edge functions will be deployed at:
- `https://nanoconnect.com/.edge/matching`
- `https://nanoconnect.com/.edge/cache`

## 3. Database Migration

### 3.1 Create Supabase Project

1. Go to https://app.supabase.com
2. Create new project
3. Note the project URL and anon key

### 3.2 Import Schema

```bash
# Copy specdb.sql content
# Go to Supabase Dashboard > SQL Editor
# Create new query and paste specdb.sql
# Run query
```

### 3.3 Setup Authentication

In Supabase Dashboard:
1. Go to Authentication > Providers
2. Enable: Email/Password, Google, GitHub
3. Configure OAuth app keys
4. Copy Auth URL to `.env`

## 4. API Integration

### 4.1 Supabase Client

Already configured in components via:
```javascript
import { createClient } from '@supabase/supabase-js'
```

### 4.2 OpenAI Integration

For AI recommendations:
```javascript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY
})
```

## 5. Production Build

### Build Output

```bash
npm run build
# Output: dist/
# - index.html (0.62 KB)
# - assets/index-*.css (14.33 KB)
# - assets/index-*.js (191.56 KB)
```

### Static File Caching

Images cached for 24 hours (86400s):
```json
{
  "source": "/images/*",
  "cacheTtl": 86400
}
```

## 6. Monitoring & Logs

### EdgeOne Console
- Monitor traffic and errors
- View function logs
- Check cache hit rates

### Supabase Console
- Database usage and errors
- Authentication events
- Real-time logs

## 7. Domain Configuration

### DNS Setup (if using custom domain)

1. In Tencent EdgeOne console
2. Add CNAME record for your domain
3. Point to EdgeOne nameservers
4. Wait for DNS propagation (24-48 hours)

### SSL Certificate

EdgeOne automatically provides SSL via Let's Encrypt

## 8. Performance Optimization

### Already Implemented
- ✅ Minified JavaScript (58.33 KB gzip)
- ✅ Optimized CSS (3.20 KB gzip)
- ✅ Edge caching for images
- ✅ Code splitting with Vite
- ✅ Tree-shaking of unused code

### Further Optimization
- Use CDN for image assets
- Enable HTTP/2 push
- Implement service workers
- Add database indexing

## 9. Security Checklist

- [ ] Enable HTTPS only
- [ ] Set CORS policy
- [ ] Configure rate limiting
- [ ] Setup firewall rules
- [ ] Enable DDoS protection
- [ ] Rotate API keys regularly
- [ ] Enable Supabase audit logs

## 10. Testing

### Local Testing
```bash
npm run dev
# Visit http://localhost:3000
```

### Build Testing
```bash
npm run build
npm run preview
# Test dist/ build locally
```

### Staging Deployment
```bash
edge deploy --staging
```

## 11. Deployment Checklist

- [ ] `.env` configured with real credentials
- [ ] Supabase schema imported
- [ ] EdgeOne project created
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Node Functions deployed
- [ ] Edge Functions deployed
- [ ] Authentication providers enabled
- [ ] Database backups configured
- [ ] Monitoring alerts setup
- [ ] Error tracking enabled (Sentry)
- [ ] Analytics enabled (Posthog)

## 12. Rollback Strategy

### Keep previous versions
```bash
edge deploy --tag v1.0.0
edge deploy --tag v1.0.1
```

### Rollback to previous
```bash
edge rollback --tag v1.0.0
```

## 13. Continuous Integration/Deployment

### GitHub Actions Example

```yaml
name: Deploy to EdgeOne

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: edge deploy --token ${{ secrets.EDGE_TOKEN }}
```

## Resources

- Tencent EdgeOne: https://cloud.tencent.com/product/ecdn
- Supabase Docs: https://supabase.com/docs
- EdgeOne CLI: https://github.com/tencent-cloud/edge-cli
- OpenAI API: https://platform.openai.com/docs

---
Last Updated: February 17, 2026
