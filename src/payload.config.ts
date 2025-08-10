// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { cloudinaryStorage } from 'payload-storage-cloudinary'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Check if Cloudinary is configured
const isCloudinaryConfigured = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Categories, Tags],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url:
      process.env.DATABASE_URI ||
      'mongodb+srv://devankcomputer:knLLv56kVIrDLBXO@cluster0.4s7jbrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // Add Cloudinary storage if configured
    ...(isCloudinaryConfigured
      ? [
          cloudinaryStorage({
            cloudConfig: {
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
              api_key: process.env.CLOUDINARY_API_KEY!,
              api_secret: process.env.CLOUDINARY_API_SECRET!,
            },
            collections: {
              media: {
                folder: 'payload-cms',
                useFilename: true,
                uniqueFilename: true,
              },
            },
          }),
        ]
      : []),
  ],
})
