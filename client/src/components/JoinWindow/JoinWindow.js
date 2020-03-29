import React, {useState} from 'react';
import logo from '../images/logo.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const JoinWindow = () => {
    const [name,seName] = useState('');
    const [groupName,setGroupName] = useState('');


    return (
        <div>
            <img src={logo} className= "app-logo"/>
            <div>
                <h1 className = "heading"> Join </h1>
                <div><input placeholder= "name" className = "joinInput" type = "text" onChange={(event)=> setName(event.target.value)}></input></div>
                <div><input placeholder= "groupName" className = "joinInput" type = "text" onChange={(event)=> setGroupName(event.target.value)}></input></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`./chat?name=${name}&groupName =${groupName}`} >
                    <button className = "button" type = "submit">Sign in</button>
                </Link>
            </div>
        </div>
    )
}

export default JoinWindow;