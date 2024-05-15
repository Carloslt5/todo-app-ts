import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AppProviders } from './providers/AppProviders.tsx'
import './utils/darkMode.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AppProviders>
        <App />
      </AppProviders>
    </Router>
  </React.StrictMode>
)
