import React from "react";
import './Login.css'
import 'bootstrap/dist/css/bootstrap.css';
import {Navigate, Link} from 'react-router-dom'

function Login(){
    function switchAuth(){
        console.log( window.localStorage.getItem("authenticated"));
        window.localStorage.setItem("authenticated", true);
        <Navigate to='/'></Navigate>
    }
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
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{width: "185px"}} alt="logo"/>
                  <h4 class="mt-1 mb-5 pb-1">Welcome to InvestoBot!</h4>
                </div>
                <form>
                  <p>Please login to your account</p>

                  <div class="form-outline mb-4">
                    <input type="email" id="form2Example11" class="form-control"
                      placeholder="Phone number or email address" />
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example22" class="form-control" placeholder="Password" />
                  </div>

                  <div class="text-center d-inline-block pt-1 mb-5 pb-1">
                    <Link onClick={switchAuth} to='/' class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 w-100" type="button">Log
                      in</Link>
                    <div>
                    <a class="text-muted" href="#!">Forgot password?</a>
                    </div>
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