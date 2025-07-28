import { useState } from 'react'
import './App.css'
import LoginPage from './pages/login'
import RegisterPage from './pages/signup'
import HomePage from './pages/homepage'
import TasksPage from './pages/taskspage'
import TeamsPage from './pages/teamspage'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import ManageTeamPage from './pages/manageTeam'
import toast,{Toaster} from 'react-hot-toast'
function App() {

  return (
    <div>
      <Router>
        <Toaster position='bottom-center' toastOptions={{
          duration:2000
        }} />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<RegisterPage />} />
          <Route path='/' element={<LoginPage />} />
          
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/manageTeam/:teamId" element={<ManageTeamPage />} />
          <Route path="/manageTeam" element={<ManageTeamPage />} />
         
        </Routes>
      </Router>

    </div>
  )
}

export default App
