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


/**
  * stolen from shiru's c examples
  * UNRLE unpacks the run-length encoded background
  * directly into vram.
  * this can be with or without attribute tables
  *
  * The way rle works is as follows:
  * Repeated values are compressed to only show the value and the amount of
  * repeats
  * To seperate value from the repeat amount a tag is used.
  *
  * The encoding starts with start-tag (ST) and ends with a tag and then 0x00 (zero)
  *
  * example: 1,1,15,15,15,4,3,2,1 would be encoded as (let's say tag is 0x02)
  * T = tag
  * VL = value
  * RP = repeater
  * EZ = end zero
  *
  *  T     V   T    R    V    T    R    V    V    V    V    T    EZ
  * 0x02,0x01,0x02,0x02,0x0f,0x02,0x03,0x04,0x03,0x02,0x01,0x02, 0x00
  *
  * The popax method is inspired from cc65 to get the next stack pointer
  */
function defineUnRLE () {
  return `
  popax:
    pla						          ; get hi byte
    tax                     ; into x
  	pla											; get lo byte

  _unrle_vram:
  	stx $2006
  	sta $2006

  	jsr popax
  	sta RLE_LOW
  	stx RLE_HIGH

  	ldy #0
  	jsr rle_byte
  	sta RLE_TAG
  unrle_1:
  	jsr rle_byte
  	cmp RLE_TAG
  	beq unrle_2
  	sta $2007
  	sta RLE_BYTE
  	bne unrle_1
  unrle_2:
  	jsr rle_byte
  	cmp #0
  	beq unrle_4
  	tax
  	lda RLE_BYTE
  unrle_3:
  	sta $2007
  	dex
  	bne unrle_3
  	beq unrle_1
  unrle_4:
  	rts

  rle_byte:
  	lda RLE_LOW,y
  	inc RLE_LOW
  	bne rle_byte_1
  	inc RLE_HIGH
  rle_byte_1:
  	rts
`
}

function defineGlobals () {
  return `
  PPU_CTRL = $2000
  PPU_MASK = $2001
  PPU_STATUS = $2002
  PPU_OAM_ADDR = $2003
  PPU_OAM_DATA = $2004
  PPU_SCROLL = $2005
  PPU_ADDR = $2006
  PPU_DATA = $2007
  PPU_OAM_DMA = $4014
  PPU_FRAMECNT = $4017
  DMC_FREQ = $4010
  CTRL_PORT1 = $4016
  CTRL_PORT2 = $4017

  OAM_BUF = $0200
  PAL_BUF = $01c0

  TEMP:		.rs 11
  PAD_BUF: 	.db 0

  PTR:			.db 0
  LEN:			.db 0
  NEXTSPR:  .db 0
  SCRX:			.db 0
  SCRY:    	.db 0
  SRC:			.db 0
  DST:			.db 0

  RLE_LOW:  .db 0
  RLE_HIGH:	.db 0
  RLE_TAG: 	.db 0
  RLE_BYTE: .db 0
  `
}


module.exports.defineUnRLE = defineUnRLE
module.exports.defineGlobals = defineGlobals
module.exports.reset = reset
module.exports.vec = vec
module.exports.vblankwait = vblankwait
module.exports.clrmem = clrmem
