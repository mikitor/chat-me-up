const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const { generateMsg, generateLocationMsg } = require('./utils/message');
const { isAcceptedString } = require('./utils/validate');
const { Users } = require('./utils/users.js');

const users = new Users();

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

app.use('/', express.static(publicPath));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('join', function (props, cb) {
    if (!isAcceptedString(props.room) || !isAcceptedString(props.name)) {
      return cb('Username and room number are required');
    }

    console.log(`${props.name} joined room ${props.room}`);
    cb();
    socket.join(props.room);
    users.deleteUser(socket.id);
    users.addUser(socket.id, props.name, props.room);

    io.to(props.room).emit('updateActiveUsers', users.getAllUsers(props.room));
    socket.emit('receiveMsg', generateMsg('Admin', 'Welcome to Chat me up!'));
    socket.broadcast.to(props.room).emit('receiveMsg', generateMsg('Admin', `${props.name} has joined the room`));
  });

  socket.on('sendMsg', (msg) => {
    const user = users.getUser(socket.id);

    if (user && isAcceptedString(msg.text)) {
      io.to(user.room).emit('receiveMsg', generateMsg(user.name, msg.text));
    }
  });

  socket.on('sendLocationMsg', (msg, cb) => {
    const user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('new location message', generateLocationMsg(user.name, msg.latitude, msg.longitude));
    }

    cb('This is from the server');
  });

  socket.on('disconnect', () => {
    const user = users.deleteUser(socket.id);
    if (user) {
      console.log(`${user.name} disconnected`);
      socket.broadcast.to(user.room).emit('updateActiveUsers', users.getAllUsers(user.room));
      socket.broadcast.to(user.room).emit('receiveMsg', generateMsg('Admin', `${user.name} has left the room`));
    }
  });
});

http.listen(port, () => console.log(`Server is listening on port ${port}`));
