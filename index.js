var fs = require('fs')
var falafel = require('falafel')

var std = require('./lib/std')
var header = require('./lib/header')
var bank = require('./lib/banking')
var palette = require('./lib/palettes')
var sprites = require('./lib/sprites')
var bg = require('./lib/bg.js')
var joy = require('./lib/joy')

var TOKENS = {
  'reset': std.reset,
  'vec': std.vec,
  'vblankwait': std.vblankwait,
  'clrmem': std.clrmem,
  'header': header,
  'bank': bank,
  'loadPalettes': palette.loadPalettes,
  'setSpritePalette': palette.setSpritePalette,
  'setBgPalette': palette.setBgPalette,
  'PaletteData': palette.PaletteData,
  'pData': palette.pData,
  'addData': sprites.addData,
  'loadSprites': sprites.loadSprites,
  'sData': sprites.sData,
  'setLowHighBytes': sprites.setLowHighBytes,
  'moveRight': sprites.moveRight,
  'moveLeft': sprites.moveLeft,
  'moveUp': sprites.moveUp,
  'moveDown': sprites.moveDown,
  'enableBg': bg.enableBg,
  'loadAttribute': bg.loadAttribute,
  'addBg': bg.addBgRow,
  'loadBg': bg.loadBg,
  'write': bg.write,
  'attributeTable': bg.attributeTable,
  'loadNametable': bg.loadNametable,
  'joyInit': joy.init,
  'joyRead': joy.read,
  'setChrLocation': sprites.setChrLocation,
  'asm': function (exp) { return exp; }
}

function expressionStatement (node) {
  var callee = node.expression.callee
  var args = []
  var name
  var fn
  var o

  var argumentFn = function (arg) {
    var value

    if (arg.type === 'ArrayExpression' && callee.name.indexOf('Palette') > 0 ) {
      value = ''

      var original = arg.source()
      value = original
                .replace(/(\n*)(\[*)(\]*)(\ *)/g, '')
                .replace(/0x/g, '$$')
                .toUpperCase()

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
        delete o
      } else {
        node.update(fn(args))
      }
    } else {
      var msg = 'There is no way to interpret this JS statement as ASM: ' + name
      throw new Error(msg)
    }
  }
}

function variableDeclarator (node) {
  var name = node && node.id && node.id.name
  var value = node && node.init && node.init.value
  var label = 'var_' + name + ':\t'

  var updatedValue

  switch (value) {
    case true:
      updatedValue = 1
      break
    case false:
      updatedValue = 0
      break
    default:
      updatedValue = value
  }

  if (node.parent && node.parent.kind === 'var') {
    node.parent.update('')
  }

  node.update(label + '.db\t' + updatedValue)
}

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

var TYPES = {
  'ExpressionStatement': expressionStatement,
  'FunctionDeclaration': functionDeclaration,
  'WhileStatement': whileStatement,
  'VariableDeclarator': variableDeclarator
}

function compiler (node) {
  if (TYPES[node.type]) {
    TYPES[node.type](node)
  }
}

module.exports.compile = function (file) {
  var output = falafel(file, compiler)
  return output
}
