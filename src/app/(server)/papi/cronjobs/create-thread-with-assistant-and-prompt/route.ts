import createThreadRunMessage from '@/app/(server)/tasks/assitants/createThreadRunMessage'
import getTopics from '@/app/(server)/tasks/getTopics'
import getUsers from '@/app/(server)/tasks/getUsers'
import uploadPost from '@/app/(server)/tasks/uploadPost'
import writePost from '@/app/(server)/tasks/writePost'
import errorResponse from '@/utils/errors/errorResponse'
import { NextResponse } from 'next/server'
import { threadId } from 'worker_threads'

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
    const { data: newPost } = await uploadPost({
      post: {
        author: author.docs[0].id,
        topic: unwrittenTopic.docs[0].id,
        threadId: newRun.thread_id,
        runId: newRun.id,
        postStatus: 'unwritten',
      },
    })
    console.log(newPost)
    return NextResponse.json({ newPost })
  } catch (error) {
    const { body, options } = errorResponse(error)
    return NextResponse.json(body, options)
  }
}
