import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  const basePath = import.meta.env.BASE_URL;
  navigator.serviceWorker.register(new URL('sw.js', window.location.href), { scope: basePath }).catch(() => {});
}
