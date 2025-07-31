import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StatsProvider } from '../context/StatsContext.tsx'
import './index.css'
import { App } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StatsProvider>
      <App />
    </StatsProvider>
  </StrictMode>,
)
