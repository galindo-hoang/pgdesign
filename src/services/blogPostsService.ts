// src/services/blogPostsService.ts

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  status: "published" | "draft" | "archived";
  publishDate: string;
  views: number;
  featured: boolean;
  thumbnail?: string;
  metadataImages?: string[];
  slug?: string;
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

export interface BlogPostsResponse {
  success: boolean;
  data?: BlogPost[];
  error?: string;
}

const API_BASE_URL = "https://be.pgdesign.vn/api/v1";

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogposts`);
    const result = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
};

export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogposts/${id}`);
    const result = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
};

export const getBlogPostBySlug = async (
  slug: string
): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogposts/slug/${slug}`);
    const result = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
};
