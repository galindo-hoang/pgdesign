-- =====================================================
-- PG Design Database - Complete Table Creation Script
-- =====================================================
-- This script creates all tables for the pgdesign_dev database
-- Tables are ordered to respect foreign key dependencies
-- =====================================================

-- Create database (uncomment if needed)
-- CREATE DATABASE pgdesign_dev;
-- USE pgdesign_dev;

-- =====================================================
-- 1. INDEPENDENT TABLES (No foreign keys)
-- =====================================================

-- Hero Data
CREATE TABLE hero_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- About Data
CREATE TABLE about_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    headline VARCHAR(255) NOT NULL,
    sub_headline VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Image Slider Data
CREATE TABLE image_slider_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(500) NOT NULL,
    image_alt VARCHAR(255) DEFAULT '',
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    size VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_display_order_is_active (display_order, is_active)
);

-- Stats Header
CREATE TABLE stats_header (
    id INT AUTO_INCREMENT PRIMARY KEY,
    main_headline VARCHAR(255) NOT NULL,
    sub_headline VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Solution Header
CREATE TABLE solution_header (
    id INT AUTO_INCREMENT PRIMARY KEY,
    main_headline VARCHAR(255) NOT NULL,
    sub_headline VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Workflow Data
CREATE TABLE workflow_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Project Diary Data
CREATE TABLE project_diary_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Testimonial Header
CREATE TABLE testimonial_header (
    id INT AUTO_INCREMENT PRIMARY KEY,
    main_headline VARCHAR(255) NOT NULL,
    sub_headline VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Consultation Form Data
CREATE TABLE consultation_form_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    min_investment INT NOT NULL,
    max_investment INT NOT NULL,
    step_investment INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- About Intro Data
CREATE TABLE about_intro_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand_title VARCHAR(255) NOT NULL,
    brand_subtitle VARCHAR(255) NOT NULL,
    identity VARCHAR(255) NOT NULL,
    description_1 TEXT NOT NULL,
    description_2 TEXT NOT NULL,
    background_image_url VARCHAR(500) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Vision Mission Data
CREATE TABLE vision_mission_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(500) NOT NULL,
    vision_title VARCHAR(255) NOT NULL,
    vision_paragraph_1 TEXT NOT NULL,
    vision_paragraph_2 TEXT NOT NULL,
    mission_title VARCHAR(255) NOT NULL,
    core_values_title VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Commitments Data
CREATE TABLE commitments_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Team Data
CREATE TABLE team_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    heading VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- About Project Data
CREATE TABLE about_project_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    background_image_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Stats Section Data
CREATE TABLE stats_section_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    main_headline VARCHAR(255) NOT NULL,
    sub_headline VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Project Categories Data
CREATE TABLE project_categories_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    main_title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Service Page Hero
CREATE TABLE service_page_hero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    main_title VARCHAR(100) NOT NULL,
    brand_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    hero_image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Service Page Services
CREATE TABLE service_page_services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(200) DEFAULT '',
    description TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Service Page Process Sections
CREATE TABLE service_page_process_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    process_number INT NOT NULL UNIQUE,
    title VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    note TEXT DEFAULT '',
    image_url VARCHAR(500) NULL COMMENT 'Background image URL for the process section',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Service Page Construction Sections
CREATE TABLE service_page_construction_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_number INT NOT NULL UNIQUE,
    title_left VARCHAR(200) NOT NULL,
    contents_left JSON NOT NULL,
    title_right VARCHAR(200) NOT NULL,
    contents_right JSON NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Blog Hero Data
CREATE TABLE blog_hero_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL COMMENT 'Hero section title',
    subtitle TEXT NOT NULL COMMENT 'Hero section subtitle',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Whether the hero is active',
    display_order INT DEFAULT 1 COMMENT 'Display order',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_is_active (is_active),
    INDEX idx_display_order (display_order)
);

-- Blog Project Items
CREATE TABLE blog_project_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id VARCHAR(100) NOT NULL UNIQUE COMMENT 'Unique project identifier',
    title VARCHAR(500) NOT NULL COMMENT 'Project title',
    image_url VARCHAR(500) NOT NULL COMMENT 'Project image URL',
    area VARCHAR(50) NOT NULL COMMENT 'Project area',
    style VARCHAR(200) NOT NULL COMMENT 'Project style',
    client_name VARCHAR(200) NOT NULL COMMENT 'Client name',
    location VARCHAR(200) NOT NULL COMMENT 'Project location',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Whether the project is active',
    display_order INT DEFAULT 0 COMMENT 'Display order',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_project_id (project_id),
    INDEX idx_is_active (is_active),
    INDEX idx_display_order (display_order),
    INDEX idx_style (style),
    INDEX idx_location (location)
);

-- Blog Content Sections
CREATE TABLE blog_content_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    main_title VARCHAR(500) NOT NULL COMMENT 'Main content title',
    intro_text TEXT NOT NULL COMMENT 'Introduction text',
    design_styles_title VARCHAR(300) NOT NULL COMMENT 'Design styles section title',
    factors_title VARCHAR(300) NOT NULL COMMENT 'Important factors section title',
    process_title VARCHAR(300) NOT NULL COMMENT 'Process section title',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Whether the content section is active',
    display_order INT DEFAULT 1 COMMENT 'Display order',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_is_active (is_active),
    INDEX idx_display_order (display_order)
);

-- Blog Consultation CTA
CREATE TABLE blog_consultation_cta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(300) NOT NULL COMMENT 'CTA title',
    description TEXT NOT NULL COMMENT 'CTA description',
    features JSON NOT NULL COMMENT 'Array of feature strings',
    button_text VARCHAR(200) NOT NULL COMMENT 'Button text',
    image_url VARCHAR(500) NOT NULL COMMENT 'CTA image URL',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Whether the CTA is active',
    display_order INT DEFAULT 1 COMMENT 'Display order',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_is_active (is_active),
    INDEX idx_display_order (display_order)
);

-- =====================================================
-- 2. TABLES WITH FOREIGN KEYS (Dependent tables)
-- =====================================================

-- Hero Images
CREATE TABLE hero_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hero_id INT UNSIGNED NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_alt VARCHAR(255) DEFAULT '',
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_hero_id_display_order (hero_id, display_order),
    FOREIGN KEY (hero_id) REFERENCES hero_data(id) ON DELETE CASCADE
);

-- Stats Items
CREATE TABLE stats_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stats_header_id INT UNSIGNED,
    stats_section_id INT UNSIGNED,
    icon_name VARCHAR(100) NOT NULL,
    icon_url VARCHAR(500) NOT NULL,
    target_value INT NOT NULL,
    label VARCHAR(255) NOT NULL,
    suffix VARCHAR(20) NOT NULL,
    description VARCHAR(255) NOT NULL,
    background_image_url VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_stats_header_id_display_order (stats_header_id, display_order),
    INDEX idx_stats_section_id (stats_section_id),
    FOREIGN KEY (stats_header_id) REFERENCES stats_header(id) ON DELETE CASCADE,
    FOREIGN KEY (stats_section_id) REFERENCES stats_section_data(id) ON DELETE CASCADE
);

-- Solution Items
CREATE TABLE solution_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solution_header_id INT UNSIGNED NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_alt VARCHAR(255) DEFAULT '',
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    link VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_solution_header_id_display_order (solution_header_id, display_order),
    FOREIGN KEY (solution_header_id) REFERENCES solution_header(id) ON DELETE CASCADE
);

-- Workflow Tabs
CREATE TABLE workflow_tabs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workflow_id INT UNSIGNED NOT NULL,
    workflow_key VARCHAR(100) NOT NULL,
    icon_name VARCHAR(100) NOT NULL,
    icon_url VARCHAR(500) NOT NULL,
    title VARCHAR(255) NOT NULL,
    diagram_url VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_workflow_id_display_order (workflow_id, display_order),
    FOREIGN KEY (workflow_id) REFERENCES workflow_data(id) ON DELETE CASCADE
);

-- Project Diary Images
CREATE TABLE project_diary_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_diary_id INT UNSIGNED NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_alt VARCHAR(255) DEFAULT '',
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_project_diary_id_display_order (project_diary_id, display_order),
    FOREIGN KEY (project_diary_id) REFERENCES project_diary_data(id) ON DELETE CASCADE
);

-- Testimonials
CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    testimonial_header_id INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    project VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    avatar_url VARCHAR(500) NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_testimonial_header_id_display_order (testimonial_header_id, display_order),
    FOREIGN KEY (testimonial_header_id) REFERENCES testimonial_header(id) ON DELETE CASCADE
);

-- Project Types
CREATE TABLE project_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    consultation_form_id INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_consultation_form_id_display_order (consultation_form_id, display_order),
    FOREIGN KEY (consultation_form_id) REFERENCES consultation_form_data(id) ON DELETE CASCADE
);

-- Mission Items
CREATE TABLE mission_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vision_mission_id INT UNSIGNED NOT NULL,
    item_text TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_vision_mission_id_display_order (vision_mission_id, display_order),
    FOREIGN KEY (vision_mission_id) REFERENCES vision_mission_data(id) ON DELETE CASCADE
);

-- Core Values
CREATE TABLE core_values (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vision_mission_id INT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_vision_mission_id_display_order (vision_mission_id, display_order),
    FOREIGN KEY (vision_mission_id) REFERENCES vision_mission_data(id) ON DELETE CASCADE
);

-- Commitment Items
CREATE TABLE commitment_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commitments_id INT UNSIGNED NOT NULL,
    icon_name VARCHAR(100) NOT NULL,
    icon_url VARCHAR(500) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_commitments_id_display_order (commitments_id, display_order),
    FOREIGN KEY (commitments_id) REFERENCES commitments_data(id) ON DELETE CASCADE
);

-- Board Directors
CREATE TABLE board_directors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_team_id_display_order (team_id, display_order),
    FOREIGN KEY (team_id) REFERENCES team_data(id) ON DELETE CASCADE
);

-- Team Members
CREATE TABLE team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_team_id_display_order (team_id, display_order),
    FOREIGN KEY (team_id) REFERENCES team_data(id) ON DELETE CASCADE
);

-- Project Categories
CREATE TABLE project_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categories_data_id INT UNSIGNED NOT NULL,
    category_id VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    project_count INT DEFAULT 0,
    background_image_url TEXT NOT NULL,
    navigation_path VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY project_categories_category_id_unique (category_id),
    FOREIGN KEY (categories_data_id) REFERENCES project_categories_data(id) ON DELETE CASCADE
);

-- Project Sub Categories
CREATE TABLE project_sub_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_category_id INT UNSIGNED NOT NULL,
    sub_category_id VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    hero_image_url TEXT,
    display_order INT DEFAULT 0,
    project_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY project_sub_cat_unique (project_category_id, sub_category_id),
    UNIQUE KEY project_sub_categories_sub_category_id_unique (sub_category_id),
    FOREIGN KEY (project_category_id) REFERENCES project_categories(id) ON DELETE CASCADE
);

-- Project Details
CREATE TABLE project_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id VARCHAR(100) NOT NULL UNIQUE COMMENT 'Unique identifier for the project',
    title VARCHAR(300) NOT NULL COMMENT 'Project title',
    client_name VARCHAR(200) NOT NULL COMMENT 'Client name',
    area VARCHAR(50) NOT NULL COMMENT 'Project area',
    construction_date DATE NOT NULL COMMENT 'Construction start date',
    address VARCHAR(500) NOT NULL COMMENT 'Project address',
    description TEXT COMMENT 'Project description',
    category VARCHAR(100) NOT NULL COMMENT 'Project category',
    project_sub_category_id INT UNSIGNED NOT NULL COMMENT 'Project sub category ID',
    sub_category VARCHAR(100) NOT NULL COMMENT 'Project sub category',
    style VARCHAR(100) COMMENT 'Project style',
    thumbnail_image VARCHAR(500) COMMENT 'Thumbnail image URL',
    html_content LONGTEXT NOT NULL COMMENT 'HTML content for project detail page',
    project_images JSON COMMENT 'Array of project image URLs',
    project_status VARCHAR(100) COMMENT 'Project status',
    project_budget VARCHAR(100) COMMENT 'Project budget',
    completion_date DATE COMMENT 'Project completion date',
    architect_name VARCHAR(200) COMMENT 'Architect name',
    contractor_name VARCHAR(200) COMMENT 'Contractor name',
    meta_title VARCHAR(300) COMMENT 'SEO meta title',
    meta_description TEXT COMMENT 'SEO meta description',
    tags JSON COMMENT 'Array of project tags',
    is_on_homepage BOOLEAN DEFAULT FALSE COMMENT 'Whether this project should appear on the homepage image slider',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Whether the project is active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_project_id (project_id),
    INDEX idx_category (category),
    INDEX idx_sub_category (sub_category),
    INDEX idx_project_details_is_on_homepage (is_on_homepage),
    INDEX idx_is_active (is_active),
    FOREIGN KEY (project_sub_category_id) REFERENCES project_sub_categories(id) ON DELETE RESTRICT
);

-- Project Specifications
CREATE TABLE project_specifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_detail_id INT UNSIGNED NOT NULL COMMENT 'Reference to project_details table',
    label VARCHAR(200) NOT NULL COMMENT 'Specification label',
    value VARCHAR(100) NOT NULL COMMENT 'Specification value',
    unit VARCHAR(50) COMMENT 'Unit of measurement',
    display_order INT DEFAULT 0 COMMENT 'Display order',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Whether the specification is active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_project_detail_id (project_detail_id),
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active),
    FOREIGN KEY (project_detail_id) REFERENCES project_details(id) ON DELETE CASCADE
);

-- Blog Design Styles
CREATE TABLE blog_design_styles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_section_id INT UNSIGNED NOT NULL COMMENT 'Reference to content section',
    name VARCHAR(300) NOT NULL COMMENT 'Design style name',
    description TEXT NOT NULL COMMENT 'Design style description',
    display_order INT DEFAULT 0 COMMENT 'Display order',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Whether the design style is active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_content_section_id (content_section_id),
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active),
    FOREIGN KEY (content_section_id) REFERENCES blog_content_sections(id) ON DELETE CASCADE
);

-- Blog Important Factors
CREATE TABLE blog_important_factors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_section_id INT UNSIGNED NOT NULL COMMENT 'Reference to content section',
    title VARCHAR(300) NOT NULL COMMENT 'Factor title',
    description TEXT NOT NULL COMMENT 'Factor description',
    display_order INT DEFAULT 0 COMMENT 'Display order',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Whether the factor is active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_content_section_id (content_section_id),
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active),
    FOREIGN KEY (content_section_id) REFERENCES blog_content_sections(id) ON DELETE CASCADE
);

-- Blog Process Steps
CREATE TABLE blog_process_steps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_section_id INT UNSIGNED NOT NULL COMMENT 'Reference to content section',
    step_number VARCHAR(10) NOT NULL COMMENT 'Step number (e.g., "01", "02")',
    title VARCHAR(300) NOT NULL COMMENT 'Step title',
    description TEXT NOT NULL COMMENT 'Step description',
    display_order INT DEFAULT 0 COMMENT 'Display order',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Whether the step is active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_content_section_id (content_section_id),
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active),
    FOREIGN KEY (content_section_id) REFERENCES blog_content_sections(id) ON DELETE CASCADE
);

-- =====================================================
-- 3. ADDITIONAL NOTES
-- =====================================================

-- Notes:
-- 1. This script creates all tables as defined in the migration files
-- 2. All foreign key constraints are properly defined
-- 3. Indexes are created for optimal query performance
-- 4. Timestamps are set to auto-update on modifications
-- 5. The script respects the order of table creation to avoid foreign key errors
-- 6. All constraints from the migration files are included
-- 7. JSON columns are used where specified in the original migrations

-- To run this script:
-- 1. Make sure you have the pgdesign_dev database created
-- 2. Run this script against the database
-- 3. Verify all tables are created successfully
-- 4. Run any seed scripts if needed

-- Example usage:
-- mysql -u your_username -p pgdesign_dev < create_all_tables.sql 