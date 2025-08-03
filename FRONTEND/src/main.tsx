import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GameStatsProvider } from '../context/GameStatsContext.tsx'
import { GameConfigProvider } from '../context/GameConfigContext.tsx'
import { GameStateProvider } from '../context/GameStateContext.tsx'
import './index.css'
import { App } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameStatsProvider>
      <GameStateProvider>
        <GameConfigProvider>
          <App />
        </GameConfigProvider >
      </GameStateProvider >
    </GameStatsProvider>
  </StrictMode>,
)
