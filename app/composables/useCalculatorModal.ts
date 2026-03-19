export function useCalculatorModal() {
  const calculatorOpen = useState('dashboard-calculator-open', () => false)

  function openCalculator() {
    calculatorOpen.value = true
  }

  function closeCalculator() {
    calculatorOpen.value = false
  }

  function toggleCalculator() {
    calculatorOpen.value = !calculatorOpen.value
  }

  return {
    calculatorOpen,
    closeCalculator,
    openCalculator,
    toggleCalculator
  }
}
