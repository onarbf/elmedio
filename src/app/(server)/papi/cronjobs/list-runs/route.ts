import checkRun from '@/app/(server)/tasks/assitants/checkRun'
import listRuns from '@/app/(server)/tasks/assitants/listRuns'
import errorResponse from '@/utils/errors/errorResponse'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data: runs } = await listRuns({
      threadId: 'thread_MCMloaM70L3103z08lRU76aF',
    })

    return NextResponse.json({ runs })
  } catch (error) {
    const { body, options } = errorResponse(error)
    return NextResponse.json(body, options)
  }
}
