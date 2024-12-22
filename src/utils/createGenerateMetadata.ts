import getPosts from '@/app/(server)/tasks/getPosts'
import _ from '@/constants'
import { getTranslations } from 'next-intl/server'

export default function createGenerateMetadata({
  namespace,
  dynamic,
}: {
  namespace: string
  dynamic?: any
}) {
  return async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
    const { locale, slug } = await params
    let title = undefined
    let description = undefined
    if (slug) {
      if (dynamic.type === 'post') {
        const { data: posts } = await getPosts({
          options: {
            where: {
              slug: {
                equals: slug,
              },
            },
          },
        })
        title = `${_.metadata.title} | ${posts.docs[0].title}`
        description = ` ${posts.docs[0].subtitle}`
      }
    }

    const t = await getTranslations({ locale, namespace })

    return {
      title: title || t('title')?.trim() || _.metadata.title,
      description: description || t('description')?.trim() || _.metadata.description,
      alternates: _.metadata.alternates,
      keywords: t('keywords') || _.metadata.keywords || 'default, keywords',
      robots: 'index, follow',
      openGraph: {
        title: t('openGraph.title')?.trim() || _.metadata.title,
        description: t('openGraph.description')?.trim() || _.metadata.description,
        url: _.metadata.url,
        type: 'website',
        images: [
          {
            url: _.metadata.openGraphImage,
            width: 1200,
            height: 630,
            alt: t('openGraph.imageAlt') || 'Default Open Graph Image',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@default_twitter',
        creator: '@default_twitter_creator',
        title: t('twitter.title')?.trim() || _.metadata.title,
        description: t('twitter.description')?.trim() || _.metadata.description,
        images: _.metadata.twitterImage || '/img/default-twitter-image.png',
      },
      icons: {
        icon: '/img/favicon.ico',
        shortcut: '/img/favicon.ico',
        apple: '/img/apple-touch-icon.png',
      },
      themeColor: [
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      ],
      viewport: 'width=device-width, initial-scale=1.0',
    }
  }
}
