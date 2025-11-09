# Toro Tax Advancement Academy

A comprehensive learning platform for Toro Tax franchise owners.

## Deployment on Netlify

This project is configured for seamless deployment on Netlify.

### Automatic Deployment

The project includes:
- `netlify.toml` - Configuration file for build settings
- `public/_redirects` - SPA routing configuration (automatically copied to dist)

### Environment Variables

You need to set the following environment variables in your Netlify dashboard:

1. Go to your Netlify site dashboard
2. Navigate to Site settings > Environment variables
3. Add the following variables:
   - `VITE_SUPABASE_URL` - Your Supabase project URL (found in your Supabase project settings)
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key (found in your Supabase project settings)

**Note:** The Supabase anon key is safe to expose client-side. It's designed to be public and used in frontend applications.

### Build Settings

The netlify.toml file automatically configures:
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 20
- Secrets scanning: Disabled for Supabase keys (they're meant to be public)

### Manual Deploy

To deploy manually:
1. Run `npm run build`
2. Upload the `dist` folder to Netlify

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- 12 comprehensive workshop courses
- User authentication with Supabase
- Responsive design
- Interactive learning platform
- Special promotional offers
- AI Voice Assistant powered by ElevenLabs (English & Spanish support)

### Voice Assistant

The hero section includes an interactive voice assistant that allows users to speak with an AI agent to learn more about the program. The assistant:

- Supports both English and Spanish conversations
- Automatically detects the user's language preference
- Uses ElevenLabs Conversational AI (Agent ID: VWL9te4MU8Ib03Ls74bX)
- Requires microphone permissions to function
- Provides real-time audio feedback with visual connection status

To use the voice assistant:
1. Click the microphone button in the hero section
2. Allow microphone permissions when prompted
3. Start speaking to ask questions about the program
4. Click the button again to end the conversation
5. Use the volume button to mute/unmute audio while connected
