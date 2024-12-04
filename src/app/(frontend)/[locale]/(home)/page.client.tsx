import Tag from '@/components/atoms/Tag'
import Text from '@/components/atoms/Text'
import PostCard from '@/components/cells/cards/PostCard'
import CommentsCounter from '@/components/cells/CommentsCounter'
import Wrapper from '@/components/cells/Wrapper'
import { Post } from '@/payload-types'
import { PaginatedDocs } from 'payload'

export default function PageClient({ posts }: { posts: PaginatedDocs<Post> }) {
  return (
    <Wrapper as="main" className="mt-2 aspect-video">
      <section className="flex justify-center ">
        <Text as="h1" className="text-[5rem] font-serif">
          El<b>Medio</b>
        </Text>
      </section>
      {/* Categories bar */}
      <section>
        <ul className="flex gap-2 justify-between">
          {Array.from({ length: 8 }).map((_, index) => {
            return <li key={index}>Categoría {index + 1}</li>
          })}
        </ul>
      </section>
      {/* LAST HOUR BAR */}
      <section className="grid grid-cols-12 gap-2 mt-8">
        <div className="col-span-2 flex items-center justify-center bg-red-300">
          <Text as="small" className="uppercase font-bold">
            Ultima hora
          </Text>
        </div>
        <div className="relative col-span-10 overflow-hidden ">
          <div className="w-[100vw] ">
            <Text as="small" className="font-bold">
              Tribunales El Colegio de Abogados de Madrid pide al Supremo que impute a la dos de
              Óscar López La asesora de Moncloa envió a Lobato un correo sobre la confesión de dos
              delitos fiscales por parte del novio de Ayuso
            </Text>
          </div>
        </div>
      </section>
      {/* HEADER */}
      <section className="mt-8">
        <div className="">
          <img src="https://placehold.co/1200x400" className="w-full h-full object-cover" />
        </div>
        <div className="flex justify-center mt-2">
          <Tag>Exclusiva/Primera parte</Tag>
        </div>
        <div>
          <Text as="h1" className="text-center">
            La testigo de TO da la cara: «Tengo pruebas y quiero colaborar con la Justicia»
          </Text>
        </div>
        <div>
          <Text as="h2" styledAs="h5">
            Carmen Pano, que entregó 90.000 euros en la sede del PSOE, concede a THE OBJECTIVE su
            primera entrevista
          </Text>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Text as="small">Ketty Garat</Text>•<Text as="small">Teresa Gomez</Text>•
          <CommentsCounter />
        </div>
      </section>

      {/* MAIN NEWS */}
      <section className="grid grid-cols-3 gap-x-8 gap-y-12 mt-8">
        {/* NEW CARD */}
        {posts.docs.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </section>

      {/*  */}
      <section></section>
    </Wrapper>
  )
}
