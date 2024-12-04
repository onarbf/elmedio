import getTopics from '@/app/(server)/tasks/getTopics'
import writePost from '@/app/(server)/tasks/writePost'
import errorResponse from '@/utils/errors/errorResponse'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const topicResponse = await getTopics({
      options: {
        where: {
          topicStatus: {
            equals: 'unwritten',
          },
        },
      },
    })
    const topic = topicResponse.data.docs[0]

    const newPost = await writePost({ prompt: topic.title })

    console.log(newPost)

    return NextResponse.json(newPost)
  } catch (error) {
    const { body, options } = errorResponse(error)
    return NextResponse.json(body, options)
  }
}
