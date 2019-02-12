const isAcceptedString = (value) => {
  return typeof value === 'string' && value.trim().length > 0;
};

module.exports = {
  isAcceptedString,
};
