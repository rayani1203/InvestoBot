import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Navigate} from 'react-router-dom'

function ConditionalSign(props){
    let [auth, setAuth] = React.useState(0);
async function postData(userInfo){
    try{
    const response = await fetch(`http://localhost:5001/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo)
    }).then((data)=> data.json());
    return response.id;
    } catch(err){
        console.error(err);
        return 0;
    }
}

    if(auth>0){
        return(
            <Navigate to='/' class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 w-100" type="button" style={{minWidth:"100px"}}>Sign up</Navigate>
        )
    } else {
        return(
            <button onClick={authenticate} class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 w-100" type="button" style={{minWidth:"100px"}}>Sign up</button>
        )
    }

    async function authenticate(){
        const response = await postData(props.user);
        if((Object.values(props.user).every((str) => str != '')) && response){
            window.localStorage.setItem("authenticated", response);
            setAuth(response);
            } else {
                console.log(props.user);
                window.localStorage.setItem("authenticated", 0);
                setAuth(0);
                props.state(true);
            }
    }
}

export default ConditionalSign;