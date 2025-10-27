// pgdesign-be/src/controllers/BlogPostController.ts

import { Request, Response } from 'express';
import { BlogPostModel, BlogPostData } from '../models/BlogPostModel';
import { asyncHandler } from '../middleware/errorHandler';

export const getAllBlogPosts = asyncHandler(async (req: Request, res: Response) => {
  try {
    const posts = await BlogPostModel.findAll();
    
    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error('Error in getAllBlogPosts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blog posts'
    });
  }
});

export const getBlogPost = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Blog post ID is required'
      });
    }
    
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid blog post ID'
      });
    }

    const post = await BlogPostModel.findById(postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error in getBlogPost:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch blog post'
    });
  }
});

export const getBlogPostBySlug = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    console.log('🔍 getBlogPostBySlug called');
    console.log('📥 Request slug:', slug);
    
    if (!slug) {
      console.log('❌ No slug provided');
      return res.status(400).json({
        success: false,
        error: 'Blog post slug is required'
      });
    }

    console.log('📝 Searching for blog post with slug:', slug);
    const post = await BlogPostModel.findBySlug(slug);
    
    if (!post) {
      console.log('❌ Blog post not found for slug:', slug);
      return res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }

    console.log('✅ Blog post found:', {
      id: post.id,
      title: post.title?.substring(0, 50) + '...',
      slug: post.slug,
      hasHtmlContent: !!post.htmlContent
    });

    return res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('❌ Error in getBlogPostBySlug:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch blog post'
    });
  }
});

export const createBlogPost = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { title, content, author, status, publishDate, views, featured } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Title and content are required'
      });
    }

    // Auto-generate publishDate on backend
    const postData: any = {
      title,
      content,
      author: author || 'Admin',
      status: status || 'draft',
      publishDate: new Date().toISOString().split('T')[0], // Always generate on backend
      views: views || 0,
      featured: featured || false
    };

    const newPost = await BlogPostModel.create(postData);

    return res.status(201).json({
      success: true,
      data: newPost
    });
  } catch (error) {
    console.error('Error in createBlogPost:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create blog post'
    });
  }
});

export const updateBlogPost = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Blog post ID is required'
      });
    }
    
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid blog post ID'
      });
    }

    const existingPost = await BlogPostModel.findById(postId);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }

    // Auto-generate publishDate if not provided
    const updateData = {
      ...req.body,
      publishDate: req.body.publishDate || new Date().toISOString().split('T')[0]
    };

    const updatedPost = await BlogPostModel.update(postId, updateData);

    return res.status(200).json({
      success: true,
      data: updatedPost
    });
  } catch (error) {
    console.error('Error in updateBlogPost:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update blog post'
    });
  }
});

export const deleteBlogPost = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Blog post ID is required'
      });
    }
    
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid blog post ID'
      });
    }

    const existingPost = await BlogPostModel.findById(postId);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }

    const deleted = await BlogPostModel.delete(postId);

    if (deleted) {
      return res.status(200).json({
        success: true,
        message: 'Blog post deleted successfully'
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Failed to delete blog post'
      });
    }
  } catch (error) {
    console.error('Error in deleteBlogPost:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete blog post'
    });
  }
});
