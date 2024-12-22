import PageClient from '@/app/(frontend)/[locale]/(home)/page.client'
import getPosts from '@/app/(server)/tasks/getPosts'
import createGenerateMetadata from '@/utils/createGenerateMetadata'

export const generateMetadata = createGenerateMetadata({ namespace: 'Home.Metadata' }) as any

export const revalidate = 0

export default async function Home() {
  /* const t = useTranslations("Home"); */

  const { data: posts } = await getPosts({
    options: {
      where: {
        postStatus: {
          equals: 'published',
        },
      },
      limit: 40,
    },
  })
  return (
    <>
      <PageClient posts={posts} />
    </>
  )
}
