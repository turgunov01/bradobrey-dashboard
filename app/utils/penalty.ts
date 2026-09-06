export function calculateMinutePenalty(minutes: number, rate: number) {
  if (!Number.isFinite(minutes) || !Number.isFinite(rate) || minutes < 0 || rate < 0) return 0
  return Math.round(minutes * rate * 100) / 100
}
