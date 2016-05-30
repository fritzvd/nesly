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

  node.update(label + '.db\t' + updatedValue)
}

module.exports = variableDeclarator
