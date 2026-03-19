import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './Auth/Login.jsx'
import Signup from './Auth/Signup.jsx'
import ResetPword from './Auth/ResetPword.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetpword" element={<ResetPword />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
