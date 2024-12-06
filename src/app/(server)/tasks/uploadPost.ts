import { buildResponse } from '@/utils/buildResponse'
import { serverError } from '@/utils/errors/serverError'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Post } from '@/payload-types'
import { FlexiblePost, ServerResponse } from '@/types'

export default async function uploadPost({
  post,
}: {
  post: FlexiblePost
}): Promise<ServerResponse<Post>> {
  try {
    const payload = await getPayload({ config })

    const newPost = await payload.create({
      collection: 'posts',
      data: post,
    })
    return buildResponse({ data: newPost })
  } catch (error) {
    throw serverError(error)
  }
}
