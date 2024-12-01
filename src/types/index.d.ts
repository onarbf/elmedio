import _ from '@/constants'

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
