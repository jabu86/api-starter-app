import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {AuthProvider} from "./context/AuthContext.jsx";
import 'bootstrap/dist/js/bootstrap.js';
import  './index.css'
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
