import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- Import BrowserRouter
import App from './App';
import './App.css'; // <-- Use App.css

// Find the root element in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Wrap your entire App in the router */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
