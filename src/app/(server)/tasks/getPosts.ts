import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import { getPayload as payload } from 'payload'
import config from '@payload-config'
import type { Options as FindOptions } from 'node_modules/payload/dist/collections/operations/local/find.js'
import { SelectIncludeType } from 'payload'

export default async function getPosts({
  options,
}: {
  options?: Omit<FindOptions<'posts', SelectIncludeType>, 'collection'>
} = {}) {
  try {
    console.log('workssss')
    const payloadServer = await payload({ config })
    console.log('works2')
    const posts = await payloadServer.find({ collection: 'posts', ...options })
    console.log('posts', posts)
    return buildResponse({ data: posts })
  } catch (error) {
    throw serverError(error)
  }
}
