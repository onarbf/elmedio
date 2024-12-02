import Text from '@/components/atoms/Text'
import { MessageSquare } from 'lucide-react'

export default function CommentsCounter() {
  return (
    <div className=" flex items-center gap-1">
      <Text as="small">49</Text>
      <MessageSquare className="w-[1rem] -mt-[2px]" />
    </div>
  )
}
