export function buildError(error: any) {
  return {
    message: error.message,
    name: error.name,
    details: error.details,
    status: error.status,
    normalized: true,
    error: JSON.stringify(error),
  }
}
