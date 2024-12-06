import Text from '@/components/atoms/Text'
import CommentsCounter from '@/components/cells/CommentsCounter'
import { Post } from '@/payload-types'
import A from '@/components/atoms/A'
export default function PostCard({ post }: { post: Post }) {
  const thumbnailUrl =
    typeof post.thumbnail === 'object' && post.thumbnail !== null
      ? post.thumbnail.url
      : 'https://placehold.co/600x400'

  return (
    <div className="">
      {/* Image */}
      <div className="aspect-video">
        <A href={`/news/${post.slug}`}>
          <img src={thumbnailUrl!} className="w-full h-full object-cover " />
        </A>
      </div>
      {/* Title */}
      <div className="mt-2">
        <A href={`/news/${post.slug}`}>
          <Text as="h2" styledAs="h3">
            {post.title}
          </Text>
        </A>
      </div>
      {/* Metadata */}
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-2">
          <Text as="small">Ketty Garat</Text>•<Text as="small">Author name</Text>
        </div>

        <CommentsCounter />
      </div>
      {/* Highlights */}
      <div>
        <ul className="list-disc ml-4">
          <li>
            <Text as="h6">Titular 1</Text>
          </li>
        </ul>
      </div>
    </div>
  )
}
