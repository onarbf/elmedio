import Text from '@/components/atoms/Text'
import BigPostCard from '@/components/cells/BigPostCard'

import PostCard from '@/components/cells/cards/PostCard'
import Wrapper from '@/components/cells/Wrapper'
import { Post } from '@/payload-types'
import { PaginatedDocs } from 'payload'

export default function PageClient({ posts }: { posts: PaginatedDocs<Post> }) {
  const mainPost = posts.docs[0]
  const secondaryPosts = posts.docs.filter((post, index) => index !== 0)
  return (
    <Wrapper as="main" className="mt-2 aspect-video">
      <section className="flex justify-center ">
        <Text as="h1" className="text-[5rem] font-serif">
          El<b>Medio</b>
        </Text>
      </section>
      {/* Categories bar */}
      {/* <section>
        <ul className="flex gap-2 justify-between">
          {Array.from({ length: 8 }).map((_, index) => {
            return <li key={index}>Categoría {index + 1}</li>
          })}
        </ul>
      </section> */}
      {/* LAST HOUR BAR */}

      {/* HEADER */}
      <BigPostCard post={mainPost} />
      {/* MAIN NEWS */}
      <section className="grid grid-cols-3 gap-x-8 gap-y-12 mt-8">
        {/* NEW CARD */}
        {secondaryPosts.map((post, index) => {
          return <PostCard key={index} post={post} />
        })}
      </section>

      {/*  */}
      <section></section>
    </Wrapper>
  )
}
