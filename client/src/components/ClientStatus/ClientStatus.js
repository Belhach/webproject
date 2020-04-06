import React from 'react';
import ConnectedIcon from '../../images/ConnectedIcon.png';
import DisconnectedIcon from '../../images/DisconnectedIcon.png';

import './ClientStatus.css';

const ClientStatus = ({groupName}) =>(
    <div className ="ClientStatus">
        <div className="leftInnerContainer">
            <img className ="ConnectedIcon" src = {ConnectedIcon} alt = "connectedIcon"/>
            <h2>{groupName}</h2>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src ={DisconnectedIcon} alt = "DisconnectedIcon"/></a>
        </div>
    </div>
);

export default ClientStatus;