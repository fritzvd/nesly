var TOKENS = require('../tokens')

function splitAndTab (body) {
  var splitAtBreak = body.source().split('\n')
  if (splitAtBreak.length > 1) {
    body.update(splitAtBreak.join('\n\t'))
  }
  return '\t' + body.source() + ''
}

function functionDeclaration (node) {
  var lines = []
  var fnname = node.id.name

  lines.push(fnname + ':')
  lines = lines.concat(node.body.body.map(splitAndTab))
  console.log(functionDeclaration, fnname)
  TOKENS[fnname] = function () {
    return '\t JMP ' + fnname
  }
  node.update(lines.join('\n'))
}

module.exports = functionDeclaration
