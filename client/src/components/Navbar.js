import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap";
import { Navigate } from "react-router-dom";

function Navbar(props){
    let [wallet, setWallet] = React.useState({wallet:0.0, assets:0.0});
    // let [dummy, setDummy] = React.useState(0);
    // useEffect(() => {
    //     setDummy((dummy) => dummy + 1)
    // }, [props.dummy]);
    async function fetchWallet(){
        let id = Number(window.localStorage.getItem("authenticated"));
        try{
        const wallet = await fetch(`http://localhost:5001/users/getid/${id}`).then((response) => response.json());
        return wallet;
        } catch (e) {
            console.error(e);
        }
    }

    function currAuth(){
        const value = Number(window.localStorage.getItem("authenticated"));
        if (value > 0) {
            return value;
        } else {
            return 0;
        }
    }
    let [auth, setAuth] = React.useState(currAuth());
  function signOut(){
    setAuth(0);
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
    currentLinks.forEach(link => link.className += ' active');
    if(auth>0){
    fetchWallet().then((res) => setWallet({
        wallet: res.wallet,
        assets: res.assets
    }));
}
  }, [props.dummy]);

  async function updateWallet(add){
    let value = 0;
    add?value = Number(document.getElementById('add').value):value = Number(document.getElementById('subtract').value);

    const data = {
        add: add,
        amount: value,
        id: auth
    }

    try{
    const newWallet = await fetch('http://localhost:5001/users/wallet', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }).then((response) => response.json()).then((data) => setWallet(data.wallet));
    return newWallet;
} catch (e) {
    console.error(e);
}
  }

    return (
        <>
        {(auth == 0) && <Navigate to='/login'></Navigate>}
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
        <a class="nav-link" href="/investments">Investments</a>
      </li>
      <li class="nav-item" style={liStyle}>
        <a class="nav-link" href="/portfolio">Portfolio</a>
      </li>
    </ul>
    <div class="my-2 my-sm-0 ms-auto me-4" style={{display:"flex"}}>
        <span class="me-5 my-auto" style={{color:"white", fontWeight:"600"}}>
            Assets: ${Number(wallet.assets).toFixed(2)}
        </span>
        <div class="dropdown me-5">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Wallet: ${Number(wallet.wallet).toFixed(2)}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <form class="form-inline mb-4">
                <input class="form-control mr-sm-2" id="add" type="number" aria-label="Search"/>
                <button onClick={()=>{updateWallet(true)}} class="btn btn-sm btn-outline-success my-sm-0">Add Amount</button>
            </form>
            <form class="form-inline">
                <input class="form-control mr-sm-2" id="subtract" type="number" aria-label="Search"/>
                <button onClick={()=>{updateWallet(false)}} class="btn btn-sm btn-outline-danger my-sm-0" type="submit">Subtract Amount</button>
            </form>
            
        </div>
        </div>
    <button class="btn btn-outline-light" onClick={signOut} type="submit">Sign Out</button>
    </div>
  </div>
</nav>
</>
    )
}

export default Navbar;