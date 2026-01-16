# Astrology API Setup Guide

## Get Real Vedic Astrology Calculations

To get **accurate, real Vedic astrology data** instead of mock data, follow these steps:

## Option 1: Prokerala Astrology API (Recommended)

### Step 1: Sign Up
1. Go to https://api.prokerala.com/
2. Click **"Sign Up"** or **"Get API Key"**
3. Create a free account

### Step 2: Get Your Credentials
1. After signing in, go to **Dashboard** → **API Credentials**
2. Copy your:
   - **API Key** (looks like: `pk_live_xxxxxxxxxxxxx`)
   - **Client ID** (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Step 3: Add to Your Project
Open `.env.local` and add:

```env
NEXT_PUBLIC_PROKERALA_API_KEY=your_api_key_here
NEXT_PUBLIC_PROKERALA_CLIENT_ID=your_client_id_here
```

### Step 4: Restart Dev Server
```bash
# Stop current server (Ctrl+C)
# Then restart:
nvm exec 18 npm run dev
```

### Step 5: Test
Go to http://localhost:3000/dashboard/astrology and create a birth chart. You'll now see **real calculations**!

---

## Option 2: AstroAPI (Alternative)

### Sign Up
1. Go to https://www.astroapi.com/
2. Sign up for free tier
3. Get API key

### Add to .env.local
```env
NEXT_PUBLIC_ASTRO_API_KEY=your_api_key
```

---

## What You Get with Real API

✅ **Accurate Planetary Positions** - Precise degrees, signs, houses
✅ **Real Nakshatra Calculations** - Correct nakshatra, pada, and lords
✅ **Vimshottari Dasha** - Actual maha/antar/pratyantar dasha periods
✅ **Panchang Data** - Real tithi, nakshatra, yoga, karana for any date
✅ **Dosha Detection** - Accurate Mangal, Kalsarp, Pitra dosha analysis
✅ **Divisional Charts** - All D-charts (D1-D60) with real calculations
✅ **Muhurat Times** - Auspicious timings based on actual planetary positions

---

## Free Tier Limits

**Prokerala API Free Tier:**
- 100 requests/day
- All endpoints available
- Perfect for development and personal use

**Paid Plans** (if you need more):
- Basic: $29/month - 10,000 requests
- Pro: $99/month - 50,000 requests
- Enterprise: Custom pricing

---

## Troubleshooting

**Error: "Invalid API key"**
- Double-check your API key in `.env.local`
- Make sure there are no extra spaces
- Restart dev server after adding keys

**Error: "Rate limit exceeded"**
- Free tier has 100 requests/day limit
- Upgrade to paid plan or wait 24 hours

**Getting mock data instead of real data**
- Check browser console for errors
- Ensure API keys are in `.env.local`
- Restart dev server

---

## Current Status

Without API keys configured, the app uses **mock data** for demonstration purposes. The calculations shown are examples and not your actual birth chart.

**To get REAL astrology predictions, you MUST configure the API as described above.**
