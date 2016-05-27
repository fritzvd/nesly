var bank = require('./banking')

function reset () {
  var code = [
    'RESET:',
    '\tsei',
    '\tcld',
    '\tldx #$40',
    '\tstx $4017',
    '\tldx #$FF',
    '\ttxs',
    '\tinx',
    '\tstx $2000',
    '\tstx $2001',
    '\tstx $4010'
  ].join('\n')

  return bank([0, '$C000', code])
}

function vec () {
  return [
    '\t.dw NMI',
    '\t.dw RESET',
    '\t.dw 0'
  ].join('\n')
}

function vblankwait (args) {
  var n = args[0]
  return [
    'vblankwait' + n + ':',
    '\tbit $2002',
    '\tbpl vblankwait' + n
  ].join('\n')
}

function clrmem () {
  return [
    'clrmem:',
    '\tlda #$00',
    '\tsta $0000, x',
    '\tsta $0100, x',
    '\tsta $0200, x',
    '\tsta $0400, x',
    '\tsta $0500, x',
    '\tsta $0600, x',
    '\tsta $0700, x',
    '\tlda #$FE',
    '\tsta $0300, x',
    '\tinx',
    '\tbne clrmem'
  ].join('\n')
}

module.exports.reset = reset
module.exports.vec = vec
module.exports.vblankwait = vblankwait
module.exports.clrmem = clrmem
