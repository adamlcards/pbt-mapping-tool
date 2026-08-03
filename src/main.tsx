import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

/**
 * Mount defensively.
 *
 * In the standalone single-file build the bundle is a classic inline script,
 * which runs as soon as the parser reaches it rather than waiting for the
 * document. If that lands before #root exists, silently doing nothing produces
 * a blank page with no error at all, which is the worst possible failure mode.
 * So: wait for the document when it is not ready, and say something visible if
 * the mount point is genuinely missing.
 */
function mount(): void {
  const root = document.getElementById('root');
  if (!root) {
    document.body.innerHTML =
      '<p style="font-family:system-ui;padding:2rem">Could not start: the page is missing its mount point.</p>';
    return;
  }
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
