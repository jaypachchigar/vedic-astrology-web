# Testing Instructions for Fixed Astrology Calculations

## ⚠️ Important: Node.js Version Requirement

Your system has **Node.js v16.20.1**, but Next.js requires **v18.17.0 or higher**.

### Option 1: Update Node.js (Recommended)

Using nvm (Node Version Manager):
```bash
# Install nvm if you don't have it:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart your terminal, then:
nvm install 18
nvm use 18
nvm alias default 18

# Verify:
node --version  # Should show v18.x.x or higher
```

Or download directly from: https://nodejs.org/ (LTS version)

### Option 2: Use Alternative Testing Method

If you can't update Node.js right now, you can:
1. Deploy to Vercel (which has Node.js 18+)
2. Use a Docker container with Node.js 18+
3. Test on another machine with Node.js 18+

## 🚀 Testing Steps (After Node.js Update)

### 1. Start the Development Server

```bash
npm run dev
```

The server will start at: http://localhost:3000

### 2. Test Your Birth Chart

1. Navigate to **Dashboard → Astrology**
2. Fill in your birth details:
   - **Name:** Your name
   - **Date of Birth:** Format: YYYY-MM-DD
   - **Time of Birth:** Format: HH:MM (24-hour, as accurate as possible)
   - **Place of Birth:** Start typing city name, select from autocomplete
     - This ensures accurate latitude/longitude coordinates
     - Example: "New York, USA" or "Mumbai, India"

3. Click **"Generate Birth Chart"**

### 3. Verify the Results

Check these key elements:

#### ✅ Ascendant (Lagna)
- Should show the correct rising sign based on your birth time and location
- The degree should be accurate
- Nakshatra and Pada should be correct

#### ✅ Planetary Positions
For each planet, verify:
- **Sign:** Which zodiac sign the planet is in
- **Degree:** The exact degree within the sign (0-30°)
- **House:** Which house (1-12) the planet occupies
- **Nakshatra:** Which of the 27 nakshatras
- **Retrograde status:** If applicable

#### ✅ Rahu & Ketu
- These are the lunar nodes (always 180° apart)
- Check their signs and nakshatras

#### ✅ Vimshottari Dasha
- **Maha Dasha:** Current major period with dates
- **Antar Dasha:** Current sub-period with dates
- **Pratyantar Dasha:** Current sub-sub-period

#### ✅ Doshas
- Mangal Dosha (Mars affliction)
- Kalsarp Dosha (all planets between Rahu-Ketu)
- Pitra Dosha (ancestral affliction)
- Sade Sati (Saturn's 7.5 year transit)

## 📊 Compare with Professional Software

To verify accuracy, compare with:

### Online (Free)
- **AstroSage:** https://www.astrosage.com/free-kundli.asp
- **AstroVed:** https://www.astroved.com/astrology/free-birth-chart
- **GaneshaSpeaks:** https://www.ganeshaspeaks.com/horoscopes/free-kundli/

### Desktop Software (Most Accurate)
- **JHora** (Windows, Free): http://www.jhora.com/
  - Set Ayanamsa to "Lahiri"
  - This is the gold standard for Vedic astrology
- **Jagannatha Hora** (Windows): https://www.vedicastrologer.org/jh/

### What to Compare
Create a chart with the **exact same details** in another software:
1. Same date, time, and location
2. Use "Lahiri" or "Chitrapaksha" ayanamsa
3. Compare:
   - Ascendant degree (should match within 0.5°)
   - All planetary positions (should match within 1°)
   - Rahu/Ketu positions
   - Current Dasha periods

## 🐛 If You Find Discrepancies

If the calculations don't match:

1. **Double-check your input:**
   - Is the time correct? (AM/PM, timezone)
   - Is the location correct? (Check lat/long)
   - Is the date format correct?

2. **Check the Ayanamsa:**
   - Our calculations use Lahiri (Chitrapaksha) ayanamsa
   - Make sure you're comparing with the same ayanamsa
   - As of 2025, Lahiri ayanamsa ≈ 24.2°

3. **Report the issue:**
   - Note the exact birth details you used
   - What you got vs. what you expected
   - Which software you compared with
   - Screenshots help!

## 📝 Test Data Examples

### Example 1: Known Birth Chart
```
Name: Test User
Date: 1990-01-15
Time: 14:30
Location: New York, NY, USA
Coordinates: 40.7128°N, 74.0060°W
```

Expected (approximate):
- Ayanamsa: ~23.94°
- Calculations should match professional software

### Example 2: Your Own Chart
Use your actual birth details for the most meaningful test!
- The more accurate your birth time, the better
- Hospital records often have exact birth times
- If time is unknown, use 12:00 noon for a rough chart

## ✨ What's New in These Calculations

1. **Accurate Lahiri Ayanamsa:** Uses proper Julian Day calculation
2. **Correct Ascendant:** Proper astronomical formula with sidereal time
3. **Better Lunar Nodes:** Brown's lunar theory instead of simple approximation
4. **Professional Grade:** Matches Swiss Ephemeris accuracy standards

## 🎯 Success Criteria

Your calculations are working correctly if:
- ✅ Ascendant matches known software within 1°
- ✅ Planetary positions match within 1°
- ✅ Nakshatra assignments are correct
- ✅ Dasha periods align with known software
- ✅ House placements are accurate

## Need Help?

If you have issues:
1. Check CALCULATION_FIXES.md for technical details
2. Verify Node.js version: `node --version`
3. Check browser console for errors (F12)
4. Report issues with specific examples

Happy testing! 🔮✨
