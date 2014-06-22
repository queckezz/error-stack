
'use strict'

var assert = require('assert')
var stack = require('../lib')
var type = require('component-type')

describe('error-parse', function () {
  var msg = 'Bad Error!'
  var err = new Error(msg)
  var error = stack.parse(err)
  console.log(JSON.stringify(error.stack, null, 2));

  it('should have a name and msg', function () {
    assert.equal('Error', error.name)
    assert.equal(msg, error.msg)
  })

  it('should have a stack with information', function () {
    var stack = error.stack
    assert.equal(type(stack), 'array')
    assert(stack.length >= 1)
  })

  it('should parse err lines with call, file, pos', function () {
    // fake err
    err = {
      name: 'Error',
      message: 'oh noes!',
      stack: 'Error: aw\n  at exports.runInThisContext (vm.js:69:16)'
    }

    error = stack.parse(err)
    var line = error.stack[0]
    assert.equal(line.call, 'exports.runInThisContext')
    assert.equal(line.file, 'vm.js')
    assert.equal(line.row, '69')
    assert.equal(line.col, '16')
  })

  it('should parse err lines with file, pos', function () {
    // fake err
    err = {
      name: 'Error',
      message: 'oh noes!',
      stack: 'Error: aw\n  at vm.js:69:16'
    }

    error = stack.parse(err)
    var line = error.stack[0]
    assert.equal(line.file, 'vm.js')
    assert.equal(line.row, '69')
    assert.equal(line.col, '16')
  })
})