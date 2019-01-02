const path = require('path');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

app.get('/', (req, res) => {
  res.sendFile(publicPath + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

http.listen(port, () => console.log(`Server is listening on port ${port}`));
