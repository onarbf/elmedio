import checkRun from '@/app/(server)/tasks/assitants/checkRun'
import getPosts from '@/app/(server)/tasks/getPosts'
import errorResponse from '@/utils/errors/errorResponse'
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
    return NextResponse.json({ newRun })
  } catch (error) {
    const { body, options } = errorResponse(error)
    return NextResponse.json(body, options)
  }
}
