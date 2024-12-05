import { User } from '@/payload-types'
import { buildResponse } from '@/utils/buildResponse'
import errorResponse from '@/utils/errors/errorResponse'
import { serverError } from '@/utils/errors/serverError'
import getPayload from '@/utils/getPayload'

import type { Options as FindOptions } from 'node_modules/payload/dist/collections/operations/local/find.js'
import { SelectIncludeType } from 'payload'

export default async function getUsers({
  options,
}: {
  options?: Omit<FindOptions<'users', SelectIncludeType>, 'collection'>
} = {}) {
  try {
    const payload = await getPayload()
    const users = await payload.find({
      collection: 'users',
      ...options,
    })
    return buildResponse({ data: users })
  } catch (error) {
    throw serverError(error)
  }
}
