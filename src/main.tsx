import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/game.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
