const io = require('socket.io')();

const PORT = process.env.PORT || 8080;

io.on('connection', client => {
  client.on('username', username => {
    client.username = username;
    io.emit('is_online', '🔵 <i>' + client.username + ' join the chat..</i>');
  });

  client.on('disconnect', username => {
    client.username = username;
    io.emit('is_online', '🔴 <i>' + client.username + ' left the chat..</i>');
  })

  client.on('chat_message', message => {
    io.emit('chat_message', '<strong>' + client.username + '</strong>: ' + message);
  });

});

io.listen(PORT);
console.log(`Server listening on port ${PORT}...`);
