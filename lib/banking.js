function bank (args) {
  var n = args[0]
  var loc = args[1]
  var code = args[2]

  var output = []
  output.push('\t.bank ' + n)
  output.push('\t.org ' + loc)
  output.push(code)
  return output.join('\n')
}

module.exports = bank
