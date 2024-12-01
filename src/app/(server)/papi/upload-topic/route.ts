import { NextResponse } from 'next/server'
import { createTopic } from '@/app/(server)/tasks/createTopic'
import errorResponse from '@/utils/errors/errorResponse'

export async function GET() {
  try {
    console.log('almicas')

    const newTopic = await createTopic({
      title: '',
      source: '',
      topicStatus: 'unwritten',
    })
    return NextResponse.json(newTopic)
  } catch (error: any) {
    const { body, options } = errorResponse(error)
    return NextResponse.json(body, options)
  }
}
