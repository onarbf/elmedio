import { ServerResponse } from '@/types'

export function buildResponse<T>({
  data,
  message = 'Operation successful',
  status = 200,
}: {
  data: T
  message?: string
  status?: number
}): ServerResponse<T> {
  return {
    data,
    message,
    status,
  }
}
