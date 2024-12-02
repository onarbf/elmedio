import Text from '@/components/atoms/Text'
import { cn } from '@/utils/cn'
import { ReactNode } from 'react'

type TagProps = {
  children: ReactNode | string
  className?: string
  styledAs?: 'default' | 'elegant'
}
export default function Tag({ children, className, styledAs = 'default' }: TagProps) {
  const styles = {
    default: 'px-2 uppercase font-bold',
    elegant: 'px-4 rounded-tr-2xl rounded-bl-2xl font-bold',
  }

  return (
    <div className={cn(`${styles[styledAs]} bg-red-800`, className)}>
      <Text as="small" className="uppercase">
        {children}
      </Text>
    </div>
  )
}
