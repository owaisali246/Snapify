import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './containers/Home';
import ForceRedirect from './components/ForceRedirect';
import { useState, useEffect } from 'react';
import { fetchUser } from './utils/fetchUser';


const App = () => {
  const [isConnected, setIsconnected] = useState(false);
  // const user =  JSON.parse(localStorage.getItem('user'))._id


  const checkUserToken = () => {
    if (typeof window !== "undefined") {
      const user = fetchUser();
      if (user) {
        setIsconnected(true);
      } else {
        setIsconnected(false);
      }
    }
  };

  useEffect(() => {
    checkUserToken();
  }, [isConnected]);

  const Logout = () => {
    if (localStorage.getItem("user")) {
      localStorage.clear();
      setIsconnected(false);
    }
  };

  return (
    <Routes>
      <Route path="/login" element={
        <ForceRedirect user={isConnected}>
          <Login />
        </ForceRedirect>
      }
      />
      <Route path="/*" element={<Home Logout={Logout} />} />
    </Routes>
  )
}

export default App
