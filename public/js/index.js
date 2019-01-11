const socket = io();

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

    socket.emit('create location message', {
      from: 'User',
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
