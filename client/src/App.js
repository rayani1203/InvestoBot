import './App.css';
import React, { useEffect } from 'react';
import Login from './pages/login/Login.js';
import Home from './pages/home/Home.js';
import Signup from './pages/signup/Signup.js';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" Component={Login}/>
      <Route path="/" Component={Home}/>
      <Route path="/signup" Component={Signup}/>
      
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
