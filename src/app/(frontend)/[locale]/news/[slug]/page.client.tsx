import Pattern from '@/components/atoms/Pattern'
import Separator from '@/components/atoms/Separator'
import Tag from '@/components/atoms/Tag'
import Text from '@/components/atoms/Text'
import PostCard from '@/components/cells/cards/PostCard'
import CommentsCounter from '@/components/cells/CommentsCounter'
import Wrapper from '@/components/cells/Wrapper'
import { Media, Post } from '@/payload-types'
import dateFormatter from '@/utils/dateFormatter/dateFormatter'
import { Bookmark, Clock } from 'lucide-react'
import markdownit from 'markdown-it'
import { Author } from 'next/dist/lib/metadata/types/metadata-types'
import { User } from 'payload'
export default function PageClient({ post, relatedPosts }: { post: Post; relatedPosts: Post[] }) {
  const author = post.author as unknown as User
  const md = markdownit()
  const formattedBody = md.render(post.body || '')
  const publishedDate = dateFormatter({ date: post.publishedAt })
  const thumbnailUrl =
    typeof post.thumbnail === 'object' && post.thumbnail !== null
      ? process.env.PRODUCTION_URL! + post.thumbnail.url
      : 'https://placehold.co/600x400'

  let gender = 'man'
  let expertise = 'Actualidad'
  if (post.type === 'shitpost') {
    gender = 'woman'
    expertise = 'Cultura de Internet'
  }

  return (
    <Wrapper as="main">
      <section className="mt-8 ">
        {/* TAG */}
        {/* <div className="flex ">
          <Tag styledAs="elegant" className="bg-main-900 text-main-100">
            Exclusiva/Primera parte
          </Tag>
        </div> */}
        {/* TITLE */}
        <div className="mt-[120px]">
          <Text as="h1" className="">
            {post.title}
          </Text>
        </div>
        {/* SUBTITLE */}
        <div className="mt-4">
          <Text as="h2" styledAs="h5">
            {post.subtitle}
          </Text>
        </div>
        {/* IMAGE */}
        <div className="mt-8">
          {post.mediaStatus === 'unused' ? (
            <Pattern />
          ) : (
            <img src={thumbnailUrl} className="aspect-video w-full h-full object-cover" />
          )}
        </div>
      </section>
      <section className="grid grid-cols-12 gap-4 mt-4 mt-8">
        {/* METADATA */}
        <div className="col-span-8 md:col-span-12  flex flex-col gap-4">
          <div className=" flex ">
            <div className="flex gap-4">
              <div className="flex flex-col ">
                <Text as="h4" styledAs="h6" className="italic font-thin">
                  Escrito por {author.name}
                </Text>
              </div>
            </div>
            <div className="grow flex items-end justify-end">
              <div className="flex items-center gap-1">
                <Clock className="w-[16px] -mt-[3px]" />
                <Text as="small">Publicado el {publishedDate}</Text>
              </div>
            </div>
          </div>
          {/* SHARE & SOCIAL BAR */}
          {/* <div className="flex justify-between mt-2">
            <div>SOCIAL MEDIA LINKS</div>
            <div className="flex gap-2">
              <div className="flex">
                <Bookmark className="w-[20px]" /> <Text>Favoritos</Text>
              </div>
              |
              <div className="flex gap-2">
                <CommentsCounter /> <Text>comentarios</Text>
              </div>
            </div>
          </div> */}
          <div className="news-body" dangerouslySetInnerHTML={{ __html: formattedBody }}></div>
          <Separator />
          <div>
            {author.name !== 'Press' && (
              <div className="flex gap-4 border border-main-900 p-4 md:w-full w-[80%]">
                <div className="w-[240px] ">
                  {author.profile && (
                    <img
                      src={`${process.env.PRODUCTION_URL}${author.profile.url}`}
                      className="rounded-full w-full aspect-square"
                    />
                  )}
                </div>
                <div className="">
                  <Text as="h5" styledAs="h5" className="font-serif">
                    {author.name}
                  </Text>
                  <Text className="italic">{author.bio}</Text>
                  <div className="mt-2">
                    <Separator />
                    <Text as="small" className="italic">
                      {author.name} es nuestr{gender === 'man' ? 'o' : 'a'} expert
                      {gender === 'man' ? 'o' : 'a'} en {expertise}
                    </Text>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-12 col-span-4 ">
          <div className="flex flex-col items-center gap-4">
            <Text as="h4" styledAs="superSmall" className="font-bold">
              Noticias Relacionadas
            </Text>
            <div className="flex flex-col gap-8">
              {relatedPosts.map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  )
}
