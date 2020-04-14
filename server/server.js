const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const {addUser, deleteUser, getUser,getUsersInGroup} = require('./users.js');


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
        socket.broadcast.to(user.groupName).emit('message', {user:'Bot',text : `${user.name}, has joined the group`});
        socket.join(user.groupName);
        io.to(user.groupName).emit('groupData',{groupName: user.groupName, users : getUsersInGroup(user.groupName)});
        callback();
    });
    socket.on('sendMessage', (message,callback) => {
        const user = getUser(socket.id);
        io.to(user.groupName).emit('message', {user : user.name, text: message});
        io.to(user.groupName).emit('groupData', {user : user.groupName, users : getUsersInGroup(user.groupName)});
        callback();
    });
    socket.on('disconnect', () =>{
        const user = deleteUser(socket.id);

        if(user){
            io.to(user.groupName).emit('message', {user: 'bot',text:`${user.name} has left the groupë`});
        }
    });
});

app.use(router);
server.listen(port, () => console.log('server is running on port : ',port));