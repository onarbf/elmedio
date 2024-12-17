import PageClient from '@/app/(frontend)/[locale]/news/[slug]/page.client'
import getPosts from '@/app/(server)/tasks/getPosts'

export default async function Post({ params }: any) {
  const { slug } = await params
  const { data: post } = await getPosts({
    options: {
      where: {
        slug: {
          equals: slug,
        },
      },
    },
  })

  return (
    <>
      <PageClient post={post.docs[0]} />
    </>
  )
}
