var falafel = require('falafel')
const TYPES = require('./lib/types')
const operators = require('./lib/operators')
const preprocess = require('./preprocess')

function compiler (node) {
  if (TYPES[node.type]) {
    TYPES[node.type](node)
  }
}

module.exports.compile = function (file) {
  // var preprocessed = preprocess(file)
  // console.log(preprocessed)
  var output = falafel(file, compiler)
  return output
}
