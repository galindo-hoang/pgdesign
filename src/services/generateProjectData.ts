// Script to generate project data from actual folder structure
// Run this to update additionalProjectData.ts

import { ProjectDetail } from "../types/projectCategoryPageTypes";

// Helper function to generate project data from folder name
const generateProjectFromFolder = (
  folderName: string,
  category: string,
  id: number
): ProjectDetail => {
  const parts = folderName.split(" - ");
  const clientName = parts[0];
  const projectName = parts.slice(1).join(" - ");

  // Extract location from project name
  const locationMatch = projectName.match(/(.+?)\s*-\s*(.+)$/);
  const projectTitle = locationMatch ? locationMatch[1].trim() : projectName;
  const location = locationMatch ? locationMatch[2].trim() : "";

  // Generate image paths
  const basePath = `/assets/${category}/${folderName}`;
  const imageCount = 22; // Default count, will be adjusted based on actual files
  const projectImages = Array.from(
    { length: imageCount },
    (_, i) => `${basePath}/${i}.png`
  );

  return {
    id,
    projectId: `${category.toUpperCase()}${id.toString().padStart(3, "0")}`,
    title: `Thiết Kế ${projectTitle}`,
    clientName,
    area: "110m²", // Default area
    constructionDate: "2024-01-01",
    address: location,
    description: `Thiết kế ${
      category === "appartment"
        ? "căn hộ"
        : category === "house-normal"
        ? "nhà phố"
        : category === "village"
        ? "biệt thự"
        : "không gian thương mại"
    } tại ${location} với phong cách hiện đại và tiện nghi.`,
    category,
    projectCategoryId:
      category === "appartment"
        ? 2
        : category === "house-normal"
        ? 1
        : category === "village"
        ? 3
        : 4,
    style: "Hiện đại",
    thumbnailImage: `${basePath}/0.png`,
    htmlContent: `<div><h3>Thiết Kế ${projectTitle}</h3><p>Dự án thiết kế ${
      category === "appartment"
        ? "căn hộ"
        : category === "house-normal"
        ? "nhà phố"
        : category === "village"
        ? "biệt thự"
        : "không gian thương mại"
    } tại ${location} với phong cách hiện đại, tiện nghi và phù hợp với nhu cầu sử dụng.</p></div>`,
    projectImages,
    projectStatus: "Hoàn thành • 500 triệu",
    completionDate: "2024-06-30",
    architectName: "KTS. PG Design",
    contractorName: "PG Design",
    metaTitle: `Thiết Kế ${projectTitle}`,
    metaDescription: `Thiết kế ${
      category === "appartment"
        ? "căn hộ"
        : category === "house-normal"
        ? "nhà phố"
        : category === "village"
        ? "biệt thự"
        : "không gian thương mại"
    } tại ${location}`,
    tags: [
      category === "appartment"
        ? "căn hộ"
        : category === "house-normal"
        ? "nhà phố"
        : category === "village"
        ? "biệt thự"
        : "không gian thương mại",
      "nội thất",
      "hiện đại",
      location,
    ],
    isOnHomePage: false,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-06-30T00:00:00Z",
  };
};

// Appartment projects
const appartmentFolders = [
  "ANH DANG - PHU GIA HUNG - GO VAP",
  "ANH LONG - OPAL GARDEN - HIEP BINH HCM",
  "CHI NHI - DIAMOND - TAN PHU",
  "ANH TUAN - CITYLAND PARK HILL - GO VAP",
  "CHI THUY - URBAN - hIEP bINH HCM",
  "CHI LINH - Midoripark The Glory - BINH DUONG",
  "CHI HA - PEGASUITE - Q8",
  "ANH PHUC - PICITY - Q12",
  "CHI LAN - CITYGATE - Q8",
  "ANH MINH - CITYLAND PARK HILL - GO VAP",
];

// House-normal projects
const houseNormalFolders = [
  "CHI MO - LONG AN - INDOCHINE",
  "CHI HUONG - QUAN 7",
  "ANH SON - LONG THANH",
  "CHI THAO - NHA BE",
  "ANH NAM - TIEN GIANG",
  "CHI NGOC - DONG NAI",
  "ANH HUNG - NHA BE",
  "CHI TU - LONG AN",
];

// Village projects
const villageFolders = ["VILLA SUMMER"];

// House-business projects
const houseBusinessFolders = [
  "THE K COFFEE TEA - THU DUC",
  "Ngoc Be Cake - Go Vap",
  "B COFFEE - HCM",
  "Bamboo panel - Go Vap",
  "PERSEFONI OFFICE- QUAN 3",
];

export const generateProjectData = () => {
  const appartmentProjects = appartmentFolders.map((folder, index) =>
    generateProjectFromFolder(folder, "appartment", index + 1)
  );

  const houseNormalProjects = houseNormalFolders.map((folder, index) =>
    generateProjectFromFolder(
      folder,
      "house-normal",
      appartmentProjects.length + index + 1
    )
  );

  const villageProjects = villageFolders.map((folder, index) =>
    generateProjectFromFolder(
      folder,
      "village",
      appartmentProjects.length + houseNormalProjects.length + index + 1
    )
  );

  const houseBusinessProjects = houseBusinessFolders.map((folder, index) =>
    generateProjectFromFolder(
      folder,
      "house-business",
      appartmentProjects.length +
        houseNormalProjects.length +
        villageProjects.length +
        index +
        1
    )
  );

  return {
    appartment: appartmentProjects,
    "house-normal": houseNormalProjects,
    village: villageProjects,
    "house-business": houseBusinessProjects,
  };
};
