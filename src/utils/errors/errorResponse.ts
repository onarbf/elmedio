import { NextResponse } from 'next/server'

export default function errorResponse(error: any) {
  console.log('error', error)

  if (error.normalized) {
    return {
      body: { message: error.message, details: error.details, error },
      options: { status: error.status },
    }
  }

  return {
    body: { error: 'Undefined ERROR' },
    options: { status: 500 },
  }
}
