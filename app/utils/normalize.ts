const keyLabels: Record<string, string> = {
  amount: 'Сумма',
  completed: 'Завершено',
  completed_orders: 'Завершенные заказы',
  count: 'Количество',
  orders: 'Заказы',
  queue_count: 'Элементы очереди',
  revenue: 'Выручка',
  total_amount: 'Итоговая сумма',
  total_clients: 'Всего клиентов',
  total_revenue: 'Общая выручка'
}

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
  if (keyLabels[key]) {
    return keyLabels[key]
  }

  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase())
}
