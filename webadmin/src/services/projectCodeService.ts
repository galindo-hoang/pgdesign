// src/services/projectCodeService.ts
const API_BASE_URL = "https://be.pgdesign.vn/api/v1/projectdetail/util";

export const generateProjectCode = async (
  category: string
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-code/${category}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    if (result.success && result.data) {
      return result.data;
    } else {
      console.error("API returned unsuccessful response:", result);
      throw new Error("Failed to generate project code");
    }
  } catch (error) {
    console.error("Error generating project code:", error);
    throw error;
  }
};
