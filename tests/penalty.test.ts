import { test } from 'node:test'
import assert from 'node:assert/strict'
import { calculateMinutePenalty } from '../app/utils/penalty.ts'

test('uses a fixed editable rate independently of salary and shift duration', () => {
  assert.equal(calculateMinutePenalty(15, 1000), 15000)
  assert.equal(calculateMinutePenalty(15, 500), 7500)
  assert.equal(calculateMinutePenalty(15, 0), 0)
  assert.equal(calculateMinutePenalty(0, 1000), 0)
})
test('preserves currency precision and totals', () => {
  assert.equal(calculateMinutePenalty(3, 0.1), 0.3)
  assert.equal(calculateMinutePenalty(10, 12.25) + calculateMinutePenalty(5, 12.25), calculateMinutePenalty(15, 12.25))
})
