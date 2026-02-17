# NANOConnect - Quick Start Guide

## Installation

```bash
# Navigate to project
cd NANOConnect

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your credentials
# Open .env and add:
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY
# - VITE_OPENAI_API_KEY
```

## Development Server

```bash
# Start development server
npm run dev

# Open in browser: http://localhost:3000
```

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to EdgeOne
edge deploy
```

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx
│   └── Footer.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   ├── InfluencerListingPage.jsx
│   ├── InfluencerDetailPage.jsx
│   ├── BookingPage.jsx
│   ├── AIRecommendationsPage.jsx
│   ├── TermsPage.jsx
│   ├── LoginPage.jsx
│   └── RegisterPage.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Available Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Hero section dan feature overview |
| `/about` | AboutPage | About platform dan cara kerja |
| `/influencers` | InfluencerListingPage | Daftar influencer dengan filter |
| `/influencers/:id` | InfluencerDetailPage | Detail profile influencer |
| `/booking` | BookingPage | Form booking collaboration |
| `/recommendations` | AIRecommendationsPage | AI matching results |
| `/terms` | TermsPage | Terms & Conditions |
| `/login` | LoginPage | User login |
| `/register` | RegisterPage | User registration |

## Key Features

- 🎨 **Tailwind CSS** - Flat design dengan palette hitam
- 🔍 **Responsive Layout** - Mobile, tablet, desktop
- 🚀 **Fast Performance** - Vite build, edge caching
- 🔐 **Authentication** - Supabase auth ready
- 💾 **Database** - Supabase integration
- 🤖 **AI Matching** - Smart algorithm
- 📱 **Mobile Friendly** - Fully responsive

## Customization

### Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  colors: {
    // Change color palette
  }
}
```

### Typography
Edit `src/index.css`:
```css
/* Global font settings */
body {
  font-family: 'Inter', system-ui, sans-serif;
}
```

### Navigation Items
Edit `src/components/Navigation.jsx`:
```jsx
<Link to="/your-route">Your Link</Link>
```

## Troubleshooting

### Port 3000 already in use
```bash
# Use different port
npm run dev -- --port 3001
```

### Module not found error
```bash
# Clear node_modules
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Clear dist folder
rm -rf dist
npm run build
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# OpenAI (for AI recommendations)
VITE_OPENAI_API_KEY=sk-your-key

# EdgeOne
VITE_EDGEONE_DOMAIN=nanoconnect.yourdomain.com
```

## Commands Reference

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting (if configured)
npm run lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Metrics

- Build size: 191.56 KB (58.33 KB gzip)
- CSS size: 14.33 KB (3.20 KB gzip)
- HTML size: 0.62 KB (0.40 KB gzip)

## Next Steps

1. Configure Supabase
2. Import database schema
3. Setup authentication
4. Test locally with `npm run dev`
5. Deploy to EdgeOne

## Support

For help check:
- `SETUP.md` - Setup instructions
- `DEPLOYMENT.md` - Deployment guide
- `EXECUTION_SUMMARY.md` - Project overview

---
Version: 1.0.0 | Last Updated: February 17, 2026
