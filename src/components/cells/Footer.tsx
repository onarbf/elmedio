'use client'
import LanguageSelector from '@/components/cells/LanguageSelector'
import ThemeSwitcher from '@/components/cells/ThemeSwitcher'
import Wrapper from '@/components/cells/Wrapper'
import _ from '@/constants'

export default function Footer() {
  const date = new Date().getFullYear()

  return (
    <footer className="border-t-[1px] border-main-700 bg-main-100 mt-4">
      <Wrapper>
        <div className="grid grid-cols-2 md:px-2  py-4 mt-2">
          <div className="">
            {_.metadata.title} | {date}
          </div>
          <div className="">
            <ul className="flex gap-2 justify-end ">
              <li>
                <LanguageSelector />
              </li>
              <li>{<ThemeSwitcher />}</li>
            </ul>
          </div>
        </div>
      </Wrapper>
    </footer>
  )
}
