const generateMsg = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

const generateLocationMsg = (from, latitude, longitude) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  return {
    from,
    url,
    createdAt: new Date().getTime()
  };
};

module.exports = {
  generateMsg,
  generateLocationMsg
};
