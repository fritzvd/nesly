const bank = require('./banking')
var spriteData = []

module.exports.setChrLocation = function (data) {
  const location = data[0]
  return bank([2, '$0000', '\t.incbin "' + location + '"'])
}

function setLowHighBytes () {
  return [
    '\tlda #$00',
    '\tsta $2003',
    '\tlda #$02',
    '\tsta $4014'
  ].join('\n')
}

function loadSprites () {
  return [
    'LoadSprites:',
    '\tldx #$00',
    'LoadSpritesLoop:',
    '\tlda sprites, x',
    '\tsta $0200, x',
    '\tinx',
    '\tcpx #$10',
    '\tbne LoadSpritesLoop'
  ].join('\n')
}

function addData (data) {
  var x = data.x
  var y = data.y
  var tile = data.tile
  var attr = data.attr

  var sprite = '\t.db $' +
    y +
    ', ' +
    tile +
    ', $' +
    attr +
    ', $' +
    x
  spriteData.push(sprite)
}

/**
'\t.db $80, $32, $00, $80',
'\t.db $80, $33, $00, $88',
'\t.db $88, $34, $00, $80',
'\t.db $88, $35, $00, $88'
*/
function sData () {
  var out = 'sprites:\n'
  out += spriteData.join('\n')
  return out
}

function moveRight () {
  return [
    '\tlda $0203',
    '\tclc',
    '\tadc #$01',
    '\tsta $0203',

    '\tlda $0207',
    '\tclc',
    '\tadc #$01',
    '\tsta $0207',

    '\tlda $020B',
    '\tclc',
    '\tadc #$01',
    '\tsta $020B',

    '\tlda $020F',
    '\tclc',
    '\tadc #$01',
    '\tsta $020F'
  ].join('\n')
}

function moveLeft () {
  return [
    '\tlda $0203',
    '\tsec',
    '\tsbc #$01',
    '\tsta $0203',

    '\tlda $0207',
    '\tsec',
    '\tsbc #$01',
    '\tsta $0207',

    '\tlda $020B',
    '\tsec',
    '\tsbc #$01',
    '\tsta $020B',

    '\tlda $020F',
    '\tsec',
    '\tsbc #$01',
    '\tsta $020F'
  ].join('\n')
}

function moveDown () {
  return [
    '\tlda $0200',
    '\tclc',
    '\tadc #$01',
    '\tsta $0200',

    '\tlda $0204',
    '\tclc',
    '\tadc #$01',
    '\tsta $0204',

    '\tlda $0208',
    '\tclc',
    '\tadc #$01',
    '\tsta $0208',

    '\tlda $020C',
    '\tclc',
    '\tadc #$01',
    '\tsta $020C'
  ].join('\n')
}

function moveUp () {
  return [
    '\tlda $0200',
    '\tsec',
    '\tsbc #$01',
    '\tsta $0200',

    '\tlda $0204',
    '\tsec',
    '\tsbc #$01',
    '\tsta $0204',

    '\tlda $0208',
    '\tsec',
    '\tsbc #$01',
    '\tsta $0208',

    '\tlda $020C',
    '\tsec',
    '\tsbc #$01',
    '\tsta $020C'

  ].join('\n')
}

module.exports.loadSprites = loadSprites
module.exports.sData = sData
module.exports.setLowHighBytes = setLowHighBytes
module.exports.moveRight = moveRight
module.exports.moveLeft = moveLeft
module.exports.moveUp = moveUp
module.exports.moveDown = moveDown
module.exports.addData = addData
