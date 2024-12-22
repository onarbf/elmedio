import createThreadRunMessage from '@/app/(server)/tasks/assitants/createThreadRunMessage'
import getTopics from '@/app/(server)/tasks/getTopics'
import getUsers from '@/app/(server)/tasks/getUsers'
import updateTopic from '@/app/(server)/tasks/updateTopic'
import uploadPost from '@/app/(server)/tasks/uploadPost'
import { Media } from '@/collections/Media'
import errorResponse from '@/utils/errors/errorResponse'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    let type = searchParams.get('type') || 'news'
    console.log(type)
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
    console.log('incoming!')
    const { data: newRun } = await createThreadRunMessage({ prompt: unwrittenTopic.docs[0].title })
    await uploadPost({
      post: {
        author: author.docs[0].id,
        topic: unwrittenTopic.docs[0].id,
        threadId: newRun.thread_id,
        runId: newRun.id,
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
