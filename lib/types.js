const assignmentExpression = require('./transformers/assignmentExpression')
const expressionStatement = require('./transformers/expressionStatement')
const functionDeclaration = require('./transformers/functionDeclaration')
const variableDeclarator = require('./transformers/variableDeclarator')
const whileStatement = require('./transformers/whileStatement')

const TYPES = {
  'AssignmentExpression': assignmentExpression,
  'ExpressionStatement': expressionStatement,
  'FunctionDeclaration': functionDeclaration,
  'WhileStatement': whileStatement,
  'VariableDeclarator': variableDeclarator
}

module.exports = TYPES
