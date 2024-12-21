import type { CollectionConfig } from 'payload'

export const Topics: CollectionConfig = {
  slug: 'topics',
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
      name: 'source',
      type: 'text',
      required: true,
    },
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
    },
    {
      name: 'topicStatus',
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
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'News',
          value: 'news',
        },
        {
          label: 'Shitpost',
          value: 'shitpost',
        },
      ],
      defaultValue: 'news',
      required: true,
    },
    {
      name: 'publishAt',
      type: 'date',
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
  ],
}
