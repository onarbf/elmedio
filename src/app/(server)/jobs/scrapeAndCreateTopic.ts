import { scrapeTopics } from '@/app/(server)/tasks/scrapeTopics'
import { getPayload } from 'payload'
import config from '@payload-config'
import { buildResponse } from '@/utils/buildResponse'
import errorResponse from '@/utils/errors/errorResponse'
import { serverError } from '@/utils/errors/serverError'
import { writeTopic } from '@/app/(server)/tasks/writeTopic'
import { uploadTopic } from '@/app/(server)/tasks/uploadTopic'
import { Topic } from '@/payload-types'

export default async function scrapeAndCreateTopic() {
  try {
    const { titles } = await scrapeTopics()
    const payload = await getPayload({ config })

    if (titles?.length === 0) return false
    for (let i = 0; i < titles!.length; i++) {
      const topicExist = await payload.find({
        collection: 'topics',
        where: {
          title: {
            equals: titles![i],
          },
        },
      })
      if (topicExist.docs.length === 0) {
        const response = await uploadTopic({
          title: titles![i],
          source: 'efe.com',
          topicStatus: 'unwritten',
        } as Topic)
        return response
      }
    }

    return buildResponse({ data: 'no data' })
  } catch (error) {
    return serverError(error)
  }
}
