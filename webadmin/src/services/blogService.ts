// webadmin/src/services/blogService.ts

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  status: "published" | "draft" | "archived";
  publishDate: string;
  views: number;
  featured: boolean;
  thumbnail: string;
  metadataImages: string[];
  htmlContent?: string;
  slug?: string;
  subtitle?: string;
  excerpt?: string;
  hashtags?: string[];
  readTime?: string;
  category?: string;
}

export interface BlogResponse {
  success: boolean;
  data?: BlogPost[];
  error?: string;
}

const API_BASE_URL = "https://be.pgdesign.vn/api/v1";

export const getAllBlogPosts = async (): Promise<BlogResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogposts`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch blog posts",
    };
  }
};

export const getBlogPost = async (
  id: string
): Promise<{ success: boolean; data?: BlogPost; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogposts/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch blog post",
    };
  }
};

export const deleteBlogPost = async (id: string): Promise<BlogResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogposts/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete blog post",
    };
  }
};

export const createBlogPost = async (
  post: Partial<BlogPost>
): Promise<BlogResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogposts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating blog post:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create blog post",
    };
  }
};

export const updateBlogPost = async (
  id: string,
  post: Partial<BlogPost>
): Promise<BlogResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogposts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating blog post:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update blog post",
    };
  }
};
