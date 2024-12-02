import scrapeAndCreateTopic from '@/app/(server)/jobs/scrapeAndCreateTopic'
import errorResponse from '@/utils/errors/errorResponse'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const response = await scrapeAndCreateTopic()

    return NextResponse.json(response)
  } catch (error) {
    const { body, options } = errorResponse(error)
    return NextResponse.json({ body, options })
  }
}
