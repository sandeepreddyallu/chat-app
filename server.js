var io = require('socket.io'),
  connect = require('connect');

var chat_room = io.listen(4000);

chat_room.sockets.on('connection', function (socket) {
  socket.emit('join', {message: 'Welcome to the chat room!'});

  socket.on('disconnect', function  () {
    chat_room.sockets.emit('exit', {message: 'A chatter has disconnected.'});
  });

  socket.on('msg', function  (data) {
  var nn=data.name;
    chat_room.sockets.emit('msg', {message: data.name +': '+ data.message});
  });

  chat_room.sockets.emit('join', {message: 'A new chatter is online.'});
});
