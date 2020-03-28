const express = require('express');
const http = require('http');
const socketio = require('socket.io');


const app = express();

const server = http.createServer(app);
const io = socketio(server);
const port = process.env.port || 3001;

server.listen(port, () => console.log('server is running on port : ',port));