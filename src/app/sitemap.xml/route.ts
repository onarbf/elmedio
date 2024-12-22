import getPosts from '@/app/(server)/tasks/getPosts'

// Adjust the path to your getPosts file
export async function GET() {
  const baseUrl = process.env.PRODUCTION_URL
  try {
    // Fetch all posts from the 'posts' collection
    const postsResponse = await getPosts({
      options: {
        limit: 5000, // Ensure it fetches all posts (you mentioned < 5000)
      },
    })

    // Extract posts data
    const posts = postsResponse?.data?.docs || []

    // Build the sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${posts
        .map(
          (post: any) => `
          <url>
            <loc>${baseUrl}/news/${post.slug}</loc>
            <lastmod>${new Date(post.updatedAt || post.createdAt).toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
          </url>
        `,
        )
        .join('')}
    </urlset>`
    console.log(sitemap)
    // Return the sitemap response
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}
