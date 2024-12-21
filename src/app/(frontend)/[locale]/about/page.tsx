import Text from '@/components/atoms/Text'
import Wrapper from '@/components/cells/Wrapper'
import createGenerateMetadata from '@/utils/createGenerateMetadata'

export const generateMetadata = createGenerateMetadata('About.Metadata') as any

export default async function About() {
  return (
    <Wrapper as="main" className="mt-2">
      <div>
        <Text as="h1">About</Text>
      </div>
    </Wrapper>
  )
}
