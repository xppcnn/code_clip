var count = 3;

var addCount = () => {
  count++;
};

var getCount = () => {
  return count;
};

module.exports = {
  count,
  addCount,
  getCount,
};
