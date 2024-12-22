import getPosts from '@/app/(server)/tasks/getPosts'
import updatePost from '@/app/(server)/tasks/updatePost'
import { Post, Topic } from '@/payload-types'
import errorResponse from '@/utils/errors/errorResponse'
import getPayload from '@/utils/getPayload'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import fs from 'fs'

import path from 'path'
import updateTopic from '@/app/(server)/tasks/updateTopic'

export const maxDuration = 300

export async function GET() {
  try {
    const { data: post } = await getPosts({
      options: {
        where: {
          mediaStatus: {
            equals: 'unstarted',
          },
          type: {
            equals: 'news',
          },
        },
      },
    })

    const { data: updatedPost } = await updatePost({
      post: { ...post.docs[0], mediaStatus: 'pending' },
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
    // Generar la imagen
    const response = await openai.images.generate({
      model: 'dall-e-2',
      prompt: `Make a nice image about ${post.imagePrompt}. Please, be careful with content policy and respect it. Don't do anything racist, sexual or violent.`,
      n: 1,
      size: '1024x1024',
    })
    const imageUrl = response.data[0].url

    // Descargar la imagen
    const imageResponse = await fetch(imageUrl!)
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`)
    }

    const imageBuffer = await imageResponse.arrayBuffer()
    console.log('FUNCIONA 5')
    // Configurar la ruta de almacenamiento
    const uploadsDir = '/tmp'
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
      filePath: filePath,
    })
    console.log('FUNCIONA 7')
    // Actualizar el post con el estado correcto
    const { data: updatedPost } = await updatePost({
      post: { ...post, postStatus: 'published', mediaStatus: 'published', thumbnail: newMedia.id },
    })

    console.log(updatedPost)
    const topic = post.topic as Topic
    console.log('topic ', topic)
    const postsTopic = topic.posts as Post[]
    console.log('postsTopic', postsTopic)
    const updatedPostsTopics = postsTopic ? [...postsTopic, updatedPost] : [updatedPost]
    await updateTopic({
      topic: { ...topic, posts: updatedPostsTopics, topicStatus: 'published' },
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
