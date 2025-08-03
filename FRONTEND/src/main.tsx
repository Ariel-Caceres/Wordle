import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StatsProvider } from '../context/StatsContext.tsx'
import { DarkModeProvider } from '../context/DarkModeContext.tsx'
import { GameStateProvider } from '../context/GameStateContext.tsx'
import './index.css'
import { App } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StatsProvider>
      <GameStateProvider>
        <DarkModeProvider>
          <App />
        </DarkModeProvider >
      </GameStateProvider >
    </StatsProvider>
  </StrictMode>,
)
