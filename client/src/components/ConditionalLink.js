import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Navigate} from 'react-router-dom'

function ConditionalLink(props){
    let [password, setPassword] = React.useState('');
    let [auth, setAuth] = React.useState(false);
    useEffect(() => {
    fetchData();
}, [props.username]);
async function fetchData(){
    try{
    const response = await fetch(`http://localhost:5001/users/getuser/${props.username}`).then((response) => response.json()).then((data) => data.password).then((password) => setPassword(password));
    return response;
    } catch(err){
        console.error(err);
    }
}

    if(auth){
        return(
            <Navigate to='/' class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 w-100" type="button" style={{minWidth:"100px"}}>Log
                in</Navigate>
        )
    } else {
        return(
            <button onClick={authenticate} class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 w-100" type="button" style={{minWidth:"100px"}}>Log
                in</button>
        )
    }

    function authenticate(){
        if(password == props.userPass && password != ''){
            console.log(password, props.userPass);
            window.localStorage.setItem("authenticated", true);
            setAuth(true);
            } else {
                window.localStorage.setItem("authenticated", false);
                setAuth(false);
            }
    }
}

export default ConditionalLink;