import getPosts from '@/app/(server)/tasks/getPosts'
import updatePost from '@/app/(server)/tasks/updatePost'
import { Post } from '@/payload-types'
import errorResponse from '@/utils/errors/errorResponse'
import getPayload from '@/utils/getPayload'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import fs from 'fs'

import path from 'path'

export const maxDuration = 300

export async function GET() {
  try {
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

    await processImageGeneration({ post: post.docs[0] })

    return NextResponse.json({ message: 'Processing Ended', post: updatedPost })
  } catch (error) {
    const { body, options } = errorResponse(error)
    return NextResponse.json(body, options)
  }
}

async function processImageGeneration({ post }: { post: Post }) {
  try {
    const payload = await getPayload()
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    console.log('FUNCIONA 3')
    // Generar la imagen
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `Make a nice image, without violence about ${post.title}`,
      n: 1,
      size: '1024x1024',
    })
    console.log('FUNCIONA 4')
    const imageUrl = response.data[0].url

    // Descargar la imagen
    const imageResponse = await fetch(imageUrl!)
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`)
    }

    const imageBuffer = await imageResponse.arrayBuffer()
    console.log('FUNCIONA 5')
    // Configurar la ruta de almacenamiento
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
  } catch (error) {
    console.error('Error generating image:', error)

    // Actualizar el estado del post en caso de error
    await updatePost({
      post: { ...post, mediaStatus: 'unstarted' },
    })
  }
}
