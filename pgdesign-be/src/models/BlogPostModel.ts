// pgdesign-be/src/models/BlogPostModel.ts

import knex from '../config/database';

export interface BlogPostRow {
  id: number;
  title: string;
  subtitle?: string;
  excerpt: string;
  thumbnail?: string;
  view_count: number;
  hashtags?: string;
  publish_date: string;
  slug: string;
  html_content: string;
  author?: string;
  read_time?: string;
  category?: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPostData {
  id: string;
  title: string;
  content: string;
  author: string;
  status: 'published' | 'draft' | 'archived';
  publishDate: string;
  views: number;
  featured: boolean;
  thumbnail?: string;
}

export class BlogPostModel {
  static async findAll(): Promise<BlogPostData[]> {
    try {
      const rows = await knex('blog_posts')
        .select('*')
        .orderBy('created_at', 'desc');

      return rows.map(this.transformRowToData);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  }

  static async findById(id: number): Promise<BlogPostData | null> {
    try {
      const row = await knex('blog_posts')
        .select('*')
        .where('id', id)
        .first();

      return row ? this.transformRowToData(row) : null;
    } catch (error) {
      console.error('Error fetching blog post by id:', error);
      throw error;
    }
  }

  static async create(data: Omit<BlogPostData, 'id'>): Promise<BlogPostData> {
    try {
      const [insertedId] = await knex('blog_posts').insert({
        title: data.title,
        excerpt: data.content, // Use content as excerpt
        html_content: data.content, // Also store as html_content
        author: data.author,
        status: data.status,
        publish_date: data.publishDate,
        view_count: data.views,
        featured: data.featured,
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      });

      if (!insertedId) {
        throw new Error('Failed to create blog post');
      }

      const newPost = await this.findById(insertedId);
      if (!newPost) {
        throw new Error('Failed to create blog post');
      }

      return newPost;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  }

  static async update(id: number, data: Partial<BlogPostData>): Promise<BlogPostData | null> {
    try {
      const updateData: any = {};
      
      if (data.title) updateData.title = data.title;
      if (data.content) updateData.content = data.content;
      if (data.author) updateData.author = data.author;
      if (data.status) updateData.status = data.status;
      if (data.publishDate) updateData.publish_date = data.publishDate;
      if (data.views !== undefined) updateData.views = data.views;
      if (data.featured !== undefined) updateData.featured = data.featured;

      await knex('blog_posts')
        .where('id', id)
        .update(updateData);

      return await this.findById(id);
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      const deletedRows = await knex('blog_posts')
        .where('id', id)
        .del();

      return deletedRows > 0;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  }

  private static transformRowToData(row: BlogPostRow): BlogPostData {
    const defaultDate = new Date().toISOString().split('T')[0] as string;
    let publishDate: string = defaultDate;
    
    if (row.publish_date) {
      const dateStr = row.publish_date.toString();
      if (dateStr) {
        const parts = dateStr.split('T');
        if (parts && parts.length > 0 && parts[0]) {
          publishDate = parts[0];
        }
      }
    }
    
    const result: BlogPostData = {
      id: row.id.toString(),
      title: row.title,
      content: row.excerpt || row.html_content || '', // Use excerpt as content for list view
      author: row.author || 'Admin',
      status: row.status || 'draft',
      publishDate,
      views: row.view_count || 0,
      featured: row.featured || false
    };
    
    // Add thumbnail if it exists and is not empty
    if (row.thumbnail && row.thumbnail.trim() !== '') {
      result.thumbnail = row.thumbnail;
    }
    
    return result;
  }
}
