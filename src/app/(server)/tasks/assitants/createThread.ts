import { ServerResponse } from '@/types'
import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import OpenAI from 'openai'
export default async function createThread(): Promise<ServerResponse<any>> {
  try {
    const openai = new OpenAI()

    const emptyThread = await openai.beta.threads.create()

    return buildResponse({ data: emptyThread })
  } catch (error) {
    throw serverError(error)
  }
}
