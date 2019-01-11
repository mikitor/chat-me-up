const moment = require('moment');

const date = moment();
date.add(2, 'y').subtract(20, 'd');
const formatted = date.format('MMM Do YYYY HH:mm:ss a');

console.log(formatted);

// 10:35 am

const currentDate = moment();
const hourFormatted = currentDate.format('h:mm a');
console.log(hourFormatted);
