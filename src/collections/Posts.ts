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
      required: false,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
    },
    {
      name: 'imagePrompt',
      type: 'text',
      required: false,
    },
    { name: 'threadId', type: 'text', required: false },
    { name: 'runId', type: 'text', required: false },
    {
      name: 'slug',
      type: 'text',
      unique: true,
    },
    {
      name: 'body',
      type: 'textarea',
      required: false,
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
      required: false,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media', // Assuming you have a Media collection
    },
    {
      name: 'thumbnailUrl',
      type: 'text',
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
    {
      name: 'postStatus',
      type: 'select',
      options: [
        {
          label: 'Unwritten',
          value: 'unwritten',
        },
        {
          label: 'Unpublished',
          value: 'unpublished',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'unwritten',
      required: true,
    },
    {
      name: 'mediaStatus',
      type: 'select',
      required: true,
      defaultValue: 'unstarted',
      options: [
        { label: 'unused', value: 'Unused' },
        {
          label: 'Unstarted',
          value: 'unstarted',
        },
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
    },
  ],
}

export default Posts
