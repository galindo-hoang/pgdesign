# Homepage Admin Service

This service allows the `HomepageAdmin` component to communicate with the backend APIs for managing homepage content.

## Features

The `homepageAdminService` provides full CRUD operations for all homepage sections:

### 🎯 **Available Sections:**
- **Hero Section** - Main banner with title, subtitle, and rotating images
- **About Section** - Company description and information
- **Image Slider** - Project showcase carousel
- **Stats Section** - Company statistics and achievements
- **Solution Section** - Service offerings and solutions
- **Workflow Section** - Process and workflow information
- **Project Diary** - Project showcase gallery
- **Testimonials** - Customer reviews and feedback
- **Consultation Form** - Contact form configuration

### 🔧 **Service Methods:**

#### **General**
```typescript
getAllHomepageData(): Promise<HomepageData>
```

#### **Hero Section**
```typescript
getHeroData(): Promise<HeroData>
updateHeroData(id: number, data: Partial<HeroData>): Promise<HeroData>
createHeroData(data: Omit<HeroData, 'id'>): Promise<HeroData>
```

#### **About Section**
```typescript
getAboutData(): Promise<AboutData>
updateAboutData(id: number, data: Partial<AboutData>): Promise<AboutData>
```

#### **Image Slider**
```typescript
getImageSliderData(): Promise<ImageSlideData[]>
createImageSlide(data: Omit<ImageSlideData, 'id'>): Promise<ImageSlideData>
updateImageSlide(id: number, data: Partial<ImageSlideData>): Promise<ImageSlideData>
deleteImageSlide(id: number): Promise<void>
reorderImageSlides(slideIds: number[]): Promise<void>
```

#### **Stats Section**
```typescript
getStatsData(): Promise<StatsData>
updateStatsData(id: number, data: Partial<StatsData>): Promise<StatsData>
```

#### **Solution Section**
```typescript
getSolutionData(): Promise<SolutionData>
updateSolutionData(id: number, data: Partial<SolutionData>): Promise<SolutionData>
```

#### **Workflow Section**
```typescript
getWorkflowData(): Promise<WorkflowData>
updateWorkflowData(id: number, data: Partial<WorkflowData>): Promise<WorkflowData>
```

#### **Other Sections (Read-only)**
```typescript
getProjectDiaryData(): Promise<ProjectDiaryData>
getTestimonialData(): Promise<TestimonialData>
getConsultationFormData(): Promise<ConsultationFormData>
```

## 💻 **Usage Example:**

```typescript
import homepageAdminService from '../services/homepageAdminService';

// Load all homepage data
const homepageData = await homepageAdminService.getAllHomepageData();

// Update hero section
const updatedHero = await homepageAdminService.updateHeroData(1, {
  title: "New Title",
  subtitle: "New Subtitle",
  images: ["image1.jpg", "image2.jpg"]
});

// Create new image slide
const newSlide = await homepageAdminService.createImageSlide({
  imageUrl: "new-image.jpg",
  title: "New Project",
  subtitle: "Modern Design",
  size: "150m²"
});

// Delete image slide
await homepageAdminService.deleteImageSlide(5);
```

## 🔗 **API Endpoints:**

The service communicates with these backend endpoints:

| Section | GET | POST | PUT | DELETE |
|---------|-----|------|-----|--------|
| **Hero** | `/hero` | `/hero` | `/hero/:id` | `/hero/:id` |
| **About** | `/about` | `/about` | `/about/:id` | `/about/:id` |
| **Image Slider** | `/image-slider` | `/image-slider` | `/image-slider/:id` | `/image-slider/:id` |
| **Stats** | `/stats` | `/stats` | `/stats/:id` | `/stats/:id` |
| **Solution** | `/solution` | `/solution` | `/solution/:id` | `/solution/:id` |
| **Workflow** | `/workflow` | `/workflow` | `/workflow/:id` | - |
| **Project Diary** | `/project-diary` | - | - | - |
| **Testimonials** | `/testimonials` | - | - | - |
| **Consultation** | `/consultation-form` | - | - | - |

## 🎨 **Homepage Admin Interface:**

The `HomepageAdmin` component provides:

### **Navigation Sections:**
- 🎯 Hero Section (editable)
- ✏️ About Section (editable)
- 🖼️ Image Slider (full CRUD)
- 📊 Stats Section (view only)
- 🔧 Solutions (view only)
- 📋 Workflow (view only)

### **Edit Features:**
- **Toggle Edit Mode** - Switch between view and edit modes
- **Real-time Preview** - See changes before saving
- **Form Validation** - Input validation and error handling
- **Image Management** - Upload and manage images
- **Drag & Drop** - Reorder image slides (future feature)

### **Interface Features:**
- ✅ Professional modern design
- ✅ Responsive mobile layout
- ✅ Loading states and error handling
- ✅ Real-time data synchronization
- ✅ Confirmation dialogs for destructive actions
- ✅ Success/error notifications

## 🔧 **Configuration:**

The service connects to the backend at:
```
Base URL: http://localhost:3002/api/v1/homepage
```

To change the backend URL, update the `API_BASE_URL` constant in `homepageAdminService.ts`.

## 🔐 **Error Handling:**

The service includes comprehensive error handling:
- **Network errors** - Connection issues
- **API errors** - Server-side validation
- **Data errors** - Invalid response format
- **Timeout errors** - Request timeout handling

All errors are properly typed and include user-friendly messages.

## 🚀 **Future Enhancements:**

- [ ] Bulk operations for image slides
- [ ] Image upload with file picker
- [ ] Rich text editor for descriptions
- [ ] Drag & drop reordering
- [ ] Auto-save functionality
- [ ] Version history and rollback
- [ ] Preview mode with live website
- [ ] Advanced image optimization
- [ ] Multi-language content support 