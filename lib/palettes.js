const adresses = require('./adresses')

var paletteData = {}

paletteData.bg = '\t.db $22,$29,$1A,$0F,$22,$36,$17,$0F,$22,$30,$21,$0F,$22,$27,$17,$0F'
paletteData.sprite = '\t.db $0F,$16,$27,$18,$22,$02,$38,$3C,$22,$1C,$15,$14,$22,$02,$38,$3C'

function setLowHighBytes (bytes) {
  bytes = bytes || adresses.backgroundPalette

  const high = '#$' + bytes.slice(0, 2)
  const low = '#$' + bytes.slice(2)
  return [
    '\tlda $2002',
    '\tlda ' + high,
    '\tsta $2006',
    '\tlda ' + low,
    '\tsta $2006'
  ].join('\n')
}

function PaletteData (palData, palName) {

  return ['PaletteData:',
    paletteData.bg,
    paletteData.sprite
  ].join('\n')
}

function loadPalette () {
  return [
    '\tldx #$00',
    'LoadPalettesLoop:',
    '\tlda PaletteData, x',
    '\tsta $2007',
    '\tinx',
    '\tcpx #$20',
    '\tbne LoadPalettesLoop'
  ].join('\n')
}

module.exports.loadPalettes = function () {
  return [
    setLowHighBytes(),
    loadPalette()
  ].join('\n')
}

module.exports.setBgPalette = function () {
  const palData = arguments[0];
  paletteData.bg = '\t.db ' + palData;
}

module.exports.setSpritePalette = function () {
  const palData = arguments[0];
  paletteData.sprite = '\t.db ' + palData;
}

module.exports.PaletteData = PaletteData
