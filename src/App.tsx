import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/regester';
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {
  const [relout, setRelout] = useState<boolean>(false);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Auth />}>
          <Route path="dashboard" element={<Dashboard setRelout={setRelout} relout={relout} />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
