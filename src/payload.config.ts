// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
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

// Determine database URL (supports DATABASE_URI or legacy MONGODB_URI for backwards compatibility)
const dbURL = process.env.DATABASE_URI || process.env.MONGODB_URI
if (!dbURL) {
  throw new Error(
    'Missing DATABASE_URI (preferred) or MONGODB_URI environment variable. Add one to your .env.\n' +
      'Examples:\n  DATABASE_URI=mongodb://mongo:27017/payload   (Docker compose)\n  DATABASE_URI=mongodb://127.0.0.1:27017/payload (Local)\n' +
      'If migrating from older config, rename MONGODB_URI to DATABASE_URI.',
  )
}

// Light runtime hint if user still has the old var name
if (!process.env.DATABASE_URI && process.env.MONGODB_URI) {
  // eslint-disable-next-line no-console
  console.warn('[payload.config] Using legacy MONGODB_URI. Consider renaming it to DATABASE_URI.')
}

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
    url: dbURL,
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
