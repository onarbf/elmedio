import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: false,
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: false,
    },
  ],
  upload: {
    staticDir: 'path/to/uploads',
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
}
