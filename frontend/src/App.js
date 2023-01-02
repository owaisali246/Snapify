import React from 'react'
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './containers/Home';

const App = () => {
  return (
    <Routes>
      <Route path="Login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  )
}

export default App
