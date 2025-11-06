import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('Environment check:', {
  hasUrl: !!import.meta.env.VITE_SUPABASE_URL,
  hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
  url: import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Missing',
  key: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const hasRequiredEnvVars = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!hasRequiredEnvVars) {
  console.error('Missing required environment variables!');
  document.body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #1e293b; color: white; padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
      <div style="max-width: 600px; text-align: center;">
        <h1 style="color: #ef4444; font-size: 2rem; margin-bottom: 1rem;">Configuration Required</h1>
        <p style="font-size: 1.125rem; margin-bottom: 1.5rem;">Environment variables are missing!</p>
        <div style="background: #334155; padding: 1.5rem; border-radius: 8px; text-align: left; margin-bottom: 1.5rem;">
          <p style="margin-bottom: 1rem; font-weight: bold;">Add these in Netlify Dashboard:</p>
          <ol style="line-height: 1.8;">
            <li>Go to: Site settings → Environment variables</li>
            <li>Add: <code style="background: #1e293b; padding: 2px 6px; border-radius: 4px;">VITE_SUPABASE_URL</code></li>
            <li>Add: <code style="background: #1e293b; padding: 2px 6px; border-radius: 4px;">VITE_SUPABASE_ANON_KEY</code></li>
            <li>Redeploy your site</li>
          </ol>
        </div>
        <p style="color: #94a3b8; margin-top: 1rem;">Open browser console (F12) for more details</p>
        <p style="color: #94a3b8;">See <strong>NETLIFY_SETUP.md</strong> for detailed instructions</p>
      </div>
    </div>
  `;
} else {
  console.log('Environment variables configured, starting app...');
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Error rendering app:', error);
    document.body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #1e293b; color: white; padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
        <div style="max-width: 600px; text-align: center;">
          <h1 style="color: #ef4444; font-size: 2rem; margin-bottom: 1rem;">Application Error</h1>
          <p style="font-size: 1.125rem; margin-bottom: 1.5rem;">An error occurred while loading the application</p>
          <p style="color: #94a3b8;">Check browser console (F12) for details</p>
          <pre style="background: #334155; padding: 1rem; border-radius: 8px; text-align: left; overflow: auto; margin-top: 1rem;">${error}</pre>
        </div>
      </div>
    `;
  }
}
