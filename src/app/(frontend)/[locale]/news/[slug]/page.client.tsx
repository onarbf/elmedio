import Separator from '@/components/atoms/Separator'
import Tag from '@/components/atoms/Tag'
import Text from '@/components/atoms/Text'
import CommentsCounter from '@/components/cells/CommentsCounter'
import Wrapper from '@/components/cells/Wrapper'
import { Post } from '@/payload-types'
import { Bookmark, Clock } from 'lucide-react'

export default function PageClient({ post }: { post: Post }) {
  return (
    <Wrapper as="main">
      <section className="mt-8">
        {/* TAG */}
        <div className="flex ">
          <Tag styledAs="elegant" className="bg-main-900 text-main-100">
            Exclusiva/Primera parte
          </Tag>
        </div>
        {/* TITLE */}
        <div className="mt-4">
          <Text as="h1" className="">
            {post.title}
          </Text>
        </div>
        {/* SUBTITLE */}
        <div className="mt-4">
          <Text as="h2" styledAs="h5">
            Carmen Pano, que entregó 90.000 euros en la sede del PSOE, concede a THE OBJECTIVE su
            primera entrevista
          </Text>
        </div>
        {/* IMAGE */}
        <div className="mt-8">
          <img src="https://placehold.co/1200x400" className="w-full h-full object-cover" />
        </div>
      </section>
      <section className="grid grid-cols-12 gap-4 mt-4">
        {/* METADATA */}
        <div className="col-span-8  ">
          <div className=" flex ">
            <div className="flex gap-4">
              <div className="flex flex-col">
                <Text as="h4" styledAs="h6" className="font-bold">
                  Ketty Garat
                </Text>
                <Text as="small" styledAs="superSmall">
                  @KettyGarat
                </Text>
                <Text as="small" styledAs="superSmall">
                  kg@theobjective.com
                </Text>
              </div>
              <div className="flex flex-col">
                <Text as="h4" styledAs="h6" className="font-bold">
                  Ketty Garat
                </Text>
                <Text as="small" styledAs="superSmall">
                  @KettyGarat
                </Text>
                <Text as="small" styledAs="superSmall">
                  kg@theobjective.com
                </Text>
              </div>
            </div>
            <div className="grow flex items-end justify-end">
              <div className="flex items-center gap-1">
                <Clock className="w-[16px] -mt-[3px]" />
                <Text as="small">
                  Publicado el {new Date().getFullYear()} | {new Date().getHours()}:{' '}
                  {new Date().getMinutes()}
                </Text>
              </div>
            </div>
          </div>
          {/* SHARE & SOCIAL BAR */}
          <div className="flex justify-between mt-2">
            <div>SOCIAL MEDIA LINKS</div>
            <div className="flex gap-2">
              <div className="flex">
                <Bookmark className="w-[20px]" /> <Text>Favoritos</Text>
              </div>
              |
              <div className="flex gap-2">
                <CommentsCounter /> <Text>comentarios</Text>
              </div>
            </div>
          </div>
          <div className="bg-red-300 h-[300px]">{post.body}</div>
        </div>

        <div className="col-span-4">
          <div className="flex items-center gap-2">
            <Text as="h4" styledAs="superSmall" className="font-bold">
              Noticias Relacionadas
            </Text>
            <Separator />
          </div>
        </div>
      </section>
    </Wrapper>
  )
}
