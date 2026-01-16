# Supabase Authentication Setup Guide

## Step 1: Get Your Supabase Keys

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project: `nemfygaelcxunkctwhql`
3. Go to **Settings** → **API**
4. Copy the **anon/public** key
5. Update `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-key-here
   ```

## Step 2: Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Make sure **Email** provider is enabled
3. Configure email settings:
   - **Enable email confirmations** (optional - you can disable for testing)
   - If disabled, users can login immediately after signup

## Step 3: Enable Google OAuth (Optional)

1. Go to **Authentication** → **Providers**
2. Click on **Google**
3. Enable the provider
4. You need to create a Google OAuth app:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
   - Add authorized redirect URI: `https://nemfygaelcxunkctwhql.supabase.co/auth/v1/callback`
   - Copy **Client ID** and **Client Secret**
5. Add the credentials to Supabase Google provider
6. Add these redirect URLs in Google Cloud Console:
   - `http://localhost:3001/auth/callback` (for local dev)
   - Your production domain/auth/callback (when deployed)

## Step 4: Enable GitHub OAuth (Optional)

1. Go to **Authentication** → **Providers**
2. Click on **GitHub**
3. Enable the provider
4. Create a GitHub OAuth app:
   - Go to GitHub → **Settings** → **Developer settings** → **OAuth Apps**
   - Click **New OAuth App**
   - Application name: `Vedic Astrology Web`
   - Homepage URL: `http://localhost:3001` (or your production URL)
   - Authorization callback URL: `https://nemfygaelcxunkctwhql.supabase.co/auth/v1/callback`
   - Copy **Client ID** and **Client Secret**
5. Add the credentials to Supabase GitHub provider

## Step 5: Configure Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Add these Site URLs:
   - `http://localhost:3001` (for development)
   - Your production domain (when deployed)
3. Add these Redirect URLs:
   - `http://localhost:3001/auth/callback`
   - `http://localhost:3001/**` (wildcard for all localhost paths)
   - Your production URLs

## Step 6: Test Authentication

1. Restart your dev server: `npm run dev`
2. Try registering with email/password first
3. Check Supabase dashboard **Authentication** → **Users** to see if user was created
4. Try logging in
5. Once email works, test OAuth providers if you enabled them

## Troubleshooting

- **"Invalid anon key"**: Make sure you copied the correct key from Supabase
- **"Provider not enabled"**: OAuth provider needs to be enabled in Supabase dashboard
- **"Redirect URL mismatch"**: Make sure callback URLs are configured correctly
- **Email not arriving**: Check spam folder or disable email confirmation for testing
