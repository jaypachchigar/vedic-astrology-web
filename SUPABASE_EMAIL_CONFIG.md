# Supabase Email Configuration

## Allow Users to Access Site Without Email Confirmation

To let users register and use your site immediately (without waiting for email confirmation), follow these steps:

### Step 1: Disable Email Confirmation Requirement

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `nemfygaelcxunkctwhql`
3. Go to **Authentication** → **Providers**
4. Scroll down to **Email**
5. **UNCHECK** the box that says **"Confirm email"**
6. Click **Save**

### Step 2: What This Does

✅ **Users can sign up and use the site immediately**
✅ **No need to wait for email confirmation**
✅ **Email verification banner will still remind them (for 7 days)**
✅ **Users can verify email later at their convenience**

### Step 3: Optional - Keep Email Verification Active (Recommended)

If you want email verification but not as a blocker:

1. Keep **"Confirm email"** ENABLED
2. Go to **Authentication** → **Email Templates**
3. Customize the confirmation email template
4. Users will receive the email but can still use the site
5. The banner will remind them to verify

### Current Behavior

**With Email Confirmation ON:**
- User registers → Email sent → **User must click link before using site** ❌

**With Email Confirmation OFF (Recommended):**
- User registers → Email sent → **User can use site immediately** ✅
- Email verification banner shows for 7 days
- User can verify anytime

### Security Note

Disabling email confirmation is safe for most apps because:
- You still collect real email addresses
- Banner reminds users to verify
- You can enable it later if needed
- Row Level Security (RLS) still protects data

### Need Help?

If you want to keep email confirmation but allow site access, you'll need to:
1. Modify RLS policies to allow unconfirmed users
2. Add email verification status checks in your app
3. Restrict certain features for unverified users

For now, the simplest solution is to **disable email confirmation** as shown above.
