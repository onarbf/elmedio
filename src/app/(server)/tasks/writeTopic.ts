import { getPayload } from 'payload'
import config from '@payload-config'
import { serverError } from '@/utils/errors/serverError'
import { buildResponse } from '@/utils/buildResponse'
import { Topic } from '@/payload-types'
import { FlexibleTopic } from '@/types'

export async function writeTopic(topic: FlexibleTopic) {
  try {
    console.log('topic', topic)
    return buildResponse({ data: topic })
  } catch (error: any) {
    return serverError(error)
  }
}
