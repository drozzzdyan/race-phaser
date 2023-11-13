const PORT = 3000;
// const HOST = '0.0.0.0'
const DOCROOT = './../dist/';

const http = require('http');
const path = require('path');
const express = require('express');
const sockets = require('./sockets');

// creating server
const app = express();
const server = http.createServer(app);

// return data
const documentRoot = path.join(__dirname, DOCROOT);
const staticContent = express.static(documentRoot);
app.use(staticContent);

// sockets init
sockets.init(server);

// starting server
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})
