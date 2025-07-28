# Payload CMS Blog Template

A modern, headless CMS blog built with Payload CMS 3.0, Next.js 15, and TypeScript. Features rich text editing with Notion-style inline code, flexible image rendering, and markdown shortcuts.

## ✨ Features

- **Payload CMS v3** - Modern headless CMS with admin panel
- **Next.js 15** - React framework with App Router
- **Rich Text Editor** - Lexical editor with markdown shortcuts and inline code styling
- **Flexible Image Rendering** - Support for external images from Pexels, Unsplash, etc.
- **Media Management** - Cloudinary integration for uploads
- **TypeScript** - Full type safety throughout
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **SEO Optimized** - Meta tags and structured data
- **Docker Support** - Container-ready setup

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB database
- Cloudinary account (optional, for media uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd payload-blog-cms
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/payload-blog
   PAYLOAD_SECRET=your-secret-key
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   
   # Optional: Cloudinary (for media uploads)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## 🐳 Docker Setup

Run with Docker for a consistent development environment:

```bash
# Start MongoDB and the app
docker-compose up -d

# View logs
docker-compose logs -f app
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (frontend)/        # Public frontend pages
│   ├── (payload)/         # Payload admin routes
│   └── api/               # API endpoints
├── collections/           # Payload collections
│   ├── Posts.ts          # Blog posts
│   ├── Categories.ts     # Post categories
│   ├── Tags.ts           # Post tags
│   ├── Media.ts          # Media/images
│   └── Users.ts          # Admin users
├── components/            # React components
└── payload.config.ts     # Payload configuration

```

## 📝 Content Management

### Creating Posts

1. Go to `/admin` and login
2. Navigate to **Posts** → **Create New**
3. Use the rich text editor with markdown shortcuts:
   - `**bold**` + space → **bold text**
   - `*italic*` + space → *italic text*
   - `# heading` + space → heading
   - `- item` + space → bullet list

### Managing Media

- Upload images through the Media collection
- Cloudinary integration provides automatic optimization
- Images are responsive and lazy-loaded on the frontend

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `PAYLOAD_SECRET` | Secret key for Payload | Yes |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of your app | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | No |
| `CLOUDINARY_API_KEY` | Cloudinary API key | No |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | No |

### Database Setup

**Local MongoDB:**
```bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**MongoDB Atlas:**
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create cluster and get connection string
3. Add to `MONGODB_URI` in `.env`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

### Docker Production

```bash
# Build production image
docker build -t payload-blog .

# Run production container
docker run -p 3000:3000 --env-file .env payload-blog
```

## 🛠️ Development

### Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
```

### Adding Features

- **New Collections**: Add to `src/collections/`
- **Custom Components**: Add to `src/components/`
- **API Routes**: Add to `src/app/api/`
- **Frontend Pages**: Add to `src/app/(frontend)/`

## 📖 Documentation

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Lexical Editor](https://lexical.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push branch: `git push origin feature-name`
5. Submit pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
