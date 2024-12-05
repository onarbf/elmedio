import _ from '@/constants'
import { Topic } from '@/payload-types'

type TextStyles = keyof typeof _.styles.textStyles

type LinkStyles = keyof typeof _.styles.linkStyles
type LocaleTypes = (typeof _.locales)[number]

export type TextProps = {
  as?: Exclude<TextStyles, 'superSmall'>
  styledAs?: TextStyles
  children: ReactElement
  className?: string
}

export type LinkProps = {
  children: ReactElement
  className?: string
  href: string
  locale?: LocaleTypes
  highlightIfActive?: boolean
  styledAs?: LinkStyles
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export type WrapperProps = {
  as?: 'div' | 'section' | 'main'
  children: ReactElement
  className?: string
}

export interface ServerResponse<T = unknown> {
  data: T
  message?: string
  status?: number
}

export type ServerError = {
  name: 'UnknownError'
  message: 'Error de desconocido'
  details: any
  status: 500
  error: any
}

export type FlexiblePost = Pick<Post> & {
  title: string
  body: string
  author: string
  topic: string
  categories: string
  id?: number
  createdAt?: string
  updatedAt?: string
  thumbnail?: Post['thumbnail']
  sources?: Post['sources']
  publishedAt?: string
}

export type FlexibleTopic = Pick<Topic, 'title' | 'source' | 'topicStatus'> & {
  id?: number
  publishAt?: string
  createdAt?: string
  updatedAt?: string
}
