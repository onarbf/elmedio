import A from '@/components/atoms/A'
import Tag from '@/components/atoms/Tag'
import Text from '@/components/atoms/Text'
import { Media, Post } from '@/payload-types'
import dateFormatter from '@/utils/dateFormatter/dateFormatter'

export default function BigPostCard({ post }: { post: Post }) {
  const thumbnail = post.thumbnail as Media
  const publishedDate = dateFormatter({ date: post.publishedAt })
  return (
    <section className="mt-8">
      <div className="">
        <A href={`/news/${post.slug}`}>
          <img
            src={
              thumbnail.url
                ? process.env.PRODUCTION_URL! + thumbnail.url
                : 'https://placehold.co/1200x400'
            }
            className="w-full h-full object-cover aspect-video"
          />
        </A>
      </div>
      <div className="flex justify-center mt-2">{/* <Tag>Exclusiva/Primera parte</Tag> */}</div>
      <div>
        <A href={`/news/${post.slug}`}>
          <Text as="h1" className="text-center">
            {post.title}
          </Text>
        </A>
      </div>
      <div>
        <Text as="h2" styledAs="h5">
          {post.subtitle}
        </Text>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Text as="small">{publishedDate}</Text>
        {/* <Text as="small">Ketty Garat</Text>•<Text as="small">Teresa Gomez</Text> */}
        {/* <CommentsCounter /> */}
      </div>
    </section>
  )
}
