import createThreadRunMessage from '@/app/(server)/tasks/assitants/createThreadRunMessage'
import errorResponse from '@/utils/errors/errorResponse'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data: newRun } = await createThreadRunMessage({ prompt: 'Por qué el cielo es azul?' })
    console.log(newRun)
    return NextResponse.json({ newRun })
  } catch (error) {
    const { body, options } = errorResponse(error)
    return NextResponse.json(body, options)
  }
}
