import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Supports Markdown text.',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users', // Assuming "users" is the slug for your Users collection
      required: true,
    },
    {
      name: 'topic',
      type: 'relationship',
      relationTo: 'topics',
      required: true,
    },
    {
      name: 'categories',
      type: 'select',
      options: [
        {
          label: 'News',
          value: 'news',
        },
        {
          label: 'Opinion',
          value: 'opinion',
        },
        {
          label: 'Feature',
          value: 'feature',
        },
      ],
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media', // Assuming you have a Media collection
    },
    {
      name: 'sources',
      type: 'array',
      fields: [
        {
          name: 'source',
          type: 'text',
        },
      ],
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [({ value }) => value || new Date().toISOString()],
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
  ],
}

export default Posts
