import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from '../../components/Navbar'
import './Home.css'

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
    let [auth] = React.useState(currAuth());
//   function swapAuth(){
//     setAuth((prevAuth) => !prevAuth);
//   }
//   useEffect(() => {
//     window.localStorage.setItem('authenticated', auth);
//   }, [auth]);
    return (
        <>
        {!auth && <Navigate to='./login'></Navigate>}
        <Navbar/>
        </>
    )
}

export default Home;