import A from '@/components/atoms/A'
import Text from '@/components/atoms/Text'
import Wrapper from '@/components/cells/Wrapper'
import _ from '@/constants'

export default function Navbar() {
  return (
    <div className="fixed z-[1001] top-0 w-full border-b-[1px]  border-main-700 bg-main-100">
      <Wrapper>
        <nav className="flex items-center py-4 justify-between">
          <div className="">
            <A href="/" styledAs="clean">
              <Text className="font-serif" styledAs="h4">
                {_.metadata.title}
              </Text>
            </A>
          </div>
        </nav>
      </Wrapper>
    </div>
  )
}
