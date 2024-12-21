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
  },
  websiteUrl,
  styles,
  defaultLocale,
  locales: ['en', 'es'] as const,
} as const

export default _
