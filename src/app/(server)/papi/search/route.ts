import getNewsFromTopic from '@/app/(server)/jobs/getNewsFromTopic'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('works')
    const yeyu = await getNewsFromTopic('Pedro Sanchez Ayuso')

    return NextResponse.json(yeyu)
  } catch (error) {
    console.log(error)
  }
}
