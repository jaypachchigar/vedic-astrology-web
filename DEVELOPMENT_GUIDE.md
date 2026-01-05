# Vedic Astrology Web - Development Guide

## Current Status

The frontend is **90% complete** with all major pages and UI components built. The application is ready for backend integration and database setup.

## What's Built

### ✅ Completed Features

**Landing Page**
- Professional hero section with gradient text
- Feature showcase (Astrology, Numerology, Vastu)
- Pricing table (Free, Premium, Annual tiers)
- AI assistant teaser section
- Responsive navigation and footer

**Authentication**
- `/login` - Login page with email/password and social login buttons
- `/register` - Registration page with form validation
- Beautiful, minimal design ready for NextAuth integration

**Dashboard (`/dashboard`)**
- Main dashboard with personalized insights
- Today's astrological insight card
- Current planetary transits display
- Quick action cards
- Responsive sidebar navigation
- Mobile bottom navigation

**Astrology (`/dashboard/astrology`)**
- Birth chart input form (date, time, place, lat/long)
- Chart visualization placeholder
- Planetary positions display
- Dasha periods (Maha, Antar, Pratyantar)
- Personalized predictions by category
- Gemstone and remedy recommendations

**Numerology (`/dashboard/numerology`)**
- Life path number calculator
- Destiny number calculator
- Soul urge and personality numbers
- Detailed number interpretations
- Lucky elements (numbers, colors, days)
- Compatibility analysis
- Personal year number

**Vastu (`/dashboard/vastu`)**
- Real-time compass with device orientation
- Manual direction selector for desktop
- Direction-based recommendations
- Element and planetary associations
- Color recommendations
- Items to place/avoid lists
- Vastu remedies
- Complete coverage of all 8 directions (N, NE, E, SE, S, SW, W, NW)

**AI Assistant (`/dashboard/ai`)**
- Interactive chat interface
- Simulated AI responses
- Suggested questions
- Context-aware answers
- Quick links sidebar
- Message history

**UI Components**
- Button (multiple variants)
- Input
- Card (with header, content, footer)
- Label
- All styled with Tailwind CSS

## What Needs to Be Done

### 1. Database Setup (High Priority)

**Install Prisma and Setup Database:**
```bash
# Create .env.local file
cp .env.example .env.local

# Add your database URL to .env.local
# For local development, you can use:
# DATABASE_URL="postgresql://user:password@localhost:5432/vedic_astrology"

# Or use Supabase/Neon for serverless PostgreSQL

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio to view database
npx prisma studio
```

### 2. Authentication Implementation (High Priority)

**Setup NextAuth.js:**

Create `/src/app/api/auth/[...nextauth]/route.ts`:
```typescript
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.passwordHash) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
```

**Update Login Page:** Replace the form submit handler to use NextAuth signIn.

**Update Register Page:** Create API route to hash password and create user.

### 3. Astrology Calculation Engine (Medium Priority)

**Option 1: Use Swiss Ephemeris (Recommended)**

Install Swiss Ephemeris for Node.js:
```bash
# Note: This requires C++ compilation, may be complex
npm install swisseph
```

Create `/src/lib/astrology/calculations.ts`:
```typescript
import swisseph from 'swisseph';

export interface BirthDetails {
  dateOfBirth: Date;
  timeOfBirth: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export function calculateBirthChart(details: BirthDetails) {
  // Initialize Swiss Ephemeris
  swisseph.swe_set_ephe_path('/path/to/ephemeris');

  // Convert date/time to Julian Day
  const jd = calculateJulianDay(details);

  // Calculate planetary positions
  const planets = calculatePlanetaryPositions(jd);

  // Calculate houses
  const houses = calculateHouses(jd, details.latitude, details.longitude);

  // Calculate aspects
  const aspects = calculateAspects(planets);

  return {
    planets,
    houses,
    aspects,
    ascendant: houses[0],
  };
}
```

**Option 2: Use External API**

Use an existing Vedic astrology API like:
- AstroAPI (astroapi.com)
- Vedic Astrology API
- Build your own Python service with pyswisseph

### 4. AI Integration (Medium Priority)

**Setup OpenAI Integration:**

Create `/src/app/api/ai/chat/route.ts`:
```typescript
import { OpenAI } from "openai";
import { prisma } from "@/lib/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message, userId } = await req.json();

  // Get user's birth chart for context
  const userProfile = await prisma.birthProfile.findFirst({
    where: { userId, isPrimary: true },
    include: { birthChart: true },
  });

  // Build context
  const systemPrompt = `You are an expert Vedic astrologer. The user's birth chart shows: ${JSON.stringify(userProfile?.birthChart?.chartData)}. Provide personalized, accurate astrological guidance.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
  });

  return Response.json({
    message: completion.choices[0].message.content,
  });
}
```

**Update AI Chat Page:** Replace simulated responses with actual API calls.

### 5. API Routes (All Features)

Create these API routes in `/src/app/api/`:

```
api/
├── auth/
│   └── [...nextauth]/route.ts (NextAuth)
├── astrology/
│   ├── birth-chart/route.ts
│   ├── predictions/route.ts
│   └── transits/route.ts
├── numerology/
│   └── calculate/route.ts
├── vastu/
│   ├── analyze/route.ts
│   └── properties/route.ts
├── ai/
│   └── chat/route.ts
└── subscription/
    └── stripe/route.ts
```

### 6. Stripe Payment Integration (Low Priority for MVP)

**Setup Stripe:**
```bash
npm install @stripe/stripe-js stripe
```

Create webhook handler and subscription management.

### 7. Remaining UI Features

**Add These Components:**
- Toast notifications (for errors/success)
- Loading skeletons
- Error boundaries
- Profile page (`/dashboard/profile`)
- Settings page
- Modal dialogs

### 8. Testing

**Run the Development Server:**
```bash
npm run dev
```

Visit http://localhost:3000

**Test Each Page:**
- [ ] Landing page loads correctly
- [ ] Login page UI works
- [ ] Register page UI works
- [ ] Dashboard loads
- [ ] Astrology form works
- [ ] Numerology calculator works
- [ ] Vastu compass shows directions
- [ ] AI chat accepts messages

### 9. Deployment Preparation

**Before deploying:**
1. Set environment variables in Vercel/hosting platform
2. Set up production database (Supabase/Neon)
3. Configure domain and SSL
4. Test all features in production

**Deploy to Vercel:**
```bash
npm install -g vercel
vercel login
vercel
```

## Development Workflow

### Daily Development
```bash
# Start dev server
npm run dev

# In another terminal, watch database
npx prisma studio

# Make changes, test, commit
git add .
git commit -m "Description of changes"
git push origin main
```

### Before Each Commit
- Test the feature you built
- Run type check: `npm run type-check`
- Run linter: `npm run lint`

## Priority Order

**Week 1-2: Backend Foundation**
1. Database setup with Prisma ✅
2. NextAuth authentication
3. Basic API routes for user management

**Week 3-4: Core Features**
1. Astrology calculation engine integration
2. Numerology calculations (easier, can do first)
3. Vastu recommendations (already mostly done in frontend)

**Week 5-6: AI & Polish**
1. OpenAI integration for AI assistant
2. Refine all features
3. Add error handling and loading states

**Week 7-8: Launch Prep**
1. Stripe payment integration
2. Email notifications
3. Testing and bug fixes
4. Deploy to production

## Helpful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema changes
npx prisma db pull       # Pull schema from database
npx prisma studio        # Open database GUI
npx prisma migrate dev   # Create migration

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript check

# Git
git status               # Check changes
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push origin main     # Push to GitHub
```

## Environment Variables Required

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# OpenAI
OPENAI_API_KEY="sk-..."

# Stripe (For payments)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY=""
NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY=""

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Resources

**Documentation:**
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- NextAuth: https://next-auth.js.org
- Tailwind CSS: https://tailwindcss.com/docs
- Shadcn/ui: https://ui.shadcn.com

**Vedic Astrology:**
- Swiss Ephemeris: https://www.astro.com/swisseph/
- Vedic Astrology Resources: https://www.vedicastrology.us
- Astrology API options

**AI Integration:**
- OpenAI API: https://platform.openai.com/docs
- Anthropic Claude: https://www.anthropic.com

## Common Issues & Solutions

**Issue: Compass not working**
- Solution: Requires HTTPS or localhost. Test on mobile device over HTTPS.

**Issue: Prisma client errors**
- Solution: Run `npx prisma generate` after schema changes

**Issue: Build errors**
- Solution: Run `npm run type-check` to find TypeScript errors

**Issue: Styling not applying**
- Solution: Make sure Tailwind config includes all component paths

## Next Steps

1. **Push to GitHub** - Create repository and push code
2. **Set up Database** - Use Supabase or Neon for easy PostgreSQL
3. **Implement Auth** - Get NextAuth working with login/register
4. **Choose Astrology API** - Research and integrate calculation engine
5. **Deploy MVP** - Get basic version live for testing

Good luck with development! The frontend is solid and ready for backend integration.
