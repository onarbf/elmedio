import { Post, PostsSelect } from '@/payload-types'
import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import getPayload from '@/utils/getPayload'
import type { Options as FindOptions } from 'node_modules/payload/dist/collections/operations/local/find.js'
import { SelectIncludeType } from 'payload'

export default async function getPosts({
  options,
}: {
  options?: Omit<FindOptions<'posts', SelectIncludeType>, 'collection'>
} = {}) {
  try {
    const payload = await getPayload()
    const posts = await payload.find({ collection: 'posts', ...options })
    return buildResponse({ data: posts })
  } catch (error) {
    throw serverError(error)
  }
}
