import { serverError } from '@/utils/errors/serverError'
import { buildResponse } from '@/utils/buildResponse'
import { FlexibleTopic } from '@/types'
import getPayload from '@/utils/getPayload'
import { Topic } from '@/payload-types'

export async function uploadTopic(topic: Topic) {
  try {
    const payload = await getPayload()

    const newTopic = await payload.create({
      collection: 'topics',
      data: topic,
    })

    return buildResponse({ data: newTopic })
  } catch (error: any) {
    return serverError(error)
  }
}
