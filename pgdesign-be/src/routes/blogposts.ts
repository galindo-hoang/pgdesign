// pgdesign-be/src/routes/blogposts.ts

import express from 'express';
import {
  getAllBlogPosts,
  getBlogPost,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '../controllers/BlogPostController';

const router = express.Router();

// GET /api/v1/blogposts - Get all blog posts
router.get('/', getAllBlogPosts);

// GET /api/v1/blogposts/slug/:slug - Get a specific blog post by slug
router.get('/slug/:slug', getBlogPostBySlug);

// GET /api/v1/blogposts/:id - Get a specific blog post by ID
router.get('/:id', getBlogPost);

// POST /api/v1/blogposts - Create a new blog post
router.post('/', createBlogPost);

// PUT /api/v1/blogposts/:id - Update a blog post
router.put('/:id', updateBlogPost);

// DELETE /api/v1/blogposts/:id - Delete a blog post
router.delete('/:id', deleteBlogPost);

export default router;
