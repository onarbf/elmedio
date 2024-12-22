import styles from '@/constants/styles'
import { url } from 'inspector'

const websiteUrl = 'localhost:3000'
const defaultLocale = 'es'

const _ = {
  metadata: {
    title: 'ElArtificial',
    description: 'Un periódico objetivo y sin censura',
    alternates: {
      canonical: `${websiteUrl}/${defaultLocale}`,
      languages: {
        es: `${websiteUrl}/en/${defaultLocale}`,
      },
    },
    keywords:
      'noticias, periodico, objetividad, censura, actualidad, opinion, politica, economia, deportes, cultura, tecnologia, ciencia, salud, entretenimiento, internacional, nacional, local',
    url: process.env.PRODUCTION_URL,
    openGraphImage: `${process.env.PRODUCTION_URL}/img/graphImg.png`,
    twitterImage: `${process.env.PRODUCTION_URL}/img/graphImg.png`,
  },
  websiteUrl,
  styles,
  defaultLocale,
  locales: ['es'] as const,
} as const

export default _
