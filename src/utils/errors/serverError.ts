import { buildError } from '@/utils/errors/buildError'

export function serverError(error: any) {
  console.error('Error al procesar la solicitud:', error)

  if (!error.name || !error)
    return buildError({
      name: 'UnknownError',
      message: 'Error de desconocido',
      details: error,
      status: 500,
      error,
    })

  if (error.name === 'ValidationError') {
    return buildError({
      name: error.name,
      message: error.message || 'Error de validación',
      details: error.details || error.message,
      status: 500,
      error,
    })
  }

  if (error.name === 'UnauthorizedError') {
    return buildError({
      name: error.name,
      message: 'Error de autorización',
      details: error.message,
      status: 500,
      error,
    })
  }

  if (error.name === 'PayloadError') {
    return buildError({
      name: error.name,
      message: 'Error de Payload',
      details: error.message,
      status: 500,
      error,
    })
  }

  // Manejo genérico de errores
  return buildError({
    name: error.name,
    message: 'Error Genérico',
    details: error.message,
    status: 500,
    error,
  })
}
