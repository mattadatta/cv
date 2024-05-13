export function formatMonthAndYear(dateString: string): string {
  const [year, month, _day] = dateString.split('-')
  const monthName = new Date(`${month}/1/${year}`).toLocaleString('en-US', { month: 'short' })
  return `${monthName} ${year}`
}

export function formatYear(dateString: string): string {
  const [year, _month, _day] = dateString.split('-');
  return year
}
