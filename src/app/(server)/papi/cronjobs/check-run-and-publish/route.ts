import checkRun from '@/app/(server)/tasks/assitants/checkRun'
import getMessagesOnThread from '@/app/(server)/tasks/assitants/getMessagesOnThread'
import getPosts from '@/app/(server)/tasks/getPosts'
import updatePost from '@/app/(server)/tasks/updatePost'
import updateTopic from '@/app/(server)/tasks/updateTopic'
import { Topic } from '@/payload-types'
import errorResponse from '@/utils/errors/errorResponse'
import titleToSlug from '@/utils/titleToSlug'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data: unwrittenPost } = await getPosts({
      options: {
        where: {
          threadId: {
            exists: true,
            not_equals: null,
          },
          postStatus: {
            equals: 'unwritten',
          },
        },
      },
    })
    console.log(unwrittenPost)
    const { data: newRun } = await checkRun({
      threadId: unwrittenPost.docs[0].threadId!,
      runId: unwrittenPost.docs[0].runId!,
    })
    const { data: messagesOnThread } = await getMessagesOnThread({ threadId: newRun.thread_id })

    // Validar si el contenido tiene la estructura esperada
    const firstMessage = messagesOnThread.data[0]?.content[0]

    if (!firstMessage || typeof firstMessage !== 'object' || !('text' in firstMessage)) {
      throw new Error('Invalid message content format')
    }
    const postContent = JSON.parse(firstMessage.text.value as string)

    if (postContent) {
      const { data: newPost } = await updatePost({
        post: {
          id: unwrittenPost.docs[0].id,
          title: postContent.title,
          body: postContent.body,
          slug: titleToSlug({ title: postContent.title }),
          categories: 'news',
          postStatus: 'published',
          publishedAt: new Date(),
        },
      })

      const { data: updatedTopic } = await updateTopic({
        topic: { ...(newPost.topic as Topic), topicStatus: 'published' },
      })

      return NextResponse.json(updatedTopic)
    }
    return NextResponse.json('not published')
  } catch (error) {
    const { body, options } = errorResponse(error)
    return NextResponse.json(body, options)
  }
}
