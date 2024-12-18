export default function dateFormatter({
  date,
  options,
}: {
  date: Date | string | null | undefined
  options?: any
}) {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  if (date === null || date === undefined) {
    return 'no date'
  }

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()

  return `${day}/${month}/${year}`
}
