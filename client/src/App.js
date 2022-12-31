import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import SetAvatar from './pages/SetAvatar'
import Friend from './pages/Friend'
import Room from './pages/Room'

import Dashboard from './pages/Dashboard'

const App = () => {
   return (
      <Router>
         <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/setAvatar' element={<SetAvatar />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='/friend' element={<Friend />} />
            <Route path='/room' element={<Room />} />
         </Routes>
      </Router>
   )
}

export default App
