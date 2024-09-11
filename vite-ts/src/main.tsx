import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Components
import App from './App.tsx';

// Styles
import './reset.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
