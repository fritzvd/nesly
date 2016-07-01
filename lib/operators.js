var leftpad = require('./utils').hexaleftpad
var operators = {}

operators.addition = function (item, amount) {
  return [
    'LDA ' + item,
    'CLC',
    'ADC #$' + leftpad(amount.toString(16)),
    'STA ' + item
  ].join('\n')
}

//
// LDA $0203
// CLC
// ADC #$01
// STA $0203


// ;
// ; spriteX++;
// ;
// 	lda     _spriteX
// 	ldx     _spriteX+1
// 	clc
// 	adc     #$01
// 	bcc     L066E
// 	inx
// L066E:	sta     _spriteX
// 	stx     _spriteX+1
//
// ; spriteX--;
// ;
// 	lda     _spriteX
// 	ldx     _spriteX+1
// 	sec
// 	sbc     #$01
// ;
// 	lda     _spriteX
// 	ldx     _spriteX+1
// 	sec
// 	sbc     #$01
// 	bcs     L0672
// 	dex
// L0672:	sta     _spriteX
// 	stx     _spriteX+1
// 	bcs     L0672
// 	dex
// L0672:	sta     _spriteX
// 	stx     _spriteX+1

module.exports = operators
