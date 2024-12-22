interface NewsArticle {
  name: string
  url: string
  description: string
  datePublished: string
  provider: { name: string }[]
}

async function getNewsFromTopic(topic: string): Promise<NewsArticle[]> {
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

    const articles: NewsArticle[] = data.value.map((article: any) => ({
      name: article.name,
      url: article.url,
      description: article.description,
      datePublished: article.datePublished,
      provider: article.provider,
    }))

    return articles
  } catch (error) {
    console.error('Error fetching news:', error)
    throw new Error('Failed to fetch news')
  }
}

export default getNewsFromTopic
