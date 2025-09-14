import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthContext.jsx'
import { ContractsProvider } from './context/ContractsContext.jsx'


createRoot(document.getElementById('root')).render(
<React.StrictMode>
<BrowserRouter>
<AuthProvider>
<ContractsProvider>
<App />
</ContractsProvider>
</AuthProvider>
</BrowserRouter>
</React.StrictMode>
)