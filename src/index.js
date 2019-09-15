const io = require('socket.io')();
const uuidv4 = require('uuid/v4');

const PORT = process.env.PORT || 8080;

io.on('connection', client => {
  client.on('username', username => {
    client.username = username;
    io.emit('system_message', { id: uuidv4(), text: `🔵 <i>${username} joined the chat..</i>` });
  });

  client.on('disconnect', username => {
    client.username = username;
    io.emit('system_message', { id: uuidv4(), text: `🔴 <i>${username} left the chat..</i>` });
  })

  client.on('chat_message', message => {
    io.emit('chat_message', { id: uuidv4(), text: `<strong>${client.username}</strong>: ${message}` });
  });

});

io.listen(PORT);
console.log(`Server listening on port ${PORT}...`);
