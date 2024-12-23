import _ from '@/constants'
import { ServerResponse } from '@/types'
import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import OpenAI from 'openai'
import { Run } from 'openai/resources/beta/threads/runs/runs.mjs'
export default async function createThreadRunMessage({
  prompt,
  type
}: {
  prompt: string
  type: string
}): Promise<ServerResponse<Run>> {
  try {
    const journalist = type === "news" ? _.agents['honorio-de-la-rica'].openai_id : _.agents['oona-chang'].openai_id
    const openai = new OpenAI()
    const run = await openai.beta.threads.createAndRun({
      assistant_id: journalist,
      thread: {
        messages: [{ role: 'user', content: prompt }],
      },
    })

    return buildResponse({ data: run })
  } catch (error) {
    throw serverError(error)
  }
}
