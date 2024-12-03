import PageClient from '@/app/(frontend)/[locale]/(home)/page.client'
import getPosts from '@/app/(server)/tasks/getPosts'
import createGenerateMetadata from '@/utils/createGenerateMetadata'

export const generateMetadata = createGenerateMetadata('Home.Metadata') as any

export default async function Home() {
  /* const t = useTranslations("Home"); */

  const { data } = await getPosts()
  console.log(data)
  return (
    <>
      <PageClient data={data} />
    </>
  )
}
