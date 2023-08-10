import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap";
import { Navigate } from "react-router-dom";

function Navbar(){
    function currAuth(){
        const value = window.localStorage.getItem("authenticated");
        if (value == "true") {
            console.log("Authenticated");
            return true;
        } else {
            return false;
        }
    }
    let [auth, setAuth] = React.useState(currAuth());
  function swapAuth(){
    setAuth((prevAuth) => !prevAuth);
  }
  useEffect(() => {
    window.localStorage.setItem('authenticated', auth);
  }, [auth]);

  const liStyle = {
    display: "block",
    marginLeft: "10px",
  }
  useEffect(() => {
    let currentLinks = document.querySelectorAll(`a[href="${window.location.pathname}"]`);
    console.log(window.location.pathname);
    currentLinks.forEach(link => link.className += ' active');
  }, []);

    return (
        <>
        {!auth && <Navigate to='/login'></Navigate>}
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="/">
    <img src="https://freepngimg.com/save/25646-stock-market-clipart/1000x1000" alt="" style={{maxWidth: "40px", marginLeft: "20px"}}/>
  </a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{width:"100vw"}}>
    <ul class="navbar-nav">
      <li class="nav-item" style={liStyle}>
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item" style={liStyle}>
        <a class="nav-link" href="/investments">View</a>
      </li>
      <li class="nav-item" style={liStyle}>
        <a class="nav-link" href="/manage">Manage</a>
      </li>
      <li class="nav-item" style={liStyle}>
        <a class="nav-link" href="/portfolio">Portfolio</a>
      </li>
    </ul>
    <button class="btn btn-outline-light my-2 my-sm-0 ms-auto me-4" onClick={swapAuth} type="submit">Sign Out</button>
  </div>
</nav>
</>
    )
}

export default Navbar;