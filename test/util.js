let assert = require('assert');

let Graph = require('../src/graph');

class TestGraph {

  constructor(schema) {
    this._messages = null;
    this.g = new Graph(schema, {
      log: (...args) => this._messages.push([...args].join(' ')),
    });
  }

  check(lid, expected, options) {
    assert.deepStrictEqual(this.g.get(lid, options), expected);
  }

  checkLookup(field, value, expected, options) {
    assert.deepStrictEqual(this.g.lookup(field, value, options), expected);
  }

  expectMessage(substr, f) {
    this._messages = [];
    f();
    if (this._messages.length !== 1) {
      throw new Error('Expected a message');
    }
    if (this._messages[0].indexOf(substr) === -1) {
      throw new Error('Expected message containing ' +
          JSON.stringify(substr) + ', but got: ' +
          JSON.stringify(this._messages[0]));
    }
    this._messages = null;
  }

}

module.exports = {TestGraph};