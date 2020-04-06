const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const {addUser, deleteUser, getUser,getUserInGroup} = require('./users.js');


const app = express();

const server = http.createServer(app);
const io = socketio(server);
const port = process.env.port || 5000;
const router = require('./router');

io.on('connection', (socket) => {
    socket.on('join', ({ name, groupName},callback)=>{
        const {error,user} = addUser({id : socket.id, name, groupName});
        if(error) return callback(error);
        socket.join(user.groupName);
        socket.emit('message', {user: 'Bot',text: `${user.name}, welcome to the group ${user.groupName}.`});
        socket.broadcast.to(user.groupName).emit('message', {user:'admin',text : `${user.name}, has joined the group`});

        callback();
    });
    socket.on('sendMessage', (message,callback) => {
        const user = getUser(socket.id);
        io.to(user.groupName).emit('message', {user : user.name, text: message});
        callback();
    });
    socket.on('disconnect', () =>{
        console.log('user is now disconnected');
    });
});

app.use(router);
server.listen(port, () => console.log('server is running on port : ',port));