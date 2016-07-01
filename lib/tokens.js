var std = require('./std')
var header = require('./header')
var bank = require('./banking')
var palette = require('./palettes')
var sprites = require('./sprites')
var bg = require('./bg.js')
var joy = require('./joy')
var operators = require('./operators')

var TOKENS = {
  'defineGlobals': std.defineGlobals,
  'defineUnRLE': std.defineUnRLE,
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
  'defineBg': bg.defineBg,
  'loadBg': bg.loadBg,
  'write': bg.write,
  'unRLE': bg.unRLE,
  'attributeTable': bg.attributeTable,
  'loadNametable': bg.loadNametable,
  'joyInit': joy.init,
  'joyRead': joy.read,
  'setChrLocation': sprites.setChrLocation,
  'addition': operators.addition,
  'asm': function (exp) { return exp }
}

module.exports = TOKENS
