import { getPayload } from 'payload'
import config from '@payload-config'
import { serverError } from '@/utils/errors/serverError'
import { buildResponse } from '@/utils/buildResponse'

export async function createTopic(body: any) {
  try {
    const topic = body
    const payload = await getPayload({ config })

    const newTopic = await payload.create({
      collection: 'topics',
      data: topic,
    })

    return buildResponse({ data: newTopic })
  } catch (error: any) {
    return serverError(error)
  }
}
