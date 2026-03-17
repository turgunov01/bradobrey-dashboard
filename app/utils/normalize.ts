export function asArray<T>(value: T[] | { items?: T[] } | null | undefined) {
  if (Array.isArray(value)) {
    return value
  }

  if (Array.isArray(value?.items)) {
    return value.items
  }

  return []
}

export function asNumber(value: unknown, fallback = 0) {
  const amount = Number(value)
  return Number.isFinite(amount) ? amount : fallback
}

export function pickValue(source: Record<string, any> | null | undefined, keys: string[], fallback: string) {
  for (const key of keys) {
    const value = source?.[key]

    if (value !== undefined && value !== null && value !== '') {
      return String(value)
    }
  }

  return fallback
}

export function toKeyLabel(key: string) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase())
}
