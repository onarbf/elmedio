import Text from '@/components/atoms/Text'
import CommentsCounter from '@/components/cells/CommentsCounter'
import { MessageSquare } from 'lucide-react'

export default function PostCard() {
  return (
    <div className="">
      {/* Image */}
      <div className="aspect-video">
        <img src="https://placehold.co/600x400" className="w-full h-full object-cover " />
      </div>
      {/* Title */}
      <div className="mt-2">
        <Text as="h2" styledAs="h3">
          Los mensajes entre Lobato y la ‘dos’ de López: «Parece que la carta me la da la Fiscalía»
        </Text>
      </div>
      {/* Metadata */}
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-2">
          <Text as="small">Ketty Garat</Text>•<Text as="small">Teresa Gomez</Text>
        </div>

        <CommentsCounter />
      </div>
      {/* Highlights */}
      <div>
        <ul className="list-disc ml-4">
          <li>
            <Text as="h6">
              Lobato entrega el acta notarial y el móvil al juez del Supremo que investiga al fiscal
              general
            </Text>
          </li>
        </ul>
      </div>
    </div>
  )
}
