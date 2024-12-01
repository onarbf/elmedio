'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Topic } from '@/payload-types'

export async function createTopicAction(topic: any) {
  const payload = await getPayload({ config })

  const newTopic = await payload.create({
    collection: 'topics', // required
    data: topic,
  })

  return newTopic
}
