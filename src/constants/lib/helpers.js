const formatImg = (str, size = 400) => {
  str = str.replace("{width}", size.toString());
  str = str.replace("{height}", size.toString());
  return str;
};

module.exports = {
  formatImg,
};
