import './App.css';
import React from 'react';
import Login from './pages/login/Login.js';
import Home from './pages/home/Home.js';
import Signup from './pages/signup/Signup.js';
import Investments from './pages/investments/Investments.js';
import Manage from './pages/manage/Manage.js';
import Portfolio from './pages/portfolio/Portfolio.js';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" Component={Login}/>
      <Route path="/" Component={Home}/>
      <Route path="/signup" Component={Signup}/>
      <Route path="/investments" Component={Investments}/>
      <Route path="/manage" Component={Manage}/>
      <Route path="/portfolio" Component={Portfolio}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
