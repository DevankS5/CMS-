# Setup Instructions

This is a clean Payload CMS blog template ready for deployment. To set it up for your company:

## 1. Environment Configuration

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:
- `MONGODB_URI` - Your MongoDB connection string
- `PAYLOAD_SECRET` - Generate a secure random string
- `NEXT_PUBLIC_SERVER_URL` - Your app's public URL

Optional (for image uploads):
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key  
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

## 2. Install Dependencies

```bash
pnpm install
```

## 3. Run Development Server

```bash
pnpm dev
```

## 4. Access Admin Panel

Visit `http://localhost:3000/admin` to create your first admin user and start managing content.

## Features Included

- ✅ Rich text editor with Notion-style inline code
- ✅ Flexible image rendering (supports external images)
- ✅ Hydration error suppression
- ✅ Categories and tags system
- ✅ Responsive design
- ✅ SEO optimization
- ✅ Docker support

## Production Deployment

For production, set the environment variables in your hosting platform and run:

```bash
pnpm build
pnpm start
```

The template is ready to deploy to Vercel, Netlify, or any Node.js hosting platform.
