import React, {useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './ChatWindow.css'
import ClientStatus from '../ClientStatus/ClientStatus';
import Input from '../Input/Input';
let socket;
const server = 'localhost:5000';

const ChatWindow = ({location}) => {
    const [name,setName] = useState('');
    const [groupName,setGroupName] = useState('');
    const [message,setMessage] = useState([]);
    const [messages,setMessages] = useState([]);

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

    useEffect(() =>{
        socket.on('message',(message) =>{
            setMessages([...messages,message]);
        });
    }, [messages]);

    const sendMessage = (event) =>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, () => setMessage(' '));
        }
    }

    return (
        <div className='chatOuterContainer'>
            <div className='chatContainer'>
                <ClientStatus groupName = {groupName}/>
                <Input message = {message} setMessage={setMessage} sendMessage ={sendMessage} />
            </div>
        </div>
    )
}

export default ChatWindow;