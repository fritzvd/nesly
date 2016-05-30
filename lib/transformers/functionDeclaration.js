let TOKENS = require('../tokens')

function functionDeclaration (node) {
  var lines = []
  var fnname = node.id.name

  lines.push(fnname + ':')
  node.body.body.forEach(function (fnbody) {
    lines.push('\t' + fnbody.source() + '')
  })
  TOKENS[fnname] = function () {
    return '\t JMP ' + fnname
  }
  node.update(lines.join('\n'))
}

module.exports = functionDeclaration
