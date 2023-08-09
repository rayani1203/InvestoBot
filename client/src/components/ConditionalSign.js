import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Navigate} from 'react-router-dom'

function ConditionalSign(props){
    let [auth, setAuth] = React.useState(false);
async function postData(userInfo){
    try{
    const response = await fetch(`http://localhost:5001/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo)
    });
    return true;
    } catch(err){
        console.error(err);
        return false;
    }
}

    if(auth){
        return(
            <Navigate to='/' class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 w-100" type="button" style={{minWidth:"100px"}}>Sign up</Navigate>
        )
    } else {
        return(
            <button onClick={authenticate} class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 w-100" type="button" style={{minWidth:"100px"}}>Sign up</button>
        )
    }

    function authenticate(){
        if((Object.values(props.user).every((str) => str != '')) && postData(props.user)){
            window.localStorage.setItem("authenticated", true);
            setAuth(true);
            } else {
                console.log(props.user);
                window.localStorage.setItem("authenticated", false);
                setAuth(false);
                props.state(true);
            }
    }
}

export default ConditionalSign;