const TYPES = require('../types')

function whileStatement (node) {
  var body = node.body.body
  var output = body.map(function (node) {
    if (TYPES[node.type]) {
      TYPES[node.type](node)
    }
    return node.source().split('\n').join('\n\t') // prepend with extra tab
  })

  node.update([
    'Forever:',
    output.join('\n'),
    '\t JMP Forever'
  ].join('\n'))
}

module.exports = whileStatement
