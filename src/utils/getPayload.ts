import { getPayload as payload } from 'payload'
import config from '@payload-config'
export default async function getPayload() {
  return await payload({ config })
}
