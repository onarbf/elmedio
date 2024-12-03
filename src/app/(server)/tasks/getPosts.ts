import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import getPayload from '@/utils/getPayload'

export default async function getPosts() {
  try {
    const payload = await getPayload()
    const posts = payload.find({ collection: 'posts' })
    return buildResponse({ data: posts })
  } catch (error) {
    throw serverError(error)
  }
}
