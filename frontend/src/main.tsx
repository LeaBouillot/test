import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css'; // ou le chemin vers ton fichier CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
