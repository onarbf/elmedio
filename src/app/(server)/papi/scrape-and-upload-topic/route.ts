import scrapeAndCreateTopic from '@/app/(server)/jobs/scrapeAndCreateTopic'
import { buildError } from '@/utils/errors/buildError'
import errorResponse from '@/utils/errors/errorResponse'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await scrapeAndCreateTopic()

    return NextResponse.json(response)
  } catch (error) {
    const { body, options } = errorResponse(error)
    return NextResponse.json({ body, options })
  }
}
