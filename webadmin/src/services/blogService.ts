// webadmin/src/services/blogService.ts

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  status: 'published' | 'draft' | 'archived';
  publishDate: string;
  views: number;
  featured: boolean;
}

export interface BlogResponse {
  success: boolean;
  data?: BlogPost[];
  error?: string;
}

const API_BASE_URL = 'http://localhost:3002/api/v1';

export const getAllBlogPosts = async (): Promise<BlogResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogposts`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch blog posts'
    };
  }
};

export const deleteBlogPost = async (id: string): Promise<BlogResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogposts/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete blog post'
    };
  }
};
