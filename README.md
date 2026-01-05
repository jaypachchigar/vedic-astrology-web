# Vedic Astrology Web Platform

A comprehensive web platform combining Vedic astrology, numerology, and Vastu Shastra with AI-powered insights.

## Features

- **Vedic Astrology:** Complete birth chart generation, predictions, dashas, and transits
- **Numerology:** Life path, destiny, and personality number calculations with detailed insights
- **Vastu Shastra:** AI-powered compass integration for real-time directional recommendations
- **AI Assistant:** Intelligent chatbot providing personalized astrological guidance
- **Professional Design:** Minimal, modern interface optimized for conversions

## Tech Stack

### Frontend
- **Framework:** Next.js 14+ (React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **State Management:** Zustand + React Query
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts
- **Animations:** Framer Motion

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Next.js API Routes + tRPC
- **Database:** PostgreSQL (via Supabase or Neon)
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **File Storage:** AWS S3 or Cloudflare R2
- **Caching:** Redis (Upstash)

### AI & Calculations
- **LLM:** OpenAI GPT-4 or Anthropic Claude
- **Vector DB:** Pinecone (for RAG)
- **Ephemeris:** Swiss Ephemeris library
- **Compass API:** Web Geolocation + Magnetometer API

### DevOps
- **Hosting:** Vercel or AWS Amplify
- **Database:** Supabase or Neon (serverless PostgreSQL)
- **CDN:** Automatic via Vercel/CloudFront
- **Monitoring:** Sentry + Vercel Analytics
- **Payments:** Stripe

## Project Structure

```
vedic-astrology-web/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── astrology/         # Astrology-specific components
│   │   ├── numerology/        # Numerology components
│   │   ├── vastu/             # Vastu components
│   │   └── ai/                # AI chat components
│   ├── lib/
│   │   ├── astrology/         # Astrology calculation logic
│   │   ├── numerology/        # Numerology calculations
│   │   ├── vastu/             # Vastu logic
│   │   ├── ai/                # AI integration
│   │   ├── db/                # Database utilities
│   │   └── utils/             # Helper functions
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   └── styles/                # Global styles
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── docs/                      # Documentation
├── .env.example               # Environment variables template
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## Getting Started

### Prerequisites
- Node.js 20+ and npm/pnpm
- PostgreSQL database (or Supabase account)
- OpenAI API key
- Stripe account (for payments)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd vedic-astrology-web
```

2. Install dependencies
```bash
npm install
# or
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="sk-..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

4. Set up the database
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Development Roadmap

### Phase 1: MVP (Weeks 1-4)
- [ ] Landing page with hero, features, pricing
- [ ] User authentication (email/password, Google OAuth)
- [ ] Basic birth chart generation
- [ ] Simple numerology calculator
- [ ] Stripe subscription integration
- [ ] User dashboard

### Phase 2: Core Features (Weeks 5-8)
- [ ] Complete Vedic astrology module
- [ ] Advanced numerology features
- [ ] Vastu compass with basic recommendations
- [ ] AI chatbot integration
- [ ] Daily horoscopes

### Phase 3: Advanced Features (Weeks 9-12)
- [ ] Compatibility matching
- [ ] Muhurat (auspicious timing)
- [ ] Advanced Vastu with AR visualization
- [ ] Personalized remedies
- [ ] Analytics dashboard

### Phase 4: Launch & Scale (Weeks 13-16)
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Marketing website content
- [ ] Beta testing
- [ ] Public launch

## API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Astrology
- `POST /api/astrology/birth-chart` - Generate birth chart
- `GET /api/astrology/predictions` - Get predictions
- `POST /api/astrology/compatibility` - Compatibility analysis

### Numerology
- `POST /api/numerology/calculate` - Calculate all numbers
- `POST /api/numerology/name-analysis` - Analyze name

### Vastu
- `POST /api/vastu/analyze` - Analyze direction
- `GET /api/vastu/recommendations` - Get recommendations

### AI
- `POST /api/ai/chat` - Chat with AI assistant
- `GET /api/ai/daily-insights` - Get daily insights

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel
```

### Environment Variables
Set these in Vercel dashboard:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- All other API keys

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Proprietary - All rights reserved

## Support

For support, email support@vedicastrology.com or join our Discord community.
