import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from '../../components/Navbar'
import './Home.css'

function Home (){
    function currAuth(){
        const value = Number(window.localStorage.getItem("authenticated"));
        if (value > 0) {
            console.log("Authenticated");
            return value;
        } else {
            return 0;
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
        {(auth==0) && <Navigate to='./login'></Navigate>}
        <Navbar/>
        </>
    )
}

export default Home;