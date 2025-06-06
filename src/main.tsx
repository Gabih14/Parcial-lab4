import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AutoProvider } from './context/AutoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AutoProvider>
        <App />
      </AutoProvider>
  </StrictMode>,
)
