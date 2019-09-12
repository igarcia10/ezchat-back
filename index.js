const express = require('express');
const http = require('http');
const io = require('socket.io')(http);

const app = express();

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', socket => {
  socket.on('username', username => {
    socket.username = username;
    io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
  });

  socket.on('disconnect', username => {
    socket.username = username;
    io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
  })

  socket.on('chat_message', message => {
    io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
  });

});

app.listen(process.env.PORT || 8080, () => console.log('Server running...'));