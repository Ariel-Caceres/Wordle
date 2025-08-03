import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StatsProvider } from '../context/StatsContext.tsx'
import { GameConfigProvider } from '../context/GameConfigContext.tsx'
import { GameStateProvider } from '../context/GameStateContext.tsx'
import './index.css'
import { App } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StatsProvider>
      <GameStateProvider>
        <GameConfigProvider>
          <App />
        </GameConfigProvider >
      </GameStateProvider >
    </StatsProvider>
  </StrictMode>,
)
