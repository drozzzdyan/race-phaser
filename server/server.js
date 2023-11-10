const PORT = 3000;
const DOCROOT = './../dist/';

const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

// creating server
const app = express();
const server = http.createServer(app);

// return data
const documentRoot = path.join(__dirname, DOCROOT);
const staticContent = express.static(documentRoot);
app.use(staticContent);

// starting server
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})

// init socketIO
const io = socketIO(server);
io.on('connection', socket => {
  socket.emit('gameStart');

  console.log(`new user ${socket.id}`);
  // console.log(socket);
})