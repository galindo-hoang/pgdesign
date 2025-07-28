export interface BaseEntity {
    id: number;
    created_at: Date;
    updated_at: Date;
}
export interface HeroData {
    id: number;
    images: string[];
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
export interface HeroImage extends BaseEntity {
    hero_id: number;
    image_url: string;
    image_alt: string;
    display_order: number;
}
export interface AboutData extends BaseEntity {
    headline: string;
    sub_headline: string;
    description: string;
    is_active: boolean;
}
export interface ImageSlideData extends BaseEntity {
    image_url: string;
    image_alt: string;
    title: string;
    subtitle: string;
    size: string;
    display_order: number;
    is_active: boolean;
}
export interface StatsHeader extends BaseEntity {
    main_headline: string;
    sub_headline: string;
    description: string;
    is_active: boolean;
}
export interface StatsItem extends BaseEntity {
    stats_header_id: number;
    icon_name: string;
    target_value: number;
    label: string;
    suffix: string;
    description: string;
    background_image_url: string;
    category: string;
    display_order: number;
    is_active: boolean;
}
export interface StatsData {
    header: StatsHeader;
    items: StatsItem[];
}
export interface SolutionHeader extends BaseEntity {
    main_headline: string;
    sub_headline: string;
    is_active: boolean;
}
export interface SolutionItem extends BaseEntity {
    solution_header_id: number;
    image_url: string;
    image_alt: string;
    category: string;
    title: string[];
    link: string;
    display_order: number;
    is_active: boolean;
}
export interface SolutionData {
    header: SolutionHeader;
    solutions: SolutionItem[];
}
export interface WorkflowData extends BaseEntity {
    title: string;
    is_active: boolean;
}
export interface WorkflowTab extends BaseEntity {
    workflow_id: number;
    workflow_key: string;
    icon_name: string;
    title: string;
    diagram_url: string;
    display_order: number;
    is_active: boolean;
}
export interface ProjectDiaryData extends BaseEntity {
    title: string;
    is_active: boolean;
}
export interface ProjectDiaryImage extends BaseEntity {
    project_diary_id: number;
    image_url: string;
    image_alt: string;
    display_order: number;
    is_active: boolean;
}
export interface TestimonialHeader extends BaseEntity {
    main_headline: string;
    sub_headline: string;
    is_active: boolean;
}
export interface Testimonial extends BaseEntity {
    testimonial_header_id: number;
    name: string;
    project: string;
    text: string;
    avatar_url?: string;
    display_order: number;
    is_active: boolean;
}
export interface TestimonialData {
    header: TestimonialHeader;
    testimonials: Testimonial[];
}
export interface ConsultationFormData extends BaseEntity {
    title: string;
    min_investment: number;
    max_investment: number;
    step_investment: number;
    is_active: boolean;
}
export interface ProjectType extends BaseEntity {
    consultation_form_id: number;
    name: string;
    display_order: number;
    is_active: boolean;
}
export interface HomePageData {
    hero: HeroData;
    about: AboutData;
    imageSlider: ImageSlideData[];
    stats: StatsData;
    solution: SolutionData;
    workflow: {
        main: WorkflowData;
        tabs: WorkflowTab[];
    };
    projectDiary: {
        main: ProjectDiaryData;
        images: ProjectDiaryImage[];
    };
    testimonials: TestimonialData;
    consultationForm: {
        main: ConsultationFormData;
        projectTypes: ProjectType[];
    };
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        current_page: number;
        per_page: number;
        total: number;
        total_pages: number;
    };
}
export interface FileUpload {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}
//# sourceMappingURL=homePageTypes.d.ts.map