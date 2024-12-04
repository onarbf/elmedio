import { ServerResponse } from '@/types'
import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod.mjs'
import { ChatCompletionMessage } from 'openai/resources/index.mjs'
import { z } from 'zod'

export default async function writePost({ prompt }: { prompt: string }): Promise<
  ServerResponse<{
    title: string
    body: string
  } | null>
> {
  try {
    const openai = new OpenAI()

    const zPost = z.object({
      title: z.string(),
      body: z.string(),
    })

    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-2024-08-06',
      messages: [
        { role: 'system', content: 'Eres un periodista que escribe noticias en español' },
        {
          role: 'user',
          content: `Escribe una noticia sobre ${prompt}`,
        },
      ],
      response_format: zodResponseFormat(zPost, 'Object'),
    })
    const event = completion.choices[0].message.parsed

    return buildResponse({ data: event })
  } catch (error) {
    throw serverError(error)
  }
}
