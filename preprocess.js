/**
 * nesasm and nesly-assemboler
 * don't handle global defines (yet)
 *
 * This function replaces all occurences of variables with the address.
 * e.g.
 * `MYVARIABLE = $2004
 *
 * lda #1
 * sta MYVARIABLE
 *`
 * becomes:
 * `
 * lda #1
 * sta $2004
 * `
 */
function preprocess (file) {
  tokens = {}

  var fileLines = file.split('\n')
  var onlyLinesWithDefineStatements = fileLines.filter(
    function (line) { return line.match('=') }
  )

  // populate the tokens dict
  onlyLinesWithDefineStatements.map(buildTokens)

  function buildTokens(line) {
    var splitLine = line.split('=');
    tokens[splitLine[0].trim()] = splitLine[1].trim()
  }

  var intermediate = fileLines.filter(function (line) {
    return onlyLinesWithDefineStatements.indexOf(line) < 0;
  }).join('\n')

  var output = intermediate
  Object.keys(tokens).map(function (token) {
    console.log(token)
    output = output.replace(new RegExp(token, 'g'), tokens[token])
  })
  return output;
}

module.exports = preprocess
