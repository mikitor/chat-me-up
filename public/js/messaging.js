const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
  const props = new URLSearchParams(window.location.search);
  const room = props.get('room');
  const name = props.get('name');
  socket.emit('join', { name, room }, function (e) {
    if (e) {
      alert(e);
      window.location.href = '/';
    } else {
      console.log('Ok');
    }
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const text = document.querySelector('#m').value;
  socket.emit('sendMsg', {
    text,
  });
  this.reset();
  return false;
});

socket.on('receiveMsg', function (msg) {
  const messages = document.querySelector('#messages');
  const newLi = document.createElement('li');
  const ago = moment(msg.createdAt).format('LTS');
  newLi.textContent = `${ago} ${msg.from} - ${msg.text}`;
  messages.appendChild(newLi);
});

document.querySelector('#location').addEventListener('click', function geoFindMe() {
  const output = document.querySelector('#m');
  const locationButton = document.querySelector('#location');

  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    return;
  }

  output.value = 'Locating...';
  locationButton.disabled = true;
  locationButton.textContent = 'Locating...';

  navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude, longitude } = position.coords;

    socket.emit('sendLocationMsg', {
      latitude,
      longitude,
    }, function (data) {
      console.log(data);
      output.value = '';
      locationButton.disabled = false;
      locationButton.textContent = 'Send location';
    });
  }, function (err) {
    alert('Unable to retrieve your location');
  });
});

socket.on('new location message', function (msg) {
  const messages = document.querySelector('#messages');
  const newLi = document.createElement('li');
  const newLink = document.createElement('a');
  const ago = moment(msg.createdAt).format('LTS');

  newLink.target = '_blank';
  newLink.href = msg.url;
  newLink.textContent = 'I am here 📍';

  newLi.textContent = `${ago} ${msg.from}: `;
  newLi.appendChild(newLink);

  messages.appendChild(newLi);
});

socket.on('updateActiveUsers', function (userList) {
  const users = document.querySelector('#users');
  const ol = document.createElement('ol');

  userList.forEach((user) => {
    const li = document.createElement('li');
    li.textContent = user;
    ol.appendChild(li);
  });

  users.innerHTML = '';
  users.appendChild(ol);
});
