import { useState } from 'react'
import './App.css'
import LoginPage from './pages/login'
import RegisterPage from './pages/signup'
import HomePage from './pages/homepage'
import TasksPage from './pages/taskspage'
import TeamsPage from './pages/teamspage'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<RegisterPage />} />
          
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/home" element={<HomePage />} />
         
        </Routes>
      </Router>

    </div>
  )
}

export default App
