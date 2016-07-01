module.exports.hexaleftpad = function (str, length) {
  while (str.length < 2) {
    str = '0'.concat(str)
  }
  return str
}
