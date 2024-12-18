export default function dateFormatter({ date, options }: { date: Date | string; options?: any }) {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  console.log('yeyu')
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()

  return `${day}/${month}/${year}`
}
