
'use strict'

/**
 * Module dependencies.
 */

let arr = require('array-iterator')

/**
 * Regex to parse stack lines into an object.
 */

let re = /at (?:(.*) \()?([^:]*)(?::(\d+):(\d+))?\)?/

/**
 * Export `parse`.
 */

module.exports = parse

/**
 * Parse `err`.
 *
 * @param {Error} err
 * @return {Object} error
 * @api public
 */

function parse (err) {
  let stack = format(err.stack)

  let error = {
    name: err.name,
    msg: err.message,
    stack: []
  }

  for (let line of arr(stack)) {
    let caps = re.exec(line)

    error.stack.push({
      call: caps[1],
      file: caps[2],
      row: caps[3],
      col: caps[4]
    })
  }

  return error
}

/**
 * Format stack into lines and remove cruft
 *
 * @param {String} stack
 * @return {String} stack
 * @api private
 */

function format (stack) {
  // split into lines
  stack = stack.split(/\n+/)

  // remove `Error: <name>`
  stack.shift()

  return stack
}