import { ServerResponse } from '@/types'
import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import OpenAI from 'openai'
import { Run } from 'openai/resources/beta/threads/runs/runs.mjs'
import { Thread } from 'openai/resources/beta/threads/threads.mjs'
export default async function createRun({
  thread,
}: {
  thread: Thread
}): Promise<ServerResponse<Run>> {
  try {
    const openai = new OpenAI()

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: 'asst_Wkb1YyCP4cB1VtEhbL32ALMv',
    })

    return buildResponse({ data: run })
  } catch (error) {
    throw serverError(error)
  }
}
