import React, {useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './ChatWindow.css'

import ClientStatus from '../ClientStatus/ClientStatus';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import Draw from '../Draw/Draw';


let socket;
const server = 'https://draw-project.herokuapp.com/';

const ChatWindow = ({location}) => {
    const [name,setName] = useState('');
    const [groupName,setGroupName] = useState('');
    const [message,setMessage] = useState([]);
    const [messages,setMessages] = useState([]);
    const [lines,setLines] = useState([]);
    const [line] = useState([]);

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

    useEffect(() =>{
        socket.on('draw',(line) =>{
            setLines([...lines,line]);
        });
    }, [lines]);
    
    const sendLine = (event) => {
        event.preventDefault();
        if(line){
            socket.emit('sendDraw', line, () => setLines([...lines,line]));
        }    
    }

    return (
        <div className='chatOuterContainer'>
            <Draw lins={line} setLines = {setLines} sendLine = {sendLine} lines = {lines}/>
            <div className='chatContainer'>
                <ClientStatus groupName = {groupName}/>
                <Messages messages={messages} name={name}/>
                <Input message = {message} setMessage={setMessage} sendMessage ={sendMessage} />
            </div>
        </div>
    )
}

export default ChatWindow;