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
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${day}/${month}/${year}`
}
