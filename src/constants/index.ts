import styles from '@/constants/styles'

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
  agents: {
    "oona-chang": {
      id: "67697200e9100a81bada3e4e",
    openai_id: "asst_OIpZrslvUxZRWjlRqzc46gdi"
  },
  "honorio-de-la-rica":{
    id: "6769734d4de748d2a13aa0c5",
    openai_id: "asst_Wkb1YyCP4cB1VtEhbL32ALMv"
  }}
} as const

export default _
