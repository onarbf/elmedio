import { scrapeTopics } from '@/app/(server)/tasks/scrapeTopics'
import { getPayload } from 'payload'
import config from '@payload-config'
import { createTopic } from '@/app/(server)/tasks/createTopic'
import { buildResponse } from '@/utils/buildResponse'
import errorResponse from '@/utils/errors/errorResponse'
import { serverError } from '@/utils/errors/serverError'

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
        const response = await createTopic({
          title: titles![i],
          source: 'efe.com',
          topicStatus: 'unwritten',
        })

        return response
      }
    }

    return buildResponse({ data: 'no data' })
  } catch (error) {
    return serverError(error)
  }
}
