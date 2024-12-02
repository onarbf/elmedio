import { ServerError, ServerResponse } from '@/types'
import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import OpenAI from 'openai'
import { ChatCompletionMessage } from 'openai/resources/index.mjs'

export default async function uploadPost({
  prompt,
}: {
  prompt: string
}): Promise<ServerResponse<ChatCompletionMessage>> {
  try {
    const openai = new OpenAI()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Eres un escritor de noticias de un medio para generar clickbait y rankear bien en Google.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    return buildResponse({ data: completion.choices[0].message })
  } catch (error) {
    throw serverError(error)
  }
}
