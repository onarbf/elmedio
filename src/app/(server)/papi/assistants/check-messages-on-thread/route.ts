import checkRun from '@/app/(server)/tasks/assitants/checkRun'
import getMessagesOnThread from '@/app/(server)/tasks/assitants/getMessagesOnThread'
import errorResponse from '@/utils/errors/errorResponse'
import { NextResponse } from 'next/server'
import { Message } from 'openai/resources/beta/threads/messages.mjs'

export async function GET() {
  try {
    const { data: run } = await checkRun({
      threadId: 'thread_AnG96hPmtwDaJvTF360ldPRM',
      runId: 'run_1DcsWG4hQsqLR3t0L0PIrjnN',
    })

    if (run.status === 'completed') {
      // Recuperar mensajes del thread
      const { data: messages } = await getMessagesOnThread({
        threadId: run.thread_id,
      })

      // Encontrar la respuesta generada por el asistente
      const assistantMessage = messages

      return NextResponse.json({ response: assistantMessage })
    } else {
      return NextResponse.json({ status: run.status })
    }
  } catch (error) {
    const { body, options } = errorResponse(error)
    return NextResponse.json(body, options)
  }
}
