export function buildResponse({
  data,
  message = 'Operación exitosa',
  status = 200,
}: {
  data: any
  message?: string
  status?: number
}) {
  return {
    status,
    message,
    data,
  }
}
