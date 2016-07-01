var test = require('tap').test
var operators = require('../lib/operators')

test('Make sure we can do addition', function (t) {

  t.equal('LDA var_x\nCLC\nADC #$0a\nSTA var_x',
    operators.addition('var_x', 10),
    'Expected hello world')
  t.end()
})
