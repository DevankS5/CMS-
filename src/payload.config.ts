// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
    cloudStorage({
      collections: {
        media: {
          adapter: 's3',
          config: {
            region: process.env.AWS_REGION,
            bucket: process.env.AWS_BUCKET,
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
          },
        },
      },
    }),
    // storage-adapter-placeholder
  ],
})
