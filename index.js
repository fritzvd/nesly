var falafel = require('falafel')
const TYPES = require('./lib/types')

function compiler (node) {
  if (TYPES[node.type]) {
    TYPES[node.type](node)
  }
}

module.exports.compile = function (file) {
  var output = falafel(file, compiler)
  return output
}
