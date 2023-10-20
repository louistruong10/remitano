export const formatCurrency = (value: number) => {
  return Intl.NumberFormat("en-US", {
    useGrouping: true,
  }).format(value)
}
