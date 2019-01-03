const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const { generateMsg } = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

app.use('/', express.static(publicPath));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('new message', generateMsg('Admin', 'Welcome to Chat me up!'));

  socket.broadcast.emit('new message', generateMsg('Admin', 'Someone has joined the room'));

  socket.on('create message', (msg, cb) => {
    console.log(`new message from ${msg.from}: ${msg.text}`);
    io.emit('new message', {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime(),
    });
    cb('This is from the server');
  });

  socket.on('create location message', (msg, cb) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${msg.latitude},${msg.longitude}`;

    io.emit('new location message', {
      from: msg.from,
      url,
      createdAt: new Date().getTime(),
    });

    cb('This is from the server');
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

http.listen(port, () => console.log(`Server is listening on port ${port}`));
