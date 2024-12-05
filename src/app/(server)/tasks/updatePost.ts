import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Post } from '@/payload-types'
import { FlexiblePost, ServerError, ServerResponse } from '@/types'

export default async function updatePost({
  post,
}: {
  post: FlexiblePost & { id: string }
}): Promise<ServerResponse<Post>> {
  try {
    const payload = await getPayload({ config })
    const { id, ...data } = post

    const updatedPost = await payload.update({
      collection: 'posts',
      id,
      data,
    })

    return buildResponse({ data: updatedPost })
  } catch (error) {
    throw serverError(error)
  }
}
