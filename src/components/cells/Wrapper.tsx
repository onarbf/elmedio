import { WrapperProps } from '@/types'
import { cn } from '@/utils/cn'

export default function Wrapper({ as = 'section', children, className = '' }: WrapperProps) {
  const Component = as
  return (
    <Component
      className={cn('mx-auto md:max-w-[full] 2xl:max-w-[1180px] max-w-[1440px] px-2', className)}
    >
      {children}
    </Component>
  )
}
