import React, {useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;
const server = 'localhost:5000';

const ChatWindow = ({location}) => {
    const [name,setName] = useState('');
    const [groupName,setGroupName] = useState('');

    useEffect(() =>{
        const{ name, groupName } = queryString.parse(location.search);
        socket= io(server);
        setName(name);
        setGroupName(groupName);
        socket.emit('join',{name,groupName},()=>{;
        });
        return () =>{
            socket.emit('disconnect');
            socket.off();
        };
    },[server,location.search]);

    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}

export default ChatWindow;