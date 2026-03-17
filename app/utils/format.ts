export function formatDateTime(value?: string | null) {
  if (!value) {
    return 'Not available'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}

export function formatMoney(value?: number | string | null, currency = 'UZS') {
  const amount = Number(value || 0)

  return new Intl.NumberFormat('en-US', {
    currency,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
    style: 'currency'
  }).format(Number.isFinite(amount) ? amount : 0)
}

export function formatCount(value?: number | string | null) {
  const amount = Number(value || 0)

  return new Intl.NumberFormat('en-US').format(Number.isFinite(amount) ? amount : 0)
}

export function formatPercent(value?: number | string | null) {
  const amount = Number(value || 0)

  return `${amount.toFixed(1)}%`
}
