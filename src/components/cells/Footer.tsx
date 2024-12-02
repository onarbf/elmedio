'use client'
import LanguageSelector from '@/components/cells/LanguageSelector'
import ThemeSwitcher from '@/components/cells/ThemeSwitcher'
import Wrapper from '@/components/cells/Wrapper'

export default function Footer() {
  const date = new Date().getFullYear()

  return (
    <footer className="">
      <Wrapper>
        <div className="grid grid-cols-2 md:px-2  mt-2">
          <div className="">ElMedio | {date}</div>
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
