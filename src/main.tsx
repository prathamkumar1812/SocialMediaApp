import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

import { QueryProvider } from './lib/react-query/queryProvider.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
<BrowserRouter>
<QueryProvider>
<AuthProvider>
 
 <App />
</AuthProvider>
</QueryProvider>
 </BrowserRouter>
)
