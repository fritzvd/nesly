const TOKENS = require('../tokens')

function expressionStatement (node) {
  var callee = node.expression.callee
  var args = []
  var name
  var fn
  var o

  var argumentFn = function (arg) {
    var value

    if (arg.type === 'ArrayExpression') {
      value = ''

      var original = arg.source()
      value = original
                .replace(/(\n*)(\[*)(\]*)( *)/g, '')
                .replace(/0x/g, '$$')
                .toUpperCase()

      // console.log('\n\n\n\n\n' + value +'\n\n\n\n\n')
      args.push(value)
    } else if (arg.type === 'ObjectExpression') {
      value = {}
      arg.properties.forEach(function (p) {
        var k = p.key.name
        var v

        if (p.value.type === 'Identifier') {
          v = TOKENS[p.value.name]
        } else {
          v = p.value.value
        }

        value[k] = v
        o = value
      })
    } else {
      if (arg.name) {
        if (TOKENS[arg.name]) {
          value = TOKENS[arg.name]
        }
      } else {
        value = arg.value
      }
      args.push(value)
    }
  }

  if (callee && callee.name) {
    name = callee.name
  }

  if (name) {
    fn = TOKENS[name]
    callee.parent.arguments.forEach(argumentFn)

    if (fn) {
      if (o) {
        node.update(fn(o))
        // delete o // eslint-disable-line no-delete-var
        o = null
      } else {
        node.update(fn(args))
      }
    } else {
      var msg = 'There is no way to interpret this JS statement as ASM: ' + name
      throw new Error(msg)
    }
  }
}

module.exports = expressionStatement
