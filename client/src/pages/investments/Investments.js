import React from "react";
import Navbar from "../../components/Navbar";
import NewInvest from "../../components/NewInvest";
import { Navigate } from "react-router-dom";
import ViewInvest from "../../components/ViewInvest";

function Investments(){
    let [auth] = React.useState(currAuth());
    let [dummy, setDummy] = React.useState(0);
    console.log(dummy);
    function currAuth(){
        const value = Number(window.localStorage.getItem("authenticated"));
        if (value > 0) {
            return value;
        } else {
            return 0;
        }
    }
    
    return (
        <>
        {(auth==0) && <Navigate to='./login'></Navigate>}
        <Navbar dummy={dummy}/>
        <NewInvest user_id={auth} state={setDummy}/>
        <ViewInvest/>
        </>
    )
}

export default Investments;