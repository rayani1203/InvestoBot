import React from "react";
import './Login.css'
import 'bootstrap/dist/css/bootstrap.css';
import {Navigate, Link} from 'react-router-dom'
import ConditionalLink from '../../components/ConditionalLink'

function Login(){
    let [auth] = React.useState(determineAuth());
    let [user, setUser] = React.useState({username: '', password: ''});
    let [error, setError] = React.useState(false);

    function handleChange(event){
        if(event.target.id == 'username'){
        setUser(user => ({
            ...user,
            username: event.target.value
        })
        )
    } else if(event.target.id == 'password'){
        setUser(user => ({
            ...user,
            password: event.target.value
        })
        )
    }
    }

    function determineAuth(){
        if(window.localStorage.getItem("authenticated") == "true") {
            return true;
        } else {
            return false;
        };
    }
    
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
                {error && <div class="alert alert-danger" role="alert">
                Invalid username or password :(
                </div>}
                <form>
                  <p>Please log in to your account</p>

                  <div class="form-outline mb-4">
                    <input type="text" id="username" class="form-control" placeholder="Username" onChange={handleChange}/>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="password" class="form-control" placeholder="Password" onChange={handleChange}/>
                  </div>

                  <div class="text-center d-inline-block pt-1 pb-1">
                    <ConditionalLink state = {setError}userPass={user.password} username={user.username}></ConditionalLink>
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