import PageClient from '@/app/(frontend)/[locale]/news/[slug]/page.client'
import getPosts from '@/app/(server)/tasks/getPosts'
import createGenerateMetadata from '@/utils/createGenerateMetadata'

export const generateMetadata = createGenerateMetadata({
  namespace: 'Default.Metadata',
  dynamic: {
    type: 'post',
  },
}) as any

export default async function Post({ params }: any) {
  const { slug } = await params
  const { data: posts } = await getPosts({
    options: {
      where: {
        slug: {
          equals: slug,
        },
      },
    },
  })
  const { data: relatedPosts } = await getPosts({
    options: {
      where: {
        slug: {
          not_equals: slug,
        },
        type: {
          equals: posts.docs[0].type,
        },
      },
      limit: 3,
    },
  })
  return (
    <>
      <PageClient post={posts.docs[0]} relatedPosts={relatedPosts.docs} />
    </>
  )
}
