import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './comonents/Navbar'
import Login from './pages/Login'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/nav' element={<Navbar />} />
        <Route path='login' element={<Login />} />
        

      </Routes>
    </>
  )
}

export default App
