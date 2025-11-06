import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  rootElement.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #1e293b; color: white; padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
      <div style="max-width: 600px; text-align: center;">
        <h1 style="color: #ef4444; font-size: 2rem; margin-bottom: 1rem;">⚠️ Configuration Required</h1>
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
        <p style="color: #94a3b8;">See <strong>NETLIFY_SETUP.md</strong> for detailed instructions</p>
      </div>
    </div>
  `;
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
