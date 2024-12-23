import getNewsFromTopic from '@/app/(server)/jobs/getNewsFromTopic'
import scrapeNews from '@/app/(server)/jobs/scrapeNews'
import createThreadRunMessage from '@/app/(server)/tasks/assitants/createThreadRunMessage'
import getTopics from '@/app/(server)/tasks/getTopics'
import getUsers from '@/app/(server)/tasks/getUsers'
import updateTopic from '@/app/(server)/tasks/updateTopic'
import uploadPost from '@/app/(server)/tasks/uploadPost'
import errorResponse from '@/utils/errors/errorResponse'
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 300
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const scrappedArticles: { title?: string; content?: string; url?: string }[] = []
    let type = searchParams.get('type') || 'news'
    const { data: author } = await getUsers()
    const { data: unwrittenTopic } = await getTopics({
      options: {
        where: {
          topicStatus: {
            equals: 'unwritten',
          },
          type: {
            equals: type,
          },
        },
      },
    })

    const { data: articles } = await getNewsFromTopic(unwrittenTopic.docs[0].title)

    let prompt = unwrittenTopic.docs[0].title
    let sources: { source: string; id: number }[] = []
    if (type === 'news') {
      for (const article of articles) {
        const articleBody = await scrapeNews({ article })
        if (articleBody.status === 200) {
          scrappedArticles.push(articleBody.data)
        }
      }
      sources = scrappedArticles.map((article, id) => ({ source: article.url || '', id }))
      const bodies = scrappedArticles.reduce(
        (acc: string, article: { title?: string; content?: string; url?: string }, index) => {
          return `${acc} \n Noticia ${index}: ${article.title} \n  ${article.content}`
        },
        ``,
      )
      prompt = `Te voy a pasar una serie de noticias, y en función de la información que hay en ellas. Todas ellas están relacionadas con ${unwrittenTopic.docs[0].title}.
    Utilíza esta información para escribir tú una noticia al respecto. Intenta ser fidedigno, no te inventes cosas que no sabes y si es neceisario, utiliza información del pasado. Esta noticia es muy importante, escríbela para rankear bien en google pero sin caer en el amarillismo
    
    No añadas HTML, sino Markdown, ya que irá directamente a la base de datos:
    \n Noticias sobre el tema \n
    ${bodies}`
    }

    const { data: newRun } = await createThreadRunMessage({ prompt,type })
    await uploadPost({
      post: {
        author: author.docs[0].id,
        topic: unwrittenTopic.docs[0].id,
        threadId: newRun.thread_id,
        runId: newRun.id,
        sources,
        postStatus: 'unwritten',
        type: unwrittenTopic.docs[0].type,
        mediaStatus: type === 'news' ? 'unstarted' : 'unused',
      },
    })
    const { data: updatedTopic } = await updateTopic({
      topic: { ...unwrittenTopic.docs[0], topicStatus: 'unpublished' },
    })
    return NextResponse.json({ updatedTopic })
  } catch (error) {
    const { body, options } = errorResponse(error)
    return NextResponse.json(body, options)
  }
}
