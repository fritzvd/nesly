var vars = require('../vars')

function variableDeclarator (node) {
  var name = node && node.id && node.id.name
  var value = node && node.init && node.init.value
  vars[name] = 'var_' + name
  var label = vars[name] + ':\t'


  var updatedValue

  switch (value) {
    case true:
      updatedValue = 1
      break
    case false:
      updatedValue = 0
      break
    default:
      updatedValue = '#$' + parseInt(value).toString(16)
  }

  if (node.parent && node.parent.kind === 'var') {
    node.parent.update('')
  }

  node.update(label + '.db\t' + updatedValue)
}

module.exports = variableDeclarator
