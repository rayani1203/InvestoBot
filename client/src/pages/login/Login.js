import React, {useEffect} from "react";
import './Login.css'
import 'bootstrap/dist/css/bootstrap.css';
import {Navigate, Link} from 'react-router-dom'

function Login(){
    let [dummy, setDummy] = React.useState();
    async function authenticate(){
        const username = document.getElementById('username').value;
        const userPass = document.getElementById('password').value;
        await fetch(`http://localhost:5001/users/getuser/${username}`).then((response) => response.json()).then(
            (data) => data.password).then((password) => comparePassword(userPass, password)).then(setDummy());
    }

    function comparePassword(userPass, password) {
        console.log(userPass, password);
        if(userPass == password){
            window.localStorage.setItem("authenticated", true);
        }
    }

    useEffect(() => {
        console.log(window.localStorage.getItem("authenticated"));
    }, [dummy]);

    let auth;
    if(window.localStorage.getItem("authenticated") == "true") {
        auth = true;
    } else {
        auth = false;
    };
    return (
        <>
        {auth && <Navigate to='/'></Navigate>}
        <section className="h-100 gradient-form" style={{backgroundColor: "#eee"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-6">
        <div className="card rounded-3 text-black">
          <div class="row g-0 d-flex justify-content-center align-items-center">
            <div class="col-lg-6">
              <div class="card-body">
                <div class="text-center">
                  <img src="https://cdn-icons-png.flaticon.com/512/3345/3345031.png"
                    style={{width: "150px", marginBottom: "15px"}} alt="logo"/>
                  <h4 class="mt-1 mb-5 pb-1">Welcome to InvestoBot!</h4>
                </div>
                <form>
                  <p>Please log in to your account</p>

                  <div class="form-outline mb-4">
                    <input type="text" id="username" class="form-control" placeholder="Username" />
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="password" class="form-control" placeholder="Password" />
                  </div>

                  <div class="form-outline mb-4">
                    <input type="email" id="email" class="form-control"
                      placeholder="Email address" />
                  </div>

                  <div class="form-outline mb-4">
                    <input type="text" id="name" class="form-control"
                      placeholder="Full name" />
                  </div>

                  <div class="text-center d-inline-block pt-1 pb-1">
                    <Link onClick={authenticate} to='/' class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 w-100" type="button" style={{minWidth:"100px"}}>Log
                      in</Link>
                  </div>

                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Don't have an account?</p>
                    <Link to='/signup' type="button" class="btn btn-outline-danger">Create new</Link>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</>
    );
}

export default Login;