import { ServerResponse } from '@/types'
import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import OpenAI from 'openai'
import { Message, MessagesPage } from 'openai/resources/beta/threads/messages.mjs'
import { Run } from 'openai/resources/beta/threads/runs/runs.mjs'
export default async function getMessagesOnThread({
  threadId,
}: {
  threadId: string
}): Promise<ServerResponse<MessagesPage>> {
  try {
    const openai = new OpenAI()

    const messages = await openai.beta.threads.messages.list(threadId)

    return buildResponse({ data: messages })
  } catch (error) {
    throw serverError(error)
  }
}
