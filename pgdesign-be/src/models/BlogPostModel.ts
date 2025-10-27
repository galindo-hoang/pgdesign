// pgdesign-be/src/models/BlogPostModel.ts

import knex from '../config/database';

export interface BlogPostRow {
  id: number;
  title: string;
  subtitle?: string;
  excerpt: string;
  thumbnail?: string;
  metadata_images?: string | any[];
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
  slug?: string;
  metadataImages?: string[];
  htmlContent?: string;
  subtitle?: string;
  excerpt?: string;
  hashtags?: string[];
  readTime?: string;
  category?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
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

  static async findBySlug(slug: string): Promise<BlogPostData | null> {
    try {
      const row = await knex('blog_posts')
        .select('*')
        .where('slug', slug)
        .first();

      return row ? this.transformRowToData(row) : null;
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
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

  static async update(id: number, data: any): Promise<BlogPostData | null> {
    try {
      const updateData: any = {};
      
      // Map frontend data to database columns
      if (data.title !== undefined) {
        updateData.title = data.title;
        // Auto-generate slug if title changes and slug is not provided
        if (data.slug === undefined) {
          updateData.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
      }
      if (data.content !== undefined || data.excerpt !== undefined) {
        updateData.excerpt = data.content || data.excerpt;
      }
      if (data.htmlContent !== undefined) updateData.html_content = data.htmlContent;
      if (data.subtitle !== undefined) updateData.subtitle = data.subtitle;
      if (data.slug !== undefined) updateData.slug = data.slug;
      if (data.thumbnail !== undefined) updateData.thumbnail = data.thumbnail;
      if (data.metadataImages !== undefined) {
        if (Array.isArray(data.metadataImages) && data.metadataImages.length > 0) {
          updateData.metadata_images = JSON.stringify(data.metadataImages);
        } else if (data.metadataImages === null || data.metadataImages === '') {
          updateData.metadata_images = null;
        }
      }
      if (data.author !== undefined) updateData.author = data.author;
      if (data.status !== undefined) updateData.status = data.status;
      if (data.publishDate !== undefined) {
        // Format as YYYY-MM-DD HH:mm:ss
        const dateStr = data.publishDate;
        // If it's already in YYYY-MM-DD format, just add time
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
          updateData.publish_date = dateStr + ' 00:00:00';
        } else {
          // Try to parse other formats
          try {
            const date = new Date(dateStr);
            if (!isNaN(date.getTime())) {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              updateData.publish_date = `${year}-${month}-${day} 00:00:00`;
            } else {
              updateData.publish_date = dateStr + ' 00:00:00';
            }
          } catch (e) {
            updateData.publish_date = dateStr + ' 00:00:00';
          }
        }
      }
      if (data.publish_date !== undefined) {
        updateData.publish_date = data.publish_date;
      }
      if (data.views !== undefined) updateData.view_count = data.views;
      if (data.view_count !== undefined) updateData.view_count = data.view_count;
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
    
    // Add slug if it exists
    if (row.slug && row.slug.trim() !== '') {
      result.slug = row.slug;
    } else {
      // Auto-generate slug if not present
      result.slug = row.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    
    // Add html content
    if (row.html_content) {
      result.htmlContent = row.html_content;
    }
    
    // Add subtitle
    if (row.subtitle) {
      result.subtitle = row.subtitle;
    }
    
    // Add excerpt
    if (row.excerpt) {
      result.excerpt = row.excerpt;
    }
    
    // Add read time
    if (row.read_time) {
      result.readTime = row.read_time;
    }
    
    // Add category
    if (row.category) {
      result.category = row.category;
    }
    
    // Add SEO fields
    if (row.seo_title) {
      result.seoTitle = row.seo_title;
    }
    if (row.seo_description) {
      result.seoDescription = row.seo_description;
    }
    if (row.seo_keywords) {
      result.seoKeywords = row.seo_keywords;
    }
    
    // Add metadataImages if it exists
    if (row.metadata_images) {
      try {
        if (typeof row.metadata_images === 'string') {
          result.metadataImages = JSON.parse(row.metadata_images);
        } else if (Array.isArray(row.metadata_images)) {
          result.metadataImages = row.metadata_images;
        }
      } catch (e) {
        console.warn('Failed to parse metadata_images:', e);
      }
    }
    
    // Add hashtags if it exists
    if (row.hashtags) {
      try {
        if (typeof row.hashtags === 'string') {
          // Try to parse as JSON first
          try {
            result.hashtags = JSON.parse(row.hashtags);
          } catch {
            // If not JSON, split by comma
            result.hashtags = row.hashtags.split(',').map(tag => tag.trim());
          }
        } else if (Array.isArray(row.hashtags)) {
          result.hashtags = row.hashtags;
        }
      } catch (e) {
        console.warn('Failed to parse hashtags:', e);
      }
    }
    
    return result;
  }
}
