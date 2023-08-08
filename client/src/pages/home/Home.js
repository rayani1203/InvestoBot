import React, {useEffect, useMemo} from "react";
import { Navigate } from "react-router-dom";

function Home (){
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
    console.log(auth);
    setAuth((prevAuth) => !prevAuth);
  }
  useEffect(() => {
    window.localStorage.setItem('authenticated', auth);
    console.log(window.localStorage.getItem('authenticated'));
  }, [auth]);
    return (
        <>
        {!auth && <Navigate to='./login'></Navigate>}
        <div className="Home-container">
            This is homepage
        </div>
        <button onClick={swapAuth}>Swap Auth</button>   
        </>
    )
}

export default Home;