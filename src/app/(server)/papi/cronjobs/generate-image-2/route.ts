import getPosts from '@/app/(server)/tasks/getPosts'
import updatePost from '@/app/(server)/tasks/updatePost'
import { Post } from '@/payload-types'
import errorResponse from '@/utils/errors/errorResponse'
import getPayload from '@/utils/getPayload'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import fs from 'fs'

import path from 'path'
import { experimental_generateImage as generateImage } from 'ai'
import { openai } from '@ai-sdk/openai'

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
      post: { ...post.docs[0], mediaStatus: 'unstarted' }, //CHANGE to pending
    })

    const { image } = await generateImage({
      model: openai.image('dall-e-3'),
      prompt: `Make a nice image, without violence about ${updatedPost.title}`,
      n: 1,
      size: '1024x1024',
    })
    const imageBuffer = base64ToArrayBuffer(image.base64)
    console.log('image', image)

    const uploadsDir = path.join(process.cwd(), 'temp/uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true }) // Crear el directorio si no existe
    }

    const filePath = path.join(uploadsDir, `generated-${Date.now()}.png`)
    fs.writeFileSync(filePath, Buffer.from(imageBuffer))
    console.log('FUNCIONA 6')
    // Subir la imagen a la colección `media`
    const newMedia = await payload.create({
      collection: 'media',
      data: {},
      filePath: filePath, // Ruta del archivo guardado
    })
    console.log('FUNCIONA 7')
    // Actualizar el post con el estado correcto
    await updatePost({
      post: { ...post, mediaStatus: 'published', thumbnail: newMedia.id },
    })

    console.log('Post updated successfully!')

    return NextResponse.json({ message: 'Processing started', post: updatedPost })
  } catch (error) {
    const { body, options } = errorResponse(error)
    return NextResponse.json(body, options)
  }
}

function base64ToArrayBuffer(base64: Base64URLString) {
  const binaryString = atob(base64) // Decodifica el Base64
  const len = binaryString.length
  const bytes = new Uint8Array(len) // Crea un Uint8Array
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i) // Asigna cada byte
  }
  return bytes.buffer // Devuelve el ArrayBuffer
}
