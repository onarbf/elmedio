import { JSDOM } from 'jsdom'
import { Readability } from '@mozilla/readability'
import { BingNewsArticle, ServerError, ServerResponse } from '@/types'
import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'

type Article = { title?: string; content?: string; url?: string }

export default async function scrapeNews({
  article,
}: {
  article: BingNewsArticle
}): Promise<ServerResponse<Article>> {
  const { url } = article

  if (!url) {
    throw new Error('No hay URL para el artículo')
  }

  try {
    const response = await fetch(url)
    const html = await response.text()

    // Parsear el HTML con JSDOM
    const dom = new JSDOM(html, { url })
    const reader = new Readability(dom.window.document)
    const article = reader.parse()

    if (article) {
      console.log('wtf', article)
      return buildResponse({
        status: 200,
        data: { title: article.title, content: article.content, url },
      })
    }
    return buildResponse({
      status: 400,
      data: { titlte: '', content: '', url },
    })
  } catch (error) {
    throw serverError(error)
  }
}
