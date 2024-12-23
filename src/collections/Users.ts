import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  
  auth: {
    maxLoginAttempts: 50
  },
  fields: [
    // Email added by default
    {
      name: 'bio',
      type: 'text',
      required: false,
    },
    {
      name: 'profile',
      type: 'upload',
      relationTo: 'media', // Assuming you have a Media collection
      required:false
    },
  ],
}
