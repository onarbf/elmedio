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
