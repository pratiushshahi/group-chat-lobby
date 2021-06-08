const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('msz', data => {
      var mszData = data;
        console.log(`${mszData}`);
        io.sockets.emit('all',`${mszData}`);
    })
    socket.on('disconnect',() => {
      io.sockets.emit('all','user disconnected')
    })
});

server.listen(3000, () => {
  console.log('CHAT APP listening on : 3000');
});