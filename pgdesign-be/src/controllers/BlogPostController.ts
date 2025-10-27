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

export const createBlogPost = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { title, content, author, status, publishDate, views, featured } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Title and content are required'
      });
    }

    const postData: Omit<BlogPostData, 'id'> = {
      title,
      content,
      author: author || 'Admin',
      status: status || 'draft',
      publishDate: publishDate || new Date().toISOString().split('T')[0],
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

    const updatedPost = await BlogPostModel.update(postId, req.body);

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
