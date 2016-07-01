const TOKENS = require('../tokens')
const vars = require('../vars')

/**
 * AssignmentExpression can be something like this
 * x = x + 1
 * This is a node with a child node left and right
 * left: x
 * right: x + 1
 *
 * The right node has an operator and a value left and right of the operator.
 *
 */
module.exports = function (node) {
  if (node.type === 'AssignmentExpression') {
    var varName = node.left.name
    var operator = node.right.operator

    // var leftValue = node.right.left.value || node.right.left.name
    if (node.right.right) {
      var value = node.right.right.value || node.right.left.value
    }

    if (vars[varName]) {
      if (operator === '+')
      var addition = TOKENS['addition']
      node.update(addition(vars[varName], value))
    }
  }
}
