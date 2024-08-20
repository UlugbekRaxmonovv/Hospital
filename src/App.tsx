
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/login'
import Regester from './pages/regester'
import Auth from './pages/auth'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import {Toaster} from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>

  <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <Routes>
      <Route path="/"  element={<Login />} />
      <Route path="/register" element={<Regester />} />
      <Route path="/" element={<Auth />}>
      <Route path="dashboard" element={<Dashboard/>} />
      <Route path="home" element={<Home/>} />
      </Route>
    </Routes>
   
    </>
  )
}

export default App
