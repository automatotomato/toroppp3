# Netlify Setup Instructions

## Step 1: Set Environment Variables

**CRITICAL:** Your site will be blank without these variables!

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your site: `toroppp3`
3. Go to **Site settings** > **Environment variables**
4. Click **Add a variable** and add these TWO variables:

### Variable 1:
- **Key:** `VITE_SUPABASE_URL`
- **Value:** `https://mblzyrzsgzccjkwmundc.supabase.co`

### Variable 2:
- **Key:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ibHp5cnpzZ3pjY2prd211bmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNTgzMDQsImV4cCI6MjA3NzkzNDMwNH0.D1J-qJz84p5R-faFGwKrWiG1UlInVD-Q6zBRSaXYw0s`

5. Click **Save**

## Step 2: Trigger a Redeploy

After adding environment variables:

1. Go to **Deploys** tab
2. Click **Trigger deploy** > **Deploy site**
3. Wait for the build to complete (usually 1-2 minutes)

## Step 3: Verify Build Settings

Make sure these settings are correct in **Site settings** > **Build & deploy** > **Build settings**:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

These should be automatically detected from `netlify.toml`.

## Troubleshooting

### Site is still blank?

1. **Check the browser console** (F12 > Console tab)
   - Look for errors related to Supabase or missing variables

2. **Verify environment variables are set correctly**
   - Go back to Site settings > Environment variables
   - Make sure both variables are listed
   - Check for typos in the variable names (they're case-sensitive!)

3. **Check the deploy log**
   - Go to Deploys tab
   - Click on the latest deploy
   - Check for any build errors

4. **Clear cache and redeploy**
   - Go to Deploys tab
   - Click Trigger deploy > Clear cache and deploy site

### Common Issues

- **Blank page** = Missing environment variables
- **Build fails** = Check deploy logs for errors
- **404 on routes** = The `_redirects` file should handle this automatically

## Testing Locally

To test the production build locally:

```bash
npm run build
npm run preview
```

This will build and serve the production version locally.
