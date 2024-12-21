import { cn } from '@/utils/cn'

export default function Pattern({ className }: { className?: string }) {
  const patterns = [
    'pattern-lines',
    'pattern-vertical-lines',
    'pattern-diagonal-lines',
    'pattern-rectangles',
    'pattern-rhombus',
    'pattern-dots',
    'pattern-boxes',
    'pattern-cross',
    'pattern-zigzag',
    'pattern-zigzag-3d',
    'pattern-isometric',
    'pattern-wavy',
    'pattern-triangles',
    'pattern-moon',
    'pattern-paper',
  ]

  const sizes = [1, 2, 4, 6, 8, 16, 20, 24, 32]

  const colors = ['indigo', 'green', 'red']

  const randomPattern = Math.floor(Math.random() * patterns.length)
  const randomSize = Math.floor(Math.random() * sizes.length)
  const randomColor = Math.floor(Math.random() * colors.length)
  const choosenColor = `pattern-${colors[randomColor]}-500`
  const mountedClassName = ` ${patterns[randomPattern]} pattern-size-${sizes[randomSize]}  w-full h-[300px]  ${choosenColor} pattern-bg-transparent pattern-opacity-60 `
  return <div className={cn(mountedClassName, className)} />
}
