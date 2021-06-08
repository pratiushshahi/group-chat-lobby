const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000

io.on('connection', (socket) => {
    socket.on('msz', data => {
      var mszData = data;
      io.sockets.emit('all',`${mszData}`);
    })
    socket.on('disconnect',() => {
      io.sockets.emit('all','user disconnected')
    })
});

server.listen(PORT);
