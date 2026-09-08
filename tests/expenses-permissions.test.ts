import { test } from 'node:test'
import assert from 'node:assert/strict'

import { employeeRolePermissionPresets } from '../shared/auth/employees.ts'

test('manager can read and create expenses but barber cannot', () => {
  const manager = employeeRolePermissionPresets.manager
  const barber = employeeRolePermissionPresets.barber

  assert.equal(manager.includes('expenses.read'), true)
  assert.equal(manager.includes('expenses.create'), true)
  assert.equal(barber.includes('expenses.read'), false)
  assert.equal(barber.includes('expenses.create'), false)
})

test('admin and super-manager have full expense permissions', () => {
  for (const role of ['admin', 'super-manager'] as const) {
    const permissions = employeeRolePermissionPresets[role]

    assert.equal(permissions.includes('expenses.read'), true)
    assert.equal(permissions.includes('expenses.create'), true)
    assert.equal(permissions.includes('expenses.update'), true)
    assert.equal(permissions.includes('expenses.delete'), true)
  }
})
