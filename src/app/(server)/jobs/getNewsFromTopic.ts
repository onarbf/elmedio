import { BingNewsArticle } from '@/types'
import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'

async function getNewsFromTopic(topic: string) {
  try {
    const response = await fetch(
      `${process.env.BING_NEWS_ENDPOINT}?q=${encodeURIComponent(topic)}&cc=es-ES&count=5&freshness=Day`,
      {
        headers: { 'Ocp-Apim-Subscription-Key': process.env.BING_NEWS_APIKEY_1! },
      },
    )

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()

    const articles: BingNewsArticle[] = data.value.map((article: any) => ({
      name: article.name,
      url: article.url,
      description: article.description,
      datePublished: article.datePublished,
      provider: article.provider,
    }))

    return buildResponse({ data: articles })
  } catch (error) {
    throw serverError(error)
  }
}

export default getNewsFromTopic
