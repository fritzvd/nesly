const expressionStatement = require('./lib/transformers/expressionStatement')
const functionDeclaration = require('./lib/transformers/functionDeclaration')
const variableDeclarator = require('./lib/transformers/variableDeclarator')
const whileStatement = require('./lib/transformers/whileStatement')

const TYPES = {
  'ExpressionStatement': expressionStatement,
  'FunctionDeclaration': functionDeclaration,
  'WhileStatement': whileStatement,
  'VariableDeclarator': variableDeclarator
}

module.exports = TYPES
