# Enhanced Rich Text Configuration Guide

## 🚀 Features Overview

Your Payload CMS now includes a comprehensive rich text editor with Notion-like capabilities:

### 📋 Available Block Types
- **Code Blocks**: Syntax highlighting with 25+ languages, themes, and line numbers
- **Media Images**: From your media library with size/alignment options
- **Callouts**: 7 types (info, warning, error, success, note, tip, important)
- **Quotes**: With author attribution and avatars
- **Embeds**: YouTube, Vimeo, CodePen, and more
- **Image Galleries**: Grid, carousel, and masonry layouts

### ⌨️ How to Use Slash Commands (Alternative)

Since native slash commands aren't available in the current Lexical version, you can:

1. **Use the Block Menu**: Click the "+" button in the editor
2. **Access via Toolbar**: Look for block insertion options
3. **Keyboard Shortcuts**: Use the toolbar shortcuts

### 🎨 Block Usage Examples

#### Code Blocks
```javascript
// Example usage
function greet(name) {
  return `Hello, ${name}!`
}
```

#### Callouts
💡 **Info**: Use for helpful information
⚠️ **Warning**: Important notices
❌ **Error**: Critical issues
✅ **Success**: Positive feedback

## 🔧 Configuration Details

### Media Upload Configuration
- **Cloud Storage**: Automatically uploads to your configured cloud provider
- **Image Processing**: Automatic optimization and resizing
- **CDN Integration**: Fast global delivery

### Code Block Features
- **25+ Languages**: JavaScript, Python, TypeScript, etc.
- **Themes**: Dark, Light, VS Code Dark, GitHub Light, Dracula
- **Line Numbers**: Optional line numbering
- **Syntax Highlighting**: Powered by Prism.js
- **Copy Button**: One-click code copying

### Media Image Options
- **Sizes**: Small (400px), Medium (600px), Large (800px), XL (1000px), Full Width
- **Alignment**: Left, Center, Right
- **Styling**: Rounded corners, shadows, captions
- **Responsive**: Automatic mobile optimization

## 🎯 Frontend Rendering

### Component Structure
```typescript
// Available components:
- NotionCodeBlock: Advanced code blocks
- MediaImageBlock: Enhanced image display
- CalloutBlock: Styled alerts/callouts
- QuoteBlock: Testimonials and quotes
- EmbedBlock: Video and content embeds
```

### Integration Example
```jsx
import { RichTextRenderer } from '@/components/RichTextRenderer'

// In your component
<RichTextRenderer content={post.content} />
```

## 📱 Responsive Design
All blocks are fully responsive and mobile-optimized:
- Images scale appropriately
- Code blocks have horizontal scroll on mobile
- Callouts stack content properly
- Embeds maintain aspect ratios

## 🎨 Styling
The components use Tailwind CSS with:
- Dark mode support
- Consistent spacing and typography
- Hover effects and transitions
- Accessibility features

## 🔌 Extending Further

### Adding Custom Blocks
1. Create a new component in `/src/components/`
2. Add block configuration to `Posts.ts`
3. Update `RichTextRenderer.tsx` to handle the new block
4. Regenerate types with `pnpm generate:types`

### Styling Customization
- Edit Tailwind classes in components
- Add custom CSS for specific needs
- Configure theme colors and spacing

## 📊 Performance
- **Lazy Loading**: Images load on demand
- **Code Splitting**: Syntax highlighter loads only when needed
- **Optimized Bundles**: Tree-shaking removes unused code
- **CDN Delivery**: Fast media loading from cloud storage

## 🔒 Security
- **XSS Protection**: Content is sanitized
- **CORS Configured**: Secure embed loading
- **Input Validation**: All fields are validated
- **Safe Rendering**: React prevents injection attacks
