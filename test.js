#!/usr/bin/env node

const assert = require('assert');

const Haversine = require('./haversine');

const h = new Haversine({ unit: 'km' });
const start = { latitude: 52, longitude: 11 };
const end = { latitude: 53, longitude: 11 };
let d = h.distance(start, end);
let tc = h.targetCoordinates(start, { distance: d, heading: 0 });


assert.ok(typeof d === 'number');
assert.ok(typeof tc === 'object');

assert.equal(180, h.toDeg(Math.PI));
assert.equal(Math.PI, h.toRad(180));

for(let key in tc) {
  tc[key] = Math.round(tc[key] * 1e2) / 1e2;
}

assert.deepEqual(end, tc);
