import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: false,
    },
  ],
  upload: true,
  access: {
    read: () => true,
  },
}
