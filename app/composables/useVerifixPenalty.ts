export function useVerifixPenalty() {
  const api = useVerifixApi()
  return useAsyncData('verifix-penalty-settings', () => api.settings())
}
