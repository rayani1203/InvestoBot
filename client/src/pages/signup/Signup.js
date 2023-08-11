import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import ConditionalSign from '../../components/ConditionalSign';

function Signup(){
    let [auth] = React.useState(determineAuth());
    let [user, setUser] = React.useState({username: '', password: '', email: '', name: ''});
    let [error, setError] = React.useState(false);

    function handleChange(event){
        setUser(user => ({
            ...user,
            [event.target.id]: event.target.value
        })
        );
    }

    function determineAuth(){
        if(Number(window.localStorage.getItem("authenticated")) > 0) {
            return Number(window.localStorage.getItem("authenticated"));
        } else {
            return 0;
        };
    }
    return (
        <>
        {(auth>0) && <Navigate to='/'></Navigate>}
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
                Please fill out all fields appropriately
                </div>}
                <form>
                  <p>Sign up for a free account!</p>

                  <div class="form-outline mb-4">
                    <input type="text" id="username" class="form-control" placeholder="Username" onChange={handleChange}/>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="password" class="form-control" placeholder="Password" onChange={handleChange}/>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="text" id="email" class="form-control" placeholder="Email" onChange={handleChange}/>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="text" id="name" class="form-control" placeholder="Full name" onChange={handleChange}/>
                  </div>

                  <div class="text-center d-inline-block pt-1 pb-1">
                    <ConditionalSign state = {setError} user ={user}></ConditionalSign>
                  </div>

                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Already have an account?</p>
                    <Link to='/login' type="button" class="btn btn-outline-danger">Log in</Link>
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

export default Signup;