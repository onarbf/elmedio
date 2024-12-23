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
    // Add more fields as needed
  ],
}
