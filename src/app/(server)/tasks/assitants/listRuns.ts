import { ServerResponse } from '@/types'
import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import OpenAI from 'openai'
import { Run, RunsPage } from 'openai/resources/beta/threads/runs/runs.mjs'
export default async function listRuns({
  threadId,
}: {
  threadId: string
}): Promise<ServerResponse<RunsPage>> {
  try {
    const openai = new OpenAI()

    const runs = await openai.beta.threads.runs.list(threadId)

    return buildResponse({ data: runs })
  } catch (error) {
    throw serverError(error)
  }
}
