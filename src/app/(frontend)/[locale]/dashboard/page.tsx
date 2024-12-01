import PageClient from '@/app/(frontend)/[locale]/dashboard/page.client'
import Wrapper from '@/components/cells/Wrapper'

export default async function Page() {
  return (
    <Wrapper>
      <PageClient />
    </Wrapper>
  )
}
