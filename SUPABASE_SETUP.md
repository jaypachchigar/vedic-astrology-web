# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - **Name**: vedic-astrology-web
   - **Database Password**: (save this securely!)
   - **Region**: Choose closest to you
4. Click "Create new project" and wait 2-3 minutes

## Step 2: Get API Keys

1. In your project dashboard, click **Settings** (⚙️ icon)
2. Click **API** in the left sidebar
3. Copy:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 3: Update Environment Variables

Edit `.env.local` file and replace:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Create Database Tables

1. In Supabase dashboard, click **SQL Editor** (📝 icon)
2. Click **New Query**
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click **Run** or press `Ctrl/Cmd + Enter`
5. Wait for "Success. No rows returned"

## Step 5: Enable Email Auth

1. Go to **Authentication** → **Providers**
2. Make sure **Email** provider is enabled
3. (Optional) Configure email templates in **Authentication** → **Email Templates**

## Step 6: Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart with nvm to pick up new env vars:
nvm exec 18 npm run dev
```

## Step 7: Test Authentication

1. Go to http://localhost:3001/register
2. Create a new account
3. Check Supabase dashboard → **Authentication** → **Users** to see your new user
4. Check **Table Editor** → **profiles** to see the auto-created profile

## Database Schema

Your database now has:
- **profiles** - User profiles with birth details
- **birth_charts** - Saved birth charts
- **numerology_readings** - Saved numerology calculations
- **vastu_analyses** - Saved Vastu analyses
- **ai_chats** - Chat history with AI assistant

## Security

✅ Row Level Security (RLS) is enabled
✅ Users can only access their own data
✅ Environment variables are gitignored
✅ Auto-profile creation on signup

## Next Steps

Update your auth pages to use Supabase:
- `src/app/login/page.tsx` - Use `signIn()`
- `src/app/register/page.tsx` - Use `signUp()`
- `src/app/forgot-password/page.tsx` - Use `resetPassword()`

Helper functions available in:
- `src/lib/auth.ts` - Authentication functions
- `src/lib/supabase.ts` - Supabase client

## Useful Supabase Queries

```typescript
// Save birth chart
const { data, error } = await supabase
  .from('birth_charts')
  .insert({
    user_id: user.id,
    name: 'My Birth Chart',
    date_of_birth: '1990-01-15',
    time_of_birth: '14:30:00',
    place_of_birth: 'New York, USA',
    latitude: 40.7128,
    longitude: -74.0060,
    chart_data: chartResults
  });

// Get user's birth charts
const { data, error } = await supabase
  .from('birth_charts')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });

// Update profile
const { data, error } = await supabase
  .from('profiles')
  .update({
    full_name: 'John Doe',
    date_of_birth: '1990-01-15'
  })
  .eq('id', user.id);
```

## Troubleshooting

**Error: "Invalid API key"**
- Double-check your `.env.local` file
- Make sure you copied the **anon** key, not the **service_role** key
- Restart your dev server

**Error: "relation does not exist"**
- Make sure you ran the SQL schema
- Check SQL Editor for any errors

**Can't see new user in dashboard**
- Check **Authentication** → **Users** tab
- Email confirmation might be required (check email settings)

**RLS errors**
- Make sure user is authenticated
- Check that policies are created (SQL Editor → Policies)
