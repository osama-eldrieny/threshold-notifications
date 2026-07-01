import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@exp-textura/react';
import '@exp-textura/react/fonts.css';
import App from './App';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider hoistCSSVars hoistThemeScopedStyles>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
