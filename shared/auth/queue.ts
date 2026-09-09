import {
  employeeRolePermissionPresets,
  type EmployeePermission,
  type EmployeeRole
} from './employees'

type QueueAccessUser = {
  role?: unknown
  permissions?: unknown
}

function getPermissions(user: QueueAccessUser): Set<EmployeePermission> {
  const explicitPermissions = Array.isArray(user.permissions)
    ? user.permissions.filter((permission): permission is EmployeePermission => permission === 'queue.read' || permission === 'queue.manage.branch' || permission === 'queue.manage.self')
    : []

  if (explicitPermissions.length) {
    return new Set(explicitPermissions)
  }

  const role = String(user.role ?? '').trim().toLowerCase() as EmployeeRole
  return new Set(employeeRolePermissionPresets[role] || [])
}

export function canReadQueue(user: QueueAccessUser) {
  return getPermissions(user).has('queue.read')
}

export function canManageBranchQueue(user: QueueAccessUser) {
  return getPermissions(user).has('queue.manage.branch')
}
