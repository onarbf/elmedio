import { ServerResponse } from '@/types'
import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import OpenAI from 'openai'
import { Message } from 'openai/resources/beta/threads/messages.mjs'
import { Run } from 'openai/resources/beta/threads/runs/runs.mjs'
import { Thread } from 'openai/resources/beta/threads/threads.mjs'
export default async function createMessageOnThread({
  thread,
  prompt,
}: {
  thread: Thread
  prompt: string
}): Promise<ServerResponse<Message>> {
  try {
    const openai = new OpenAI()

    const messages = await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: prompt,
    })

    console.log(messages)

    return buildResponse({ data: messages })
  } catch (error) {
    throw serverError(error)
  }
}
