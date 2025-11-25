# Modern Blog Platform

![App Preview](https://imgix.cosmicjs.com/cba153a0-c9b0-11f0-8de3-a3b971be7f0b-photo-1473496169904-658ba7c44d8a-1764042161508.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive blog platform built with Next.js 16 and Cosmic CMS. Features a clean design, dynamic content display, and seamless integration with your blog content structure.

## Features

- 📝 Dynamic blog post display with rich content rendering
- 👤 Author profiles with dedicated pages and post listings
- 🏷️ Category-based navigation and filtering
- 📱 Fully responsive design for all devices
- 🎨 Modern UI with Tailwind CSS
- ⚡ Server-side rendering for optimal performance
- 🔍 SEO optimized with proper meta tags
- 📸 Optimized image loading with imgix
- 🎯 Type-safe with TypeScript

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=692525673607fb35962e3929&clone_repository=692526963607fb35962e3950)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for "Create a content model for a blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React Markdown** - Markdown content rendering
- **Bun** - Fast package manager and runtime

## Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with bucket configured
- Node.js 18+ (for compatibility)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Posts

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all posts with author and category data
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .depth(1)
```

### Fetching by Category

```typescript
// Get posts for a specific category
const { objects: posts } = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.categories': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Author Posts

```typescript
// Get all posts by a specific author
const { objects: posts } = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.author': authorId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses Cosmic as a headless CMS with the following content structure:

- **Posts** - Blog articles with markdown content, featured images, author, and categories
- **Authors** - Author profiles with bio, photo, and email
- **Categories** - Content organization with descriptions

The integration uses depth queries to efficiently fetch related content in a single API call.

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the deploy button above
2. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
3. Deploy!

### Environment Variables

Make sure to set these in your deployment platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Home page with featured posts
│   ├── posts/
│   │   └── [slug]/         # Individual post pages
│   ├── categories/
│   │   └── [slug]/         # Category listing pages
│   └── authors/
│       └── [slug]/         # Author profile pages
├── components/
│   ├── PostCard.tsx        # Blog post preview card
│   ├── CategoryBadge.tsx   # Category display component
│   ├── AuthorCard.tsx      # Author information display
│   ├── MarkdownContent.tsx # Markdown renderer
│   └── CosmicBadge.tsx     # Built with Cosmic badge
├── lib/
│   └── cosmic.ts           # Cosmic SDK configuration
└── types.ts                # TypeScript type definitions
```

## License

MIT

<!-- README_END -->