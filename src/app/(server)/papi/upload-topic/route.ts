import { NextResponse } from 'next/server'
import { writeTopic } from '@/app/(server)/tasks/writeTopic'
import errorResponse from '@/utils/errors/errorResponse'

export async function GET() {
  try {
    console.log('almicas')

    const newTopic = await writeTopic({
      title: 'test',
      source: 'test2',
      topicStatus: 'unwritten',
    })
    return NextResponse.json(newTopic)
  } catch (error: any) {
    const { body, options } = errorResponse(error)
    return NextResponse.json(body, options)
  }
}
