# Blog CMS - Payload CMS Setup

This is a headless CMS built with Payload CMS for managing your blog content. You can use this to write, edit, and manage your blog posts, and then display them on any external website.

## 🚀 Features

- **Blog Posts Management**: Create, edit, and publish blog posts
- **Rich Text Editor**: Advanced content editor with formatting options
- **Media Management**: Upload and manage images and files
- **Categories & Tags**: Organize content with categories and tags
- **SEO Optimization**: Built-in SEO fields for better search rankings
- **Author Management**: Multiple authors with profiles and social links
- **API Endpoints**: RESTful APIs for external websites to consume content
- **Status Management**: Draft, published, and archived post states

## 📋 Collections

### 1. Posts
- Title, slug, excerpt, and rich content
- Featured images and media
- Author and category relationships
- Tags for better organization
- SEO metadata (title, description, keywords)
- Reading time calculation
- Publication status and dates

### 2. Categories
- Name, slug, and description
- Color coding and icons
- SEO settings

### 3. Tags
- Name, slug, and description
- Color coding
- SEO settings

### 4. Users (Authors)
- Name, email, and role
- Biography and avatar
- Social media links
- Role-based permissions

### 5. Media
- File uploads with alt text
- Image optimization

## 🔧 Setup Instructions

### 1. Start the Development Server
```bash
pnpm dev
```

### 2. Access the Admin Panel
Open your browser and go to: `http://localhost:3000/admin`

### 3. Create Your First Admin User
- Follow the setup wizard to create your first admin account
- This will be your main account for managing content

### 4. Set Up Your Content Structure
1. **Create Categories**: Go to "Categories" and create your main blog categories
2. **Create Tags**: Go to "Tags" and create relevant tags for your content
3. **Update Your Profile**: Go to "Users" and update your author profile

### 5. Create Your First Blog Post
1. Go to "Posts" → "Create New"
2. Fill in the title, content, and other required fields
3. Select a category and add relevant tags
4. Set status to "Published" when ready
5. Click "Save"

## 🌐 API Endpoints for External Websites

Your external website can fetch content using these API endpoints:

### Get All Posts
```
GET /api/posts
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Posts per page (default: 10)
- `category`: Filter by category slug
- `tag`: Filter by tag slug
- `status`: Filter by status (default: published)

**Example:**
```javascript
// Get first 10 published posts
fetch('http://localhost:3000/api/posts')

// Get posts from specific category
fetch('http://localhost:3000/api/posts?category=technology')

// Get posts with specific tag
fetch('http://localhost:3000/api/posts?tag=javascript')
```

### Get Single Post
```
GET /api/posts/[slug]
```

**Example:**
```javascript
// Get specific post by slug
fetch('http://localhost:3000/api/posts/my-awesome-blog-post')
```

### Get Categories
```
GET /api/categories
```

### Get Tags
```
GET /api/tags
```

## 📱 Example Integration Code

Here's how you can integrate this CMS with your external website:

### React/Next.js Example
```javascript
// Fetch all posts
const fetchPosts = async () => {
  const response = await fetch('http://localhost:3000/api/posts')
  const data = await response.json()
  return data.data.docs
}

// Fetch single post
const fetchPost = async (slug) => {
  const response = await fetch(`http://localhost:3000/api/posts/${slug}`)
  const data = await response.json()
  return data.data
}

// Fetch categories
const fetchCategories = async () => {
  const response = await fetch('http://localhost:3000/api/categories')
  const data = await response.json()
  return data.data.docs
}
```

### Vanilla JavaScript Example
```javascript
// Display posts on your website
async function displayPosts() {
  try {
    const response = await fetch('http://localhost:3000/api/posts')
    const data = await response.json()
    
    const postsContainer = document.getElementById('posts')
    
    data.data.docs.forEach(post => {
      const postElement = document.createElement('article')
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.excerpt}</p>
        <small>By ${post.author.name} • ${new Date(post.publishedAt).toLocaleDateString()}</small>
      `
      postsContainer.appendChild(postElement)
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}
```

## 🚀 Deployment to Netlify

### 1. Prepare for Production
1. Update your `.env` file with production values:
   ```
   DATABASE_URI=your-production-mongodb-uri
   PAYLOAD_SECRET=your-production-secret
   NODE_ENV=production
   ```

2. Build the project:
   ```bash
   pnpm build
   ```

### 2. Deploy to Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `pnpm build`
4. Set publish directory: `.next`
5. Add environment variables in Netlify dashboard

### 3. Update External Website URLs
After deployment, update your external website to use the production API URLs:
```javascript
// Instead of localhost:3000, use your Netlify domain
const API_BASE = 'https://your-app.netlify.app'

// Fetch posts from production
fetch(`${API_BASE}/api/posts`)
```

## 📊 Content Management Workflow

### 1. Writing a New Post
1. Log into the admin panel
2. Go to "Posts" → "Create New"
3. Write your title and content
4. Add an excerpt for previews
5. Select a category and add tags
6. Upload a featured image
7. Fill in SEO metadata
8. Set status to "Draft" for review or "Published" to go live

### 2. Managing Content
- **Drafts**: Work on posts without publishing
- **Published**: Live posts visible to your audience
- **Archived**: Hide posts without deleting them

### 3. SEO Optimization
- Use descriptive titles and excerpts
- Add relevant keywords
- Optimize meta descriptions
- Use proper heading structure in content

## 🔒 Security Notes

- Keep your `PAYLOAD_SECRET` secure and unique
- Regularly update dependencies
- Use strong passwords for admin accounts
- Consider implementing rate limiting for API endpoints in production

## 📞 Support

If you need help:
1. Check the Payload CMS documentation: https://payloadcms.com/docs
2. Review the API responses for error details
3. Check the browser console for client-side errors
4. Monitor the server logs for backend issues

## 🎯 Next Steps

1. **Customize the Admin UI**: Modify the admin panel appearance
2. **Add More Collections**: Create additional content types as needed
3. **Implement Caching**: Add caching for better performance
4. **Add Analytics**: Track content performance
5. **Set Up Webhooks**: Automate content publishing workflows

Happy blogging! 🚀 