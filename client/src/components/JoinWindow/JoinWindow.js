import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

import './JoinWindow.css'

const JoinWindow = () => {
    const [name,setName] = useState('');
    const [groupName,setGroupName] = useState('');
    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <img className='logo' src = {logo}/>
                <h1 className = "heading"> Join </h1>
                <div><input placeholder= "Name" className = "joinInput" type = "text" onChange={(event)=> setName(event.target.value)}></input></div>
                <div><input placeholder= "Group Name" className = "joinInput" type = "text" onChange={(event)=> setGroupName(event.target.value)}></input></div>
                <Link onClick={event => (!name || !groupName) ? event.preventDefault() : null} to={`./chat?name=${name}&groupName =${groupName}`} >
                    <button className = "button" type = "submit">Sign in</button>
                </Link>
            </div>
        </div>
    )
}

export default JoinWindow;