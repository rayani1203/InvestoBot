import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Navigate} from 'react-router-dom'

function ConditionalLink(props){
    let [user, setUser] = React.useState({password: '', id: 0});
    let [auth, setAuth] = React.useState(0);
    useEffect(() => {
    fetchData();
    console.log(props.username);
}, [props.username]);
async function fetchData(){
    try{
    const response = await fetch(`http://localhost:5001/users/getuser/${props.username}`).then((response) => response.json()).then((data) => setUser({password:data.password, id:data.id}));
    return response;
    } catch(err){
        console.error(err);
    }
}

    if(auth>0){
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
        if(user.password == props.userPass && user.password != ''){
            console.log(user.password, props.userPass);
            window.localStorage.setItem("authenticated", user.id);
            setAuth(user.id);
            } else {
                window.localStorage.setItem("authenticated", 0);
                setAuth(0);
                props.state(true);
            }
    }
}

export default ConditionalLink;