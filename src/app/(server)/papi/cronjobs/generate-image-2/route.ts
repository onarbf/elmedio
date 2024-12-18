import getPosts from '@/app/(server)/tasks/getPosts'
import updatePost from '@/app/(server)/tasks/updatePost'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { experimental_generateImage as generateImage } from 'ai'
import { openai } from '@ai-sdk/openai'
import { Readable } from 'stream'
import errorResponse from '@/utils/errors/errorResponse'
import getPayload from '@/utils/getPayload'

export const config = {
  runtime: 'edge', // Configuración para Edge Function
}

export async function GET() {
  try {
    const payload = await getPayload()
    const { data: post } = await getPosts({
      options: {
        where: {
          mediaStatus: {
            equals: 'unstarted',
          },
        },
      },
    })

    const { data: updatedPost } = await updatePost({
      post: { ...post.docs[0], mediaStatus: 'pending' }, // Cambiar estado a pending
    })

    // Generar imagen con OpenAI
    const { image } = await generateImage({
      model: openai.image('dall-e-3'),
      prompt: `Make a nice image, without violence about ${updatedPost.title}`,
      n: 1,
      size: '1024x1024',
    })

    // Convertir el buffer base64 en Uint8Array
    const imageBuffer = base64ToArrayBuffer(image.base64)
    const imageUint8Array = new Uint8Array(imageBuffer)

    // Crear un objeto legible desde Uint8Array
    const imageStream = Readable.from(imageUint8Array)

    // Subir directamente la imagen generada a la colección `media`
    const newMedia = await payload.create({
      collection: 'media',
      data: {},
      file: {
        stream: imageStream,
        filename: `generated-${Date.now()}.png`,
        mimetype: 'image/png',
      },
    })

    // Actualizar el post con el estado correcto
    await updatePost({
      post: { ...post.docs[0], mediaStatus: 'published', thumbnail: newMedia.id },
    })

    console.log('Post updated successfully!')

    return NextResponse.json({ message: 'Processing started', post: updatedPost })
  } catch (error) {
    console.error('Error:', error)
    const { body, options } = errorResponse(error)
    return NextResponse.json(body, options)
  }
}

// Conversión base64 a ArrayBuffer
function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64) // Decodifica el Base64
  const len = binaryString.length
  const bytes = new Uint8Array(len) // Crea un Uint8Array
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i) // Asigna cada byte
  }
  return bytes.buffer // Devuelve el ArrayBuffer
}
