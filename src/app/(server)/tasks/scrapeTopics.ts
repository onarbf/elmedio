import * as cheerio from 'cheerio'

function scrapeEfe(html: string): string[] {
  const $ = cheerio.load(html)

  const titles: string[] = []

  $('.entry-title').each((_, element) => {
    titles.push($(element).text().trim())
  })

  return titles
}

export async function scrapeTopics() {
  try {
    console.log('running')
    const res = await fetch('https://efe.com/espana/')

    if (!res.ok) {
      return { error: 'error', status: res.status }
    }
    const html = await res.text()
    const titles = scrapeEfe(html)
    return { titles }
  } catch (error) {
    return { error }
  }
}
