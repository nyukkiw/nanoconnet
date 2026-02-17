# NANOConnect README - Setup Instructions

## Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your credentials
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
NANOConnect/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── styles/           # Global styles
│   ├── App.jsx
│   └── main.jsx
├── functions/            # Node.js serverless functions
├── edge-functions/       # Edge computing functions
├── public/               # Static assets
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Features

- ✅ Homepage with hero section
- ✅ Influencer Listing & Details
- ✅ Booking System
- ✅ AI Recommendations
- ✅ User Authentication (SME/Influencer)
- ✅ Real-time Data Sync
- ✅ Terms & Conditions

## Tech Stack

- **Frontend**: React.js + Vite
- **Styling**: Tailwind CSS
- **Icons**: FontAwesome
- **Database**: Supabase
- **Deployment**: Tencent EdgeOne
- **Serverless**: Node Functions + Edge Functions

## Environment Variables

Required environment variables:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_OPENAI_API_KEY` - OpenAI API key for AI matching
