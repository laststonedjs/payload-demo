import { isAdminField } from '@/access/isAdminField'
import { slugify } from '@/utils/slugify'
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'status', 'updatedAt'],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data

        // price validation
        if (typeof data.price === 'number' && data.price <= 0) {
          throw new Error('Price must be greater than 0.')
        }

        // publish validation
        if (data.status === 'published') {
          if (!data.category) {
            throw new Error('Cannot publish without category.')
          }

          if (!data.images || data.images.length === 0) {
            throw new Error('Cannot publish without at least one image.')
          }
        }

        // featured rule
        if (data.featured && data.inStock === false) {
          throw new Error('Out of stock products cannot be featured.')
        }

        return data
      },
    ],
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
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from title if left empty. You can override it.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      access: {
        create: isAdminField,
        update: isAdminField,
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      access: {
        create: isAdminField,
        update: isAdminField,
      },
    },
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      access: {
        update: () => false,
      },
    },
  ],
}
