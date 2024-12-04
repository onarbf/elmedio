import checkRun from '@/app/(server)/tasks/assitants/checkRun'
import errorResponse from '@/utils/errors/errorResponse'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data: newRun } = await checkRun({
      threadId: 'thread_AnG96hPmtwDaJvTF360ldPRM',
      runId: 'run_1DcsWG4hQsqLR3t0L0PIrjnN',
    })
    console.log(newRun)
    return NextResponse.json({ newRun })
  } catch (error) {
    const { body, options } = errorResponse(error)
    return NextResponse.json(body, options)
  }
}
