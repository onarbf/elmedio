import uploadPost from '@/app/(server)/tasks/uploadPost'
import writePost from '@/app/(server)/tasks/writePost'
import errorResponse from '@/utils/errors/errorResponse'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const prompt = 'Qué significa el nombre Leire?'
    const { data } = await writePost({ prompt })
    console.log('data', data)

    const cookedPost = {
      body: data!.body,
      title: data!.title,
      author: 1,
      categories: 'news',
      topic: 8,
    }
    /* 
    const { data: uploadedPost } = await uploadPost({ post: cookedPost })
    console.log('uploadedPost', uploadedPost) */

    return NextResponse.json(cookedPost)
  } catch (error) {
    const { body, options } = errorResponse(error)
    return NextResponse.json({ body, options })
  }
}
