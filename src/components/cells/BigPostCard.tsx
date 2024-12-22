import A from '@/components/atoms/A'
import Pattern from '@/components/atoms/Pattern'
import Tag from '@/components/atoms/Tag'
import Text from '@/components/atoms/Text'
import { Media, Post } from '@/payload-types'
import dateFormatter from '@/utils/dateFormatter/dateFormatter'

export default function BigPostCard({ post }: { post: Post }) {
  const thumbnailUrl =
    typeof post.thumbnail === 'object' && post.thumbnail !== null
      ? process.env.PRODUCTION_URL! + post.thumbnail.url
      : 'https://placehold.co/600x400'

  const publishedDate = dateFormatter({ date: post.publishedAt })
  return (
    <section className="mt-8">
      <div className="">
        <A href={`/news/${post.slug}`}>
          {post.mediaStatus === 'unused' ? (
            <Pattern />
          ) : (
            <img src={thumbnailUrl} className="w-full h-full object-cover aspect-video" />
          )}
        </A>
      </div>
      <div className="flex justify-center md:mt-2">{/* <Tag>Exclusiva/Primera parte</Tag> */}</div>
      <div className="flex justify-center items-center gap-2 md:justify-start mt-4">
        <Text as="small">{publishedDate}</Text>
        {/* <Text as="small">Ketty Garat</Text>•<Text as="small">Teresa Gomez</Text> */}
        {/* <CommentsCounter /> */}
      </div>
      <div>
        <A href={`/news/${post.slug}`} styledAs="clean">
          <Text as="h1" className="text-center md:text-left">
            {post.title}
          </Text>
        </A>
      </div>
      <div className="md:mt-2">
        <Text as="h2" styledAs="h5" className="md:text-left text-center mt-4">
          {post.subtitle}
        </Text>
      </div>
    </section>
  )
}
