// Flags: --no-warnings
// The flag suppresses stderr output but the warning event will still emit
'use strict';

const common = require('../common');
const events = require('events');
const assert = require('assert');

const e = new events.EventEmitter();
e.setMaxListeners(1);

process.on('warning', common.mustCall((warning) => {
  assert.ok(warning instanceof Error);
  assert.strictEqual(warning.name, 'MaxListenersExceededWarning');
  assert.strictEqual(warning.emitter, e);
  assert.strictEqual(warning.count, 2);
  assert.strictEqual(warning.type, 'event-type');
}));

e.on('event-type', function() {});
e.on('event-type', function() {});
