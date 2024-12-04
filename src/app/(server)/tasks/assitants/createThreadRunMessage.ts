import { ServerResponse } from '@/types'
import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import OpenAI from 'openai'
import { Run } from 'openai/resources/beta/threads/runs/runs.mjs'
export default async function createThreadRunMessage({
  prompt,
}: {
  prompt: string
}): Promise<ServerResponse<Run>> {
  try {
    const openai = new OpenAI()
    const run = await openai.beta.threads.createAndRun({
      assistant_id: 'asst_Wkb1YyCP4cB1VtEhbL32ALMv',
      thread: {
        messages: [{ role: 'user', content: prompt }],
      },
    })

    console.log(run)

    return buildResponse({ data: run })
  } catch (error) {
    throw serverError(error)
  }
}
