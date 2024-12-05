import createThreadRunMessage from '@/app/(server)/tasks/assitants/createThreadRunMessage'
import getTopics from '@/app/(server)/tasks/getTopics'
import getUsers from '@/app/(server)/tasks/getUsers'
import updateTopic from '@/app/(server)/tasks/updateTopic'
import uploadPost from '@/app/(server)/tasks/uploadPost'
import errorResponse from '@/utils/errors/errorResponse'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data: author } = await getUsers()
    const { data: unwrittenTopic } = await getTopics({
      options: {
        where: {
          topicStatus: {
            equals: 'unwritten',
          },
        },
      },
    })

    const { data: newRun } = await createThreadRunMessage({ prompt: unwrittenTopic.docs[0].title })
    console.log(' newRun', newRun)
    const { data: newPost } = await uploadPost({
      post: {
        author: author.docs[0].id,
        topic: unwrittenTopic.docs[0].id,
        threadId: newRun.thread_id,
        runId: newRun.id,
        postStatus: 'unwritten',
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
