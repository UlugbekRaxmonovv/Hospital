
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/login'
import Regester from './pages/regester'
import Auth from './pages/auth'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/regester" element={<Regester />} />
      <Route path="/" element={<Auth />}>
      <Route path="dashboard" element={<Dashboard/>} />
      <Route path="home" element={<Home/>} />
      </Route>
    </Routes>
   
    </>
  )
}

export default App
