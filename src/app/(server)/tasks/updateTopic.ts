import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Topic } from '@/payload-types'
import { FlexibleTopic, ServerResponse } from '@/types'

export default async function updateTopic({
  topic,
}: {
  topic: Topic
}): Promise<ServerResponse<Topic>> {
  try {
    console.log('updateTopic')
    const payload = await getPayload({ config })
    const { id, ...data } = topic

    const updatedtopic = await payload.update({
      collection: 'topics',
      id,
      data,
    })

    return buildResponse({ data: updatedtopic })
  } catch (error) {
    throw serverError(error)
  }
}
