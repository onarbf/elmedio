import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import getPayload from '@/utils/getPayload'
import type { Options as FindOptions } from 'node_modules/payload/dist/collections/operations/local/find.js'
import { SelectIncludeType } from 'payload'

export default async function getTopics({
  options,
}: {
  options?: Omit<FindOptions<'topics', SelectIncludeType>, 'collection'>
} = {}) {
  try {
    const payload = await getPayload()
    const posts = await payload.find({ collection: 'topics', ...options })
    return buildResponse({ data: posts })
  } catch (error) {
    throw serverError(error)
  }
}
