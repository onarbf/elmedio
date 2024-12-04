import { ServerResponse } from '@/types'
import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import OpenAI from 'openai'
import { Message } from 'openai/resources/beta/threads/messages.mjs'
import { Run } from 'openai/resources/beta/threads/runs/runs.mjs'
export default async function checkRun({
  threadId,
  runId,
}: {
  threadId: string
  runId: string
}): Promise<ServerResponse<Run>> {
  try {
    const openai = new OpenAI()

    const run = await openai.beta.threads.runs.retrieve(threadId, runId)
    console.log(run)

    return buildResponse({ data: run })
  } catch (error) {
    throw serverError(error)
  }
}
