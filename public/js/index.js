var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const text = document.querySelector('#m').value;
  socket.emit('create message', {
    from: 'anomymous user',
    text,
  }, function (data) {
    console.log(data);
  });
  this.reset();
  return false;
});

socket.on('new message', function (msg) {
  const messages = document.querySelector('#messages');
  const newLi = document.createElement('li');
  newLi.textContent = `${msg.from} - ${msg.text}`;
  messages.appendChild(newLi);
});
