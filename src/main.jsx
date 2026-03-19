import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import SignUp from './Signup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login></Login>
    <SignUp></SignUp>
  </StrictMode>,
)
