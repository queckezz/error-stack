
# error-stack

extracts useful information from an error stack. Currently this has only been tested with v8 error stacks.

## Installation

```bash
$ npm install error-stack
```

## Api

### #parse(Error)

parse an `Error`'s stack object and returns a stack.

## Example

```js
var err = new Error('Oh noes!')
var stack = stack.parse(err)
```

transforms

```
Error: Oh noes!
    at Suite.<anonymous> (/home/queckezz/dev/tmp/test/test/index.js:10:13)
    at context.describe.context.context (/home/queckezz/dev/tmp/test/node_modules/mocha/lib/interfaces/bdd.js:74:10)
    at Object.<anonymous> (/home/queckezz/dev/tmp/test/test/index.js:8:1)
    at Module._compile (module.js:449:26)
    ...
```

into something more usable

```json
[
  {
    "call": "Suite.<anonymous>",
    "file": "/home/queckezz/dev/tmp/test/test/index.js",
    "row": "10",
    "col": "13"
  },
  {
    "call": "context.describe.context.context",
    "file": "/home/queckezz/dev/tmp/test/node_modules/mocha/lib/interfaces/bdd.js",
    "row": "74",
    "col": "10"
  },
  {
    "call": "Object.<anonymous>",
    "file": "/home/queckezz/dev/tmp/test/test/index.js",
    "row": "8",
    "col": "1"
  },
  {
    "call": "Module._compile",
    "file": "module.js",
    "row": "449",
    "col": "26"
  },
  ...
]
```

## Todo

* Handle multiple Error objects (ReferenceEror, RangeError, ...)
* Maybe extract node specific functions
* Support safari, firefox stacks

## License

The [MIT](http://opensource.org/licenses/MIT) License &copy; 2014, Fabian Eichenberger