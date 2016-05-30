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
  'asm': function (exp) { return exp }
}

module.exports = TOKENS
