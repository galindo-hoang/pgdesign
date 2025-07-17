-- MySQL dump 10.13  Distrib 8.0.42, for Linux (aarch64)
--
-- Host: localhost    Database: pgdesign_dev
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `about_data`
--

DROP TABLE IF EXISTS `about_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `headline` varchar(255) NOT NULL,
  `sub_headline` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_data`
--

LOCK TABLES `about_data` WRITE;
/*!40000 ALTER TABLE `about_data` DISABLE KEYS */;
INSERT INTO `about_data` VALUES (6,'MỖI THIẾT KẾ LÀ MỘT CÂU CHUYỆN','MỖI CÔNG TRÌNH LÀ MỘT DẤU ẤN','Thành lập từ năm 2022, PG là đội ngũ kiến trúc sư trẻ đầy đam mê và nhiệt huyết, hoạt động chuyên sâu trong lĩnh vực Kiến trúc - Xây dựng - Nội thất. Chúng tôi mang đến giải pháp toàn diện từ thiết kế ý tưởng đến thi công hoàn thiện, giúp khách hàng tối ưu không gian sống, tiết kiệm thời gian và chi phí, nhưng vẫn đảm bảo thẩm mỹ và công năng.',1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `about_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_intro_data`
--

DROP TABLE IF EXISTS `about_intro_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_intro_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `brand_title` varchar(255) NOT NULL,
  `brand_subtitle` varchar(255) NOT NULL,
  `identity` varchar(255) NOT NULL,
  `description_1` text NOT NULL,
  `description_2` text NOT NULL,
  `background_image_url` varchar(500) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_intro_data`
--

LOCK TABLES `about_intro_data` WRITE;
/*!40000 ALTER TABLE `about_intro_data` DISABLE KEYS */;
INSERT INTO `about_intro_data` VALUES (1,'PG DESIGN','KIẾN TẠO KHÔNG GIAN','KHẲNG ĐỊNH BẢN SẮC','Là đơn vị chuyên nghiệp trong lĩnh vực thiết kế kiến trúc, nội thất và thi công trọn gói. Với đội ngũ thiết kế và thi công giàu kinh nghiệm, chúng tôi cam kết mang đến những công trình chất lượng cao, đúng tiến độ và phản ánh rõ rệt tính cách của từng khách hàng.','PG Design không chỉ tạo ra những không gian sống và làm việc thẩm mỹ, mà còn góp phần xây dựng bản sắc riêng cho mỗi công trình thông qua thiết kế cá nhân hóa và có chiều sâu, gắn liền với phong cách sống và định hướng thương hiệu của khách hàng. Đây chính là cách chúng tôi mang đến giá trị vượt lên trên vẻ đẹp bề mặt - một không gian có hồn và có ý nghĩa.','http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg',1,'2025-07-13 07:03:23','2025-07-13 07:03:23');
/*!40000 ALTER TABLE `about_intro_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_project_data`
--

DROP TABLE IF EXISTS `about_project_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_project_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `background_image_url` text NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_project_data`
--

LOCK TABLES `about_project_data` WRITE;
/*!40000 ALTER TABLE `about_project_data` DISABLE KEYS */;
INSERT INTO `about_project_data` VALUES (4,'Dự án','PG DESIGN','http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg',1,'2025-07-12 16:46:33','2025-07-12 16:46:33');
/*!40000 ALTER TABLE `about_project_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_consultation_cta`
--

DROP TABLE IF EXISTS `blog_consultation_cta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_consultation_cta` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(300) NOT NULL COMMENT 'CTA title',
  `description` text NOT NULL COMMENT 'CTA description',
  `features` json NOT NULL COMMENT 'Array of feature strings',
  `button_text` varchar(200) NOT NULL COMMENT 'Button text',
  `image_url` varchar(500) NOT NULL COMMENT 'CTA image URL',
  `is_active` tinyint(1) DEFAULT '1' COMMENT 'Whether the CTA is active',
  `display_order` int DEFAULT '1' COMMENT 'Display order',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `blog_consultation_cta_is_active_index` (`is_active`),
  KEY `blog_consultation_cta_display_order_index` (`display_order`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_consultation_cta`
--

LOCK TABLES `blog_consultation_cta` WRITE;
/*!40000 ALTER TABLE `blog_consultation_cta` DISABLE KEYS */;
INSERT INTO `blog_consultation_cta` VALUES (1,'NHẬN TƯ VẤN THIẾT KẾ NỘI THẤT','Bạn đang muốn thiết kế không gian phòng khách đẹp và hiện đại? Hãy liên hệ với PG Design để được tư vấn miễn phí và nhận báo giá chi tiết.','[\"Tư vấn miễn phí\", \"Thiết kế 3D chân thực\", \"Thi công chuyên nghiệp\"]','ĐĂNG KÝ TƯ VẤN NGAY','http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg',1,1,'2025-07-13 06:46:16','2025-07-13 06:46:16');
/*!40000 ALTER TABLE `blog_consultation_cta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_content_sections`
--

DROP TABLE IF EXISTS `blog_content_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_content_sections` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `main_title` varchar(500) NOT NULL COMMENT 'Main content title',
  `intro_text` text NOT NULL COMMENT 'Introduction text',
  `design_styles_title` varchar(300) NOT NULL COMMENT 'Design styles section title',
  `factors_title` varchar(300) NOT NULL COMMENT 'Important factors section title',
  `process_title` varchar(300) NOT NULL COMMENT 'Process section title',
  `is_active` tinyint(1) DEFAULT '1' COMMENT 'Whether the content section is active',
  `display_order` int DEFAULT '1' COMMENT 'Display order',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `blog_content_sections_is_active_index` (`is_active`),
  KEY `blog_content_sections_display_order_index` (`display_order`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_content_sections`
--

LOCK TABLES `blog_content_sections` WRITE;
/*!40000 ALTER TABLE `blog_content_sections` DISABLE KEYS */;
INSERT INTO `blog_content_sections` VALUES (1,'PG DESIGN - THIẾT KẾ NỘI THẤT PHÒNG KHÁCH ĐẸP, HIỆN ĐẠI TẠI TP.HCM','Phòng khách là không gian trung tâm của ngôi nhà, nơi gia đình quây quần và đón tiếp khách. Một phòng khách được thiết kế đẹp không chỉ tạo ấn tượng mạnh mẽ với khách ghé thăm mà còn mang lại cảm giác thoải mái, ấm cúng cho chính gia chủ.','Các phong cách thiết kế phòng khách đẹp','Những yếu tố quan trọng khi thiết kế nội thất phòng khách','Quy trình thiết kế nội thất phòng khách chuyên nghiệp',1,1,'2025-07-13 06:46:16','2025-07-13 06:46:16');
/*!40000 ALTER TABLE `blog_content_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_design_styles`
--

DROP TABLE IF EXISTS `blog_design_styles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_design_styles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `content_section_id` int unsigned NOT NULL COMMENT 'Reference to content section',
  `name` varchar(300) NOT NULL COMMENT 'Design style name',
  `description` text NOT NULL COMMENT 'Design style description',
  `display_order` int DEFAULT '0' COMMENT 'Display order',
  `is_active` tinyint(1) DEFAULT '1' COMMENT 'Whether the design style is active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `blog_design_styles_content_section_id_index` (`content_section_id`),
  KEY `blog_design_styles_display_order_index` (`display_order`),
  KEY `blog_design_styles_is_active_index` (`is_active`),
  CONSTRAINT `blog_design_styles_content_section_id_foreign` FOREIGN KEY (`content_section_id`) REFERENCES `blog_content_sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_design_styles`
--

LOCK TABLES `blog_design_styles` WRITE;
/*!40000 ALTER TABLE `blog_design_styles` DISABLE KEYS */;
INSERT INTO `blog_design_styles` VALUES (1,1,'Phong cách hiện đại (Modern)','Đặc trưng bởi những đường nét sạch sẽ, màu sắc trung tính và sử dụng vật liệu công nghiệp như thép, kính, beton.',1,1,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(2,1,'Phong cách cổ điển (Classical)','Mang đậm nét truyền thống với những chi tiết trang trí tinh xảo, màu sắc ấm áp và vật liệu tự nhiên.',2,1,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(3,1,'Phong cách tối giản (Minimalist)','\"Less is more\" - ít đồ đạc nhưng mỗi món đều có ý nghĩa và công năng rõ ràng.',3,1,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(4,1,'Phong cách Indochine','Kết hợp tinh tế giữa văn hóa Á Đông và kiến trúc Pháp, tạo nên vẻ đẹp hoài cổ độc đáo.',4,1,'2025-07-13 06:46:16','2025-07-13 06:46:16');
/*!40000 ALTER TABLE `blog_design_styles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_hero_data`
--

DROP TABLE IF EXISTS `blog_hero_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_hero_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL COMMENT 'Hero section title',
  `subtitle` text NOT NULL COMMENT 'Hero section subtitle',
  `is_active` tinyint(1) DEFAULT '1' COMMENT 'Whether the hero is active',
  `display_order` int DEFAULT '1' COMMENT 'Display order',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `blog_hero_data_is_active_index` (`is_active`),
  KEY `blog_hero_data_display_order_index` (`display_order`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_hero_data`
--

LOCK TABLES `blog_hero_data` WRITE;
/*!40000 ALTER TABLE `blog_hero_data` DISABLE KEYS */;
INSERT INTO `blog_hero_data` VALUES (1,'PG DESIGN - THIẾT KẾ NỘI THẤT PHÒNG KHÁCH ĐẸP, HIỆN ĐẠI TẠI TP.HCM','Khám phá bộ sưu tập những không gian phòng khách được thiết kế tinh tế, kết hợp hoàn hảo giữa thẩm mỹ và công năng sử dụng.',1,1,'2025-07-13 06:46:16','2025-07-13 06:46:16');
/*!40000 ALTER TABLE `blog_hero_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_important_factors`
--

DROP TABLE IF EXISTS `blog_important_factors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_important_factors` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `content_section_id` int unsigned NOT NULL COMMENT 'Reference to content section',
  `title` varchar(300) NOT NULL COMMENT 'Factor title',
  `description` text NOT NULL COMMENT 'Factor description',
  `display_order` int DEFAULT '0' COMMENT 'Display order',
  `is_active` tinyint(1) DEFAULT '1' COMMENT 'Whether the factor is active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `blog_important_factors_content_section_id_index` (`content_section_id`),
  KEY `blog_important_factors_display_order_index` (`display_order`),
  KEY `blog_important_factors_is_active_index` (`is_active`),
  CONSTRAINT `blog_important_factors_content_section_id_foreign` FOREIGN KEY (`content_section_id`) REFERENCES `blog_content_sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_important_factors`
--

LOCK TABLES `blog_important_factors` WRITE;
/*!40000 ALTER TABLE `blog_important_factors` DISABLE KEYS */;
INSERT INTO `blog_important_factors` VALUES (1,1,'Tối ưu không gian','Bố trí nội thất hợp lý để tạo động tuyến thuận tiện, không gian thoáng đãng và dễ dàng di chuyển.',1,1,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(2,1,'Ánh sáng và thông gió','Tận dụng ánh sáng tự nhiên, kết hợp chiếu sáng nhân tạo và đảm bảo thông gió tốt cho không gian.',2,1,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(3,1,'Màu sắc và vật liệu','Lựa chọn bảng màu hài hòa, vật liệu chất lượng phù hợp với phong cách và sở thích của gia chủ.',3,1,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(4,1,'Công năng và thẩm mỹ','Cân bằng giữa tính thực tiễn và vẻ đẹp, đảm bảo không gian vừa đẹp vừa tiện dụng trong sinh hoạt hằng ngày.',4,1,'2025-07-13 06:46:16','2025-07-13 06:46:16');
/*!40000 ALTER TABLE `blog_important_factors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_process_steps`
--

DROP TABLE IF EXISTS `blog_process_steps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_process_steps` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `content_section_id` int unsigned NOT NULL COMMENT 'Reference to content section',
  `step_number` varchar(10) NOT NULL COMMENT 'Step number (e.g., "01", "02")',
  `title` varchar(300) NOT NULL COMMENT 'Step title',
  `description` text NOT NULL COMMENT 'Step description',
  `display_order` int DEFAULT '0' COMMENT 'Display order',
  `is_active` tinyint(1) DEFAULT '1' COMMENT 'Whether the step is active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `blog_process_steps_content_section_id_index` (`content_section_id`),
  KEY `blog_process_steps_display_order_index` (`display_order`),
  KEY `blog_process_steps_is_active_index` (`is_active`),
  CONSTRAINT `blog_process_steps_content_section_id_foreign` FOREIGN KEY (`content_section_id`) REFERENCES `blog_content_sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_process_steps`
--

LOCK TABLES `blog_process_steps` WRITE;
/*!40000 ALTER TABLE `blog_process_steps` DISABLE KEYS */;
INSERT INTO `blog_process_steps` VALUES (1,1,'01','Khảo sát và tư vấn','Đo đạc không gian, tìm hiểu nhu cầu và sở thích của khách hàng.',1,1,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(2,1,'02','Thiết kế concept','Lên ý tưởng thiết kế tổng thể, chọn phong cách và bảng màu.',2,1,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(3,1,'03','Thiết kế chi tiết','Hoàn thiện bản vẽ 2D, 3D và danh sách vật tư cụ thể.',3,1,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(4,1,'04','Thi công và giám sát','Triển khai thi công theo đúng thiết kế và giám sát chất lượng.',4,1,'2025-07-13 06:46:16','2025-07-13 06:46:16');
/*!40000 ALTER TABLE `blog_process_steps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_project_items`
--

DROP TABLE IF EXISTS `blog_project_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_project_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `project_id` varchar(100) NOT NULL COMMENT 'Unique project identifier',
  `title` varchar(500) NOT NULL COMMENT 'Project title',
  `image_url` varchar(500) NOT NULL COMMENT 'Project image URL',
  `area` varchar(50) NOT NULL COMMENT 'Project area',
  `style` varchar(200) NOT NULL COMMENT 'Project style',
  `client_name` varchar(200) NOT NULL COMMENT 'Client name',
  `location` varchar(200) NOT NULL COMMENT 'Project location',
  `is_active` tinyint(1) DEFAULT '1' COMMENT 'Whether the project is active',
  `display_order` int DEFAULT '0' COMMENT 'Display order',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `blog_project_items_project_id_unique` (`project_id`),
  KEY `blog_project_items_project_id_index` (`project_id`),
  KEY `blog_project_items_is_active_index` (`is_active`),
  KEY `blog_project_items_display_order_index` (`display_order`),
  KEY `blog_project_items_style_index` (`style`),
  KEY `blog_project_items_location_index` (`location`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_project_items`
--

LOCK TABLES `blog_project_items` WRITE;
/*!40000 ALTER TABLE `blog_project_items` DISABLE KEYS */;
INSERT INTO `blog_project_items` VALUES (1,'1','Thiết kế nội thất Phòng khách Nhà Phố Hiện Đại – Quận 2','http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg','20 m²','Phong cách hiện đại','Anh Tú','Quận 2',1,1,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(2,'2','Thiết kế nội thất Phòng khách Biệt Thự Cổ Điển – Quận 7','http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg','35 m²','Phong cách cổ điển','Chị Lan','Quận 7',1,2,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(3,'3','Thiết kế nội thất Phòng khách Căn Hộ Minimalist – Quận 1','http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg','18 m²','Phong cách tối giản','Anh Nam','Quận 1',1,3,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(4,'4','Thiết kế nội thất Phòng khách Nhà Vườn Indochine – Quận 3','http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg','28 m²','Phong cách Indochine','Chị Hoa','Quận 3',1,4,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(5,'5','Thiết kế nội thất Phòng khách Penthouse Luxury – Quận 2','http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg','45 m²','Phong cách sang trọng','Anh Minh','Quận 2',1,5,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(6,'6','Thiết kế nội thất Phòng khách Studio Scandinavian – Quận 5','http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg','15 m²','Phong cách Bắc Âu','Chị Mai','Quận 5',1,6,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(7,'7','Thiết kế nội thất Phòng khách Duplex Modern – Quận 4','http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg','32 m²','Phong cách hiện đại','Anh Hoàng','Quận 4',1,7,'2025-07-13 06:46:16','2025-07-13 06:46:16'),(8,'8','Thiết kế nội thất Phòng khách Townhouse Vintage – Quận 6','http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg','24 m²','Phong cách vintage','Chị Thúy','Quận 6',1,8,'2025-07-13 06:46:16','2025-07-13 06:46:16');
/*!40000 ALTER TABLE `blog_project_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board_directors`
--

DROP TABLE IF EXISTS `board_directors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_directors` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `team_id` int unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `board_directors_team_id_display_order_index` (`team_id`,`display_order`),
  CONSTRAINT `board_directors_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `team_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_directors`
--

LOCK TABLES `board_directors` WRITE;
/*!40000 ALTER TABLE `board_directors` DISABLE KEYS */;
INSERT INTO `board_directors` VALUES (1,1,'Phan Anh Thư','CEO & Founder','http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg',0,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(2,1,'Võ Nguyên Pháp','Project Director','http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg',1,1,'2025-07-13 07:03:23','2025-07-13 07:03:23');
/*!40000 ALTER TABLE `board_directors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commitment_items`
--

DROP TABLE IF EXISTS `commitment_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commitment_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `commitments_id` int unsigned DEFAULT NULL,
  `icon_name` varchar(100) NOT NULL,
  `icon_url` varchar(500) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `commitment_items_commitments_id_display_order_index` (`commitments_id`,`display_order`),
  CONSTRAINT `commitment_items_commitments_id_foreign` FOREIGN KEY (`commitments_id`) REFERENCES `commitments_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commitment_items`
--

LOCK TABLES `commitment_items` WRITE;
/*!40000 ALTER TABLE `commitment_items` DISABLE KEYS */;
INSERT INTO `commitment_items` VALUES (1,1,'direct-execution-icon','http://localhost:9000/pgdesign-assets/icons/direct-execution-icon.svg','KHÔNG KHOÁN THẦU','PG Design cam kết trực tiếp đảm nhận từ khâu thiết kế đến thi công, không giao khoán cho bên thứ ba.',0,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(2,1,'quality-materials-icon','http://localhost:9000/pgdesign-assets/icons/quality-materials-icon.svg','VẬT TƯ ĐẠT CHUẨN','Chúng tôi sử dụng vật liệu chính hãng, rõ nguồn gốc, đảm bảo độ bền và tính thẩm mỹ cho công trình.',1,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(3,1,'clear-pricing-icon','http://localhost:9000/pgdesign-assets/icons/clear-pricing-icon.svg','CHI PHÍ MINH BẠCH','Mọi hạng mục đều được minh bạch trong báo giá. Cam kết không để khách hàng lo lắng về chi phí phát sinh bất ngờ.',2,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(4,1,'timely-delivery-icon','http://localhost:9000/pgdesign-assets/icons/timely-delivery-icon.svg','THI CÔNG ĐÚNG TIẾN ĐỘ','Chúng tôi đặt uy tín lên hàng đầu, bằng việc thực hiện công trình đúng tiến độ đã thống nhất với khách hàng.',3,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(5,1,'reasonable-price-icon','http://localhost:9000/pgdesign-assets/icons/reasonable-price-icon.svg','GIÁ HỢP LÝ - TỐI ƯU NGÂN SÁCH','Chi phí thiết kế và thi công được tính toán hợp lý, mang lại giá trị cao nhất cho mỗi đồng đầu tư của khách hàng.',4,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(6,1,'post-handover-warranty-icon','http://localhost:9000/pgdesign-assets/icons/post-handover-warranty-icon.svg','CAM KẾT BẢO HÀNH','Sau khi bàn giao, PG Design vẫn luôn đồng hành cùng khách hàng thông qua chính sách bảo hành chuyên nghiệp và chu đáo.',5,1,'2025-07-13 07:03:23','2025-07-13 07:03:23');
/*!40000 ALTER TABLE `commitment_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commitments_data`
--

DROP TABLE IF EXISTS `commitments_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commitments_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commitments_data`
--

LOCK TABLES `commitments_data` WRITE;
/*!40000 ALTER TABLE `commitments_data` DISABLE KEYS */;
INSERT INTO `commitments_data` VALUES (1,'CAM KẾT CỦA PG DESIGN',1,'2025-07-13 07:03:23','2025-07-13 07:03:23');
/*!40000 ALTER TABLE `commitments_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultation_form_data`
--

DROP TABLE IF EXISTS `consultation_form_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultation_form_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `min_investment` int NOT NULL,
  `max_investment` int NOT NULL,
  `step_investment` int NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultation_form_data`
--

LOCK TABLES `consultation_form_data` WRITE;
/*!40000 ALTER TABLE `consultation_form_data` DISABLE KEYS */;
INSERT INTO `consultation_form_data` VALUES (4,'ĐĂNG KÝ TƯ VẤN',100,10000,100,1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `consultation_form_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_values`
--

DROP TABLE IF EXISTS `core_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_values` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `vision_mission_id` int unsigned DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `core_values_vision_mission_id_display_order_index` (`vision_mission_id`,`display_order`),
  CONSTRAINT `core_values_vision_mission_id_foreign` FOREIGN KEY (`vision_mission_id`) REFERENCES `vision_mission_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_values`
--

LOCK TABLES `core_values` WRITE;
/*!40000 ALTER TABLE `core_values` DISABLE KEYS */;
INSERT INTO `core_values` VALUES (1,1,'1. Tận tâm & Chuyên nghiệp','Đồng hành cùng khách hàng từ bản vẽ đầu tiên dần hoàn thiện công trình, với tinh thần trách nhiệm và thái độ tận tâm.',0,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(2,1,'2. Sáng tạo & Cá tính','Không gian được thiết kế không chỉ đẹp, mà còn mang dấu ấn riêng, thể hiện rõ \"chất\" của người sở hữu.',1,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(3,1,'3. Chất lượng & Hoàn hảo','Luôn chọn giải pháp tốt nhất, vật liệu chất lượng và thi công chỉnh chu để đạt đến sự hoàn hảo trong từng chi tiết.',2,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(4,1,'4. Hiệu quả & Kinh tế hợp lý','Tối ưu hóa chi phí mà vẫn đảm bảo tính thẩm mỹ, công năng và độ bền của công trình.',3,1,'2025-07-13 07:03:23','2025-07-13 07:03:23');
/*!40000 ALTER TABLE `core_values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_data`
--

DROP TABLE IF EXISTS `hero_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_data`
--

LOCK TABLES `hero_data` WRITE;
/*!40000 ALTER TABLE `hero_data` DISABLE KEYS */;
INSERT INTO `hero_data` VALUES (6,1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `hero_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_images`
--

DROP TABLE IF EXISTS `hero_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_images` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `hero_id` int unsigned DEFAULT NULL,
  `image_url` varchar(500) NOT NULL,
  `image_alt` varchar(255) DEFAULT '',
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hero_images_hero_id_display_order_index` (`hero_id`,`display_order`),
  CONSTRAINT `hero_images_hero_id_foreign` FOREIGN KEY (`hero_id`) REFERENCES `hero_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_images`
--

LOCK TABLES `hero_images` WRITE;
/*!40000 ALTER TABLE `hero_images` DISABLE KEYS */;
INSERT INTO `hero_images` VALUES (16,6,'/images/thumb-intro.jpg','PG Design Hero Image 1',0,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(17,6,'/images/diary-image-1.jpg','PG Design Hero Image 2',1,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(18,6,'/images/diary-image-2.jpg','PG Design Hero Image 3',2,1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `hero_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_slider_data`
--

DROP TABLE IF EXISTS `image_slider_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_slider_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `image_url` varchar(500) NOT NULL,
  `image_alt` varchar(255) DEFAULT '',
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `size` varchar(100) NOT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `image_slider_data_display_order_is_active_index` (`display_order`,`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_slider_data`
--

LOCK TABLES `image_slider_data` WRITE;
/*!40000 ALTER TABLE `image_slider_data` DISABLE KEYS */;
INSERT INTO `image_slider_data` VALUES (22,'/images/diary-image-1.jpg','NHÀ ANH TRẠCH','NHÀ ANH TRẠCH','Thi công nội thất nhà phố','180m2',0,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(23,'/images/diary-image-2.jpg','ANH MỸ - OPAL GARDEN','ANH MỸ - OPAL GARDEN','Thi công nội thất căn hộ','180m2',1,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(24,'/images/diary-image-3.jpg','SKY LINKED VILLA','SKY LINKED VILLA','Thi công nội thất biệt thự','180m2',2,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(25,'http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg','DỰ ÁN MỚI 1','DỰ ÁN MỚI 1','Thi công nội thất chung cư','120m2',3,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(26,'http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg','DỰ ÁN MỚI 2','DỰ ÁN MỚI 2','Thi công nội thất văn phòng','300m2',4,1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `image_slider_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (7,'001_create_hero_tables.js',1,'2025-07-07 14:36:14'),(8,'002_create_about_and_slider_tables.js',1,'2025-07-07 14:36:14'),(9,'003_create_stats_tables.js',1,'2025-07-07 14:36:14'),(10,'004_create_solution_tables.js',1,'2025-07-07 14:36:14'),(11,'005_create_workflow_tables.js',1,'2025-07-07 14:36:14'),(12,'006_create_diary_testimonial_consultation_tables.js',1,'2025-07-07 14:36:14'),(14,'007_create_intro_page_tables.js',2,'2025-07-11 01:38:57'),(15,'009_create_service_page_tables.js',3,'2025-07-11 01:39:12'),(16,'010_create_project_detail_tables.js',4,'2025-07-12 02:07:28'),(17,'008_create_project_page_tables.js',1,NULL),(19,'011_create_blog_page_tables.js',5,'2025-07-13 00:08:30'),(20,'012_create_project_sub_categories_table.js',6,'2025-07-13 00:08:56'),(21,'013_add_unique_constraint_to_project_categories.js',7,'2025-07-13 01:12:07'),(22,'014_add_unique_constraint_to_sub_category_id.js',8,'2025-07-13 01:53:33'),(23,'015_add_not_null_constraint_to_project_sub_category_id.js',9,'2025-07-13 02:32:10'),(24,'016_add_image_url_to_service_page_process_sections.js',10,'2025-07-13 12:48:49'),(25,'016_add_is_on_homepage_to_project_details.js',11,'2025-07-13 16:36:16');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mission_items`
--

DROP TABLE IF EXISTS `mission_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mission_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `vision_mission_id` int unsigned DEFAULT NULL,
  `item_text` text NOT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `mission_items_vision_mission_id_display_order_index` (`vision_mission_id`,`display_order`),
  CONSTRAINT `mission_items_vision_mission_id_foreign` FOREIGN KEY (`vision_mission_id`) REFERENCES `vision_mission_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mission_items`
--

LOCK TABLES `mission_items` WRITE;
/*!40000 ALTER TABLE `mission_items` DISABLE KEYS */;
INSERT INTO `mission_items` VALUES (1,1,'Cung cấp các giải pháp thiết kế - thi công đồng bộ, chuyên nghiệp, đúng tiến độ tối ưu chi phí mà vẫn đảm bảo chất lượng và phong cách riêng.',0,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(2,1,'Đạt chuẩn mực thiết kế dựa trên nhu cầu, gu thẩm mỹ và mục tiêu sử dụng của từng khách hàng.',1,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(3,1,'Không ngừng sáng tạo, cập nhật xu hướng vật liệu, công nghệ và phong cách mới trong ngành thiết kế - nội thất.',2,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(4,1,'Xây dựng mối quan hệ lâu dài với khách hàng trên nền tảng uy tín - minh bạch - tận tâm.',3,1,'2025-07-13 07:03:23','2025-07-13 07:03:23');
/*!40000 ALTER TABLE `mission_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_categories`
--

DROP TABLE IF EXISTS `project_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `categories_data_id` int unsigned NOT NULL,
  `category_id` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `project_count` int DEFAULT '0',
  `background_image_url` text NOT NULL,
  `navigation_path` varchar(255) NOT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_categories_category_id_unique` (`category_id`),
  KEY `categories_data_id` (`categories_data_id`),
  CONSTRAINT `project_categories_ibfk_1` FOREIGN KEY (`categories_data_id`) REFERENCES `project_categories_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_categories`
--

LOCK TABLES `project_categories` WRITE;
/*!40000 ALTER TABLE `project_categories` DISABLE KEYS */;
INSERT INTO `project_categories` VALUES (1,1,'house-normal','NHÀ PHỐ',45,'http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg','/projects/house-normal',0,1,'2025-07-12 16:46:33','2025-07-12 16:46:33'),(2,1,'house-full','Xây nhà trọn gói',32,'http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg','/projects/house-full',1,1,'2025-07-12 16:46:33','2025-07-12 16:46:33'),(3,1,'house-rough','Xây dựng phần thô',28,'http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg','/projects/house-rough',2,1,'2025-07-12 16:46:33','2025-07-12 16:46:33'),(4,1,'house-interior','Thiết kế và thi công nội thất',50,'http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg','/projects/house-interior',3,1,'2025-07-12 16:46:33','2025-07-12 16:46:33');
/*!40000 ALTER TABLE `project_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_categories_data`
--

DROP TABLE IF EXISTS `project_categories_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_categories_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `main_title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_categories_data`
--

LOCK TABLES `project_categories_data` WRITE;
/*!40000 ALTER TABLE `project_categories_data` DISABLE KEYS */;
INSERT INTO `project_categories_data` VALUES (1,'DANH MỤC DỰ ÁN','KHÁM PHÁ CÁC LOẠI HÌNH THIẾT KẾ','Từ những căn nhà phố hiện đại đến những biệt thự sang trọng, từ không gian nội thất tinh tế đến những ngôi nhà vườn xanh mát - chúng tôi mang đến giải pháp thiết kế toàn diện cho mọi nhu cầu.',1,'2025-07-12 16:46:33','2025-07-12 16:46:33');
/*!40000 ALTER TABLE `project_categories_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_details`
--

DROP TABLE IF EXISTS `project_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_details` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `project_id` varchar(100) NOT NULL COMMENT 'Unique identifier for the project',
  `title` varchar(300) NOT NULL COMMENT 'Project title',
  `client_name` varchar(200) NOT NULL COMMENT 'Client name',
  `area` varchar(50) NOT NULL COMMENT 'Project area',
  `construction_date` date NOT NULL COMMENT 'Construction start date',
  `address` varchar(500) NOT NULL COMMENT 'Project address',
  `description` text COMMENT 'Project description',
  `category` varchar(100) NOT NULL COMMENT 'Project category',
  `project_sub_category_id` int unsigned NOT NULL,
  `sub_category` varchar(100) NOT NULL COMMENT 'Project sub category',
  `style` varchar(100) DEFAULT NULL COMMENT 'Project style',
  `thumbnail_image` varchar(500) DEFAULT NULL COMMENT 'Thumbnail image URL',
  `html_content` longtext NOT NULL COMMENT 'HTML content for project detail page',
  `project_images` json DEFAULT NULL COMMENT 'Array of project image URLs',
  `project_status` varchar(100) DEFAULT NULL COMMENT 'Project status',
  `project_budget` varchar(100) DEFAULT NULL COMMENT 'Project budget',
  `completion_date` date DEFAULT NULL COMMENT 'Project completion date',
  `architect_name` varchar(200) DEFAULT NULL COMMENT 'Architect name',
  `contractor_name` varchar(200) DEFAULT NULL COMMENT 'Contractor name',
  `meta_title` varchar(300) DEFAULT NULL COMMENT 'SEO meta title',
  `meta_description` text COMMENT 'SEO meta description',
  `tags` json DEFAULT NULL COMMENT 'Array of project tags',
  `is_active` tinyint(1) DEFAULT '1' COMMENT 'Whether the project is active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_on_homepage` tinyint(1) DEFAULT '0' COMMENT 'Whether this project should appear on the homepage image slider',
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_details_project_id_unique` (`project_id`),
  KEY `project_details_project_id_index` (`project_id`),
  KEY `project_details_category_index` (`category`),
  KEY `project_details_sub_category_index` (`sub_category`),
  KEY `project_details_is_active_index` (`is_active`),
  KEY `project_details_project_sub_category_id_foreign` (`project_sub_category_id`),
  KEY `idx_project_details_is_on_homepage` (`is_on_homepage`),
  CONSTRAINT `project_details_project_sub_category_id_foreign` FOREIGN KEY (`project_sub_category_id`) REFERENCES `project_sub_categories` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_details`
--

LOCK TABLES `project_details` WRITE;
/*!40000 ALTER TABLE `project_details` DISABLE KEYS */;
INSERT INTO `project_details` VALUES (1,'project-001','Nhà Phố Hiện Đại 3 Tầng','Anh Nguyễn Văn A','120m²','2023-06-15','123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM','Thiết kế nhà phố hiện đại với không gian mở và ánh sáng tự nhiên','house-normal',1,'Nhà Ống','Hiện đại','http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg','\n    <p style=\"line-height: 1.6; color: #333; margin-bottom: 1rem;\">Đây là dự án nhà phố hiện đại được thiết kế với phong cách tối giản nhưng không kém phần sang trọng. Công trình được hoàn thành với chất lượng cao và sự hài lòng của khách hàng.</p>\n    \n    <h3 style=\"color: #1b3025; margin-top: 2rem; margin-bottom: 1rem;\">Đặc điểm nổi bật</h3>\n    <ul style=\"line-height: 1.6; color: #555;\">\n      <li style=\"margin-bottom: 0.5rem;\">Thiết kế mặt tiền hiện đại với các đường nét sạch sẽ</li>\n      <li style=\"margin-bottom: 0.5rem;\">Tối ưu hóa ánh sáng tự nhiên cho toàn bộ không gian</li>\n      <li style=\"margin-bottom: 0.5rem;\">Sử dụng vật liệu cao cấp và thân thiện với môi trường</li>\n      <li style=\"margin-bottom: 0.5rem;\">Bố trí không gian thông minh, tận dụng tối đa diện tích</li>\n    </ul>\n    \n    <h3 style=\"color: #1b3025; margin-top: 2rem; margin-bottom: 1rem;\">Không gian chức năng</h3>\n    <p style=\"line-height: 1.6; color: #333; margin-bottom: 1rem;\"><strong style=\"color: #1b3025;\">Tầng 1:</strong> Phòng khách, phòng bếp, phòng ăn và khu vực tiếp khách</p>\n    <p style=\"line-height: 1.6; color: #333; margin-bottom: 1rem;\"><strong style=\"color: #1b3025;\">Tầng 2:</strong> Phòng ngủ chính, phòng ngủ khách và phòng tắm</p>\n    <p style=\"line-height: 1.6; color: #333; margin-bottom: 1rem;\"><strong style=\"color: #1b3025;\">Tầng 3:</strong> Phòng làm việc, khu vực thư giãn và sân thượng</p>\n    \n    <div style=\"margin: 2rem 0;\">\n      <h3 style=\"color: #1b3025; margin-top: 2rem; margin-bottom: 1rem;\">Hình ảnh dự án</h3>\n      <div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-top: 1rem;\">\n        <img src=\"/assets/images/diary-image-1.jpg\" alt=\"Mặt tiền nhà\" style=\"width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);\">\n        <img src=\"/assets/images/diary-image-2.jpg\" alt=\"Phòng khách\" style=\"width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);\">\n        <img src=\"/assets/images/diary-image-3.jpg\" alt=\"Phòng bếp\" style=\"width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);\">\n        <img src=\"/assets/images/diary-image-4.jpg\" alt=\"Phòng ngủ\" style=\"width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);\">\n      </div>\n    </div>\n    \n    <h3 style=\"color: #1b3025; margin-top: 2rem; margin-bottom: 1rem;\">Vật liệu sử dụng</h3>\n    <ul style=\"line-height: 1.6; color: #555;\">\n      <li style=\"margin-bottom: 0.5rem;\">Gạch ốp lát: Granite cao cấp</li>\n      <li style=\"margin-bottom: 0.5rem;\">Cửa sổ: Nhôm kính cường lực</li>\n      <li style=\"margin-bottom: 0.5rem;\">Sơn: Sơn nước cao cấp chống thấm</li>\n      <li style=\"margin-bottom: 0.5rem;\">Hệ thống điện: Schneider Electric</li>\n      <li style=\"margin-bottom: 0.5rem;\">Cửa gỗ: Gỗ công nghiệp MDF chống ẩm</li>\n      <li style=\"margin-bottom: 0.5rem;\">Sàn gỗ: Sàn gỗ công nghiệp cao cấp</li>\n    </ul>\n    \n    <p style=\"line-height: 1.6; color: #333; margin-bottom: 1rem;\">\n      <em style=\"color: #666; font-style: italic;\">\n        Dự án được hoàn thành vào tháng 12/2023 với sự hài lòng cao của khách hàng. \n        Đây là minh chứng cho chất lượng và uy tín của PG Design trong lĩnh vực thiết kế và thi công.\n      </em>\n    </p>\n    \n    <div style=\"background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 2rem; border-radius: 8px; margin: 2rem 0; border-left: 4px solid #4CAF50;\">\n      <h3 style=\"color: #1b3025; margin-bottom: 1rem;\">Cam kết chất lượng</h3>\n      <p style=\"color: #333; line-height: 1.6; margin-bottom: 1rem;\">\n        PG Design cam kết mang đến cho khách hàng những công trình chất lượng cao với:\n      </p>\n      <ul style=\"color: #555; line-height: 1.6; margin: 0;\">\n        <li style=\"margin-bottom: 0.5rem;\">✓ Thiết kế độc đáo, phù hợp với nhu cầu khách hàng</li>\n        <li style=\"margin-bottom: 0.5rem;\">✓ Vật liệu xây dựng chất lượng cao, có nguồn gốc rõ ràng</li>\n        <li style=\"margin-bottom: 0.5rem;\">✓ Thi công đúng tiến độ với đội ngũ thợ lành nghề</li>\n        <li style=\"margin-bottom: 0.5rem;\">✓ Bảo hành công trình lên đến 2 năm</li>\n        <li style=\"margin-bottom: 0;\">✓ Hỗ trợ khách hàng 24/7 trong quá trình thi công</li>\n      </ul>\n    </div>\n    ','[\"http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg\", \"http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg\", \"http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg\", \"http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg\"]','Hoàn thành','2.5 tỷ đồng','2023-12-20','KTS. Lê Văn B','Công ty TNHH Xây dựng PG Design','Nhà Phố Hiện Đại 3 Tầng - Dự án PG Design','Khám phá dự án nhà phố hiện đại 3 tầng với thiết kế tinh tế và không gian sống tối ưu.','[\"nhà phố\", \"hiện đại\", \"3 tầng\", \"thiết kế\", \"xây dựng\"]',1,'2025-07-11 19:07:42','2025-07-13 04:02:00',1),(2,'project-002','Biệt Thự 2 Tầng Sang Trọng','Chị Trần Thị B','200m²','2023-08-01','456 Đường Lê Văn Sỹ, Quận 3, TP.HCM','Thiết kế biệt thự sang trọng với kiến trúc cổ điển','house-full',7,'Biệt Thự','Cổ điển','http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg','\n    <p style=\"line-height: 1.6; color: #333; margin-bottom: 1rem;\">Biệt thự 2 tầng với thiết kế sang trọng, kết hợp giữa kiến trúc cổ điển và hiện đại.</p>\n    \n    <h3 style=\"color: #1b3025; margin-top: 2rem; margin-bottom: 1rem;\">Đặc điểm thiết kế</h3>\n    <ul style=\"line-height: 1.6; color: #555;\">\n      <li style=\"margin-bottom: 0.5rem;\">Kiến trúc cổ điển Châu Âu</li>\n      <li style=\"margin-bottom: 0.5rem;\">Sân vườn rộng rãi</li>\n      <li style=\"margin-bottom: 0.5rem;\">Nội thất cao cấp</li>\n      <li style=\"margin-bottom: 0.5rem;\">Hệ thống smart home</li>\n    </ul>\n    ','[\"http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg\", \"http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg\", \"http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg\"]','Hoàn thành','5.2 tỷ đồng','2024-01-15','KTS. Nguyễn Văn C','Công ty TNHH Xây dựng PG Design','Biệt Thự 2 Tầng Sang Trọng - Dự án PG Design','Khám phá biệt thự 2 tầng với thiết kế sang trọng và kiến trúc cổ điển.','[\"biệt thự\", \"cổ điển\", \"2 tầng\", \"sang trọng\"]',1,'2025-07-11 19:07:42','2025-07-13 04:02:00',1),(4,'nha-ong-001','Nhà Ống 3 Tầng Hiện Đại - Quận 1','Anh Minh - Chị Lan','4m x 18m','2023-03-15','123 Nguyễn Thị Minh Khai, Q1, TP.HCM','Nhà ống 3 tầng thiết kế hiện đại, tận dụng tối đa không gian hẹp','house-normal',1,'nha-ong','Hiện đại','http://localhost:9000/pgdesign-assets/projects/nha-ong-001/thumbnail.jpg','<h2>Nhà Ống 3 Tầng Hiện Đại</h2><p>Thiết kế tối ưu không gian cho gia đình trẻ tại trung tâm thành phố.</p>','[\"http://localhost:9000/pgdesign-assets/projects/nha-ong-001/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/nha-ong-001/image2.jpg\", \"http://localhost:9000/pgdesign-assets/projects/nha-ong-001/image3.jpg\"]','Hoàn thành','2.8 tỷ','2023-08-20','KTS Nguyễn Văn A','Công ty PG Design','Nhà Ống 3 Tầng Hiện Đại - Quận 1','Thiết kế nhà ống 3 tầng hiện đại tại Quận 1, tối ưu không gian sống','[\"nhà ống\", \"hiện đại\", \"quận 1\", \"3 tầng\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',1),(5,'nha-ong-002','Nhà Ống 4 Tầng Tân Cổ Điển - Quận 7','Anh Hùng - Chị Hoa','4.5m x 20m','2023-06-10','456 Nguyễn Thị Thập, Q7, TP.HCM','Nhà ống 4 tầng phong cách tân cổ điển, sang trọng và tiện nghi','house-normal',1,'nha-ong','Tân cổ điển','http://localhost:9000/pgdesign-assets/projects/nha-ong-002/thumbnail.jpg','<h2>Nhà Ống 4 Tầng Tân Cổ Điển</h2><p>Kết hợp giữa phong cách cổ điển và tiện nghi hiện đại.</p>','[\"http://localhost:9000/pgdesign-assets/projects/nha-ong-002/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/nha-ong-002/image2.jpg\"]','Hoàn thành','3.2 tỷ','2023-11-15','KTS Trần Thị B','Công ty PG Design','Nhà Ống 4 Tầng Tân Cổ Điển - Quận 7','Thiết kế nhà ống 4 tầng tân cổ điển tại Quận 7, sang trọng và tiện nghi','[\"nhà ống\", \"tân cổ điển\", \"quận 7\", \"4 tầng\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',1),(6,'nha-lien-ke-001','Nhà Liền Kề 2 Tầng - Khu Đô Thị Vinhomes','Anh Đức - Chị Mai','5m x 20m','2023-04-20','Vinhomes Central Park, Q. Bình Thạnh, TP.HCM','Nhà liền kề 2 tầng trong khu đô thị cao cấp, thiết kế sang trọng','house-normal',2,'nha-lien-ke','Hiện đại','http://localhost:9000/pgdesign-assets/projects/nha-lien-ke-001/thumbnail.jpg','<h2>Nhà Liền Kề 2 Tầng</h2><p>Thiết kế nhà liền kề hiện đại trong khu đô thị cao cấp.</p>','[\"http://localhost:9000/pgdesign-assets/projects/nha-lien-ke-001/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/nha-lien-ke-001/image2.jpg\"]','Hoàn thành','4.5 tỷ','2023-09-30','KTS Lê Văn C','Công ty PG Design','Nhà Liền Kề 2 Tầng - Khu Đô Thị Vinhomes','Thiết kế nhà liền kề 2 tầng tại Vinhomes Central Park','[\"nhà liền kề\", \"vinhomes\", \"hiện đại\", \"2 tầng\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',0),(7,'nha-lien-ke-002','Nhà Liền Kề 3 Tầng - Khu Đô Thị Ecopark','Anh Tùng - Chị Linh','6m x 18m','2023-07-05','Ecopark, Văn Giang, Hưng Yên','Nhà liền kề 3 tầng phong cách Châu Âu, gần thiên nhiên','house-normal',2,'nha-lien-ke','Châu Âu','http://localhost:9000/pgdesign-assets/projects/nha-lien-ke-002/thumbnail.jpg','<h2>Nhà Liền Kề 3 Tầng</h2><p>Phong cách Châu Âu cổ điển, hòa mình với thiên nhiên.</p>','[\"http://localhost:9000/pgdesign-assets/projects/nha-lien-ke-002/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/nha-lien-ke-002/image2.jpg\", \"http://localhost:9000/pgdesign-assets/projects/nha-lien-ke-002/image3.jpg\"]','Hoàn thành','5.2 tỷ','2023-12-20','KTS Phạm Thị D','Công ty PG Design','Nhà Liền Kề 3 Tầng - Khu Đô Thị Ecopark','Thiết kế nhà liền kề 3 tầng phong cách Châu Âu tại Ecopark','[\"nhà liền kề\", \"ecopark\", \"châu âu\", \"3 tầng\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',0),(8,'san-vuon-001','Nhà Phố Có Sân Vườn - Quận 2','Anh Khoa - Chị Nga','8m x 25m','2023-05-15','789 Đường Số 1, Q2, TP.HCM','Nhà phố có sân vườn rộng rãi, thiết kế xanh và thân thiện với môi trường','house-normal',3,'house-normal-san-vuon','Tropical','http://localhost:9000/pgdesign-assets/projects/san-vuon-001/thumbnail.jpg','<h2>Nhà Phố Có Sân Vườn</h2><p>Thiết kế xanh, hòa hợp với thiên nhiên.</p>','[\"http://localhost:9000/pgdesign-assets/projects/san-vuon-001/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/san-vuon-001/image2.jpg\", \"http://localhost:9000/pgdesign-assets/projects/san-vuon-001/image3.jpg\"]','Hoàn thành','6.8 tỷ','2023-10-25','KTS Võ Văn E','Công ty PG Design','Nhà Phố Có Sân Vườn - Quận 2','Thiết kế nhà phố có sân vườn rộng rãi tại Quận 2','[\"nhà phố\", \"sân vườn\", \"tropical\", \"quận 2\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',0),(9,'shophouse-001','Shophouse 3 Tầng - Mặt Tiền Kinh Doanh','Anh Phong - Chị Thủy','5m x 22m','2023-02-10','321 Lê Văn Việt, Q9, TP.HCM','Shophouse 3 tầng thiết kế hiện đại, tầng 1 kinh doanh, tầng 2-3 ở','house-normal',4,'shophouse','Hiện đại','http://localhost:9000/pgdesign-assets/projects/shophouse-001/thumbnail.jpg','<h2>Shophouse 3 Tầng</h2><p>Kết hợp kinh doanh và sinh hoạt gia đình.</p>','[\"http://localhost:9000/pgdesign-assets/projects/shophouse-001/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/shophouse-001/image2.jpg\"]','Hoàn thành','4.2 tỷ','2023-07-30','KTS Hoàng Thị F','Công ty PG Design','Shophouse 3 Tầng - Mặt Tiền Kinh Doanh','Thiết kế shophouse 3 tầng tại Quận 9, kết hợp kinh doanh và ở','[\"shophouse\", \"kinh doanh\", \"hiện đại\", \"3 tầng\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',0),(10,'shophouse-002','Shophouse 4 Tầng - Phố Cổ Hà Nội','Anh Nam - Chị Bình','4m x 15m','2023-08-01','456 Hàng Bạc, Hoàn Kiếm, Hà Nội','Shophouse 4 tầng phong cách cổ điển, phù hợp với kiến trúc phố cổ','house-normal',4,'shophouse','Cổ điển','http://localhost:9000/pgdesign-assets/projects/shophouse-002/thumbnail.jpg','<h2>Shophouse 4 Tầng</h2><p>Giữ nguyên nét đặc trưng của phố cổ Hà Nội.</p>','[\"http://localhost:9000/pgdesign-assets/projects/shophouse-002/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/shophouse-002/image2.jpg\", \"http://localhost:9000/pgdesign-assets/projects/shophouse-002/image3.jpg\"]','Đang thi công','3.8 tỷ','2024-02-15','KTS Đỗ Văn G','Công ty PG Design','Shophouse 4 Tầng - Phố Cổ Hà Nội','Thiết kế shophouse 4 tầng cổ điển tại phố cổ Hà Nội','[\"shophouse\", \"phố cổ\", \"cổ điển\", \"hà nội\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',0),(11,'resort-villa-001','Resort Villa - Biệt Thự Nghỉ Dưỡng Phan Thiết','Anh Đạt - Chị Yến','15m x 30m','2023-01-15','Mũi Né, Phan Thiết, Bình Thuận','Biệt thự nghỉ dưỡng phong cách resort, view biển tuyệt đẹp','house-full',5,'resort-villa','Resort','http://localhost:9000/pgdesign-assets/projects/resort-villa-001/thumbnail.jpg','<h2>Resort Villa</h2><p>Biệt thự nghỉ dưỡng sang trọng bên bờ biển.</p>','[\"http://localhost:9000/pgdesign-assets/projects/resort-villa-001/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/resort-villa-001/image2.jpg\", \"http://localhost:9000/pgdesign-assets/projects/resort-villa-001/image3.jpg\", \"http://localhost:9000/pgdesign-assets/projects/resort-villa-001/image4.jpg\"]','Hoàn thành','12.5 tỷ','2023-08-30','KTS Nguyễn Thị H','Công ty PG Design','Resort Villa - Biệt Thự Nghỉ Dưỡng Phan Thiết','Biệt thự nghỉ dưỡng phong cách resort tại Phan Thiết','[\"resort\", \"villa\", \"nghỉ dưỡng\", \"phan thiết\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',0),(12,'resort-villa-002','Resort Villa - Biệt Thự Đà Lạt','Anh Hiếu - Chị Lan','12m x 28m','2023-06-20','Khu Du Lịch Đà Lạt, Lâm Đồng','Biệt thự nghỉ dưỡng phong cách châu Âu giữa khí hậu Đà Lạt','house-full',5,'resort-villa','Châu Âu','http://localhost:9000/pgdesign-assets/projects/resort-villa-002/thumbnail.jpg','<h2>Resort Villa Đà Lạt</h2><p>Biệt thự nghỉ dưỡng phong cách châu Âu.</p>','[\"http://localhost:9000/pgdesign-assets/projects/resort-villa-002/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/resort-villa-002/image2.jpg\"]','Hoàn thành','8.9 tỷ','2023-12-10','KTS Trần Văn I','Công ty PG Design','Resort Villa - Biệt Thự Đà Lạt','Biệt thự nghỉ dưỡng phong cách châu Âu tại Đà Lạt','[\"resort\", \"villa\", \"đà lạt\", \"châu âu\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',0),(13,'mini-garden-001','Nhà Vườn Mini - Biệt Thự Vườn Quận 12','Anh Thành - Chị Hương','10m x 20m','2023-03-25','123 Đường Tô Ký, Q12, TP.HCM','Nhà vườn mini với thiết kế xanh, có khu vườn nhỏ thư giãn','house-full',6,'mini-garden','Garden','http://localhost:9000/pgdesign-assets/projects/mini-garden-001/thumbnail.jpg','<h2>Nhà Vườn Mini</h2><p>Thiết kế xanh với khu vườn nhỏ thư giãn.</p>','[\"http://localhost:9000/pgdesign-assets/projects/mini-garden-001/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/mini-garden-001/image2.jpg\", \"http://localhost:9000/pgdesign-assets/projects/mini-garden-001/image3.jpg\"]','Hoàn thành','5.6 tỷ','2023-09-15','KTS Lê Thị J','Công ty PG Design','Nhà Vườn Mini - Biệt Thự Vườn Quận 12','Nhà vườn mini với thiết kế xanh tại Quận 12','[\"nhà vườn\", \"mini\", \"xanh\", \"quận 12\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',0),(14,'song-lap-001','Biệt Thự Song Lập - Khu Compound Thảo Điền','Anh Hải - Chị Phương','8m x 25m','2023-04-10','Compound Thảo Điền, Q2, TP.HCM','Biệt thự song lập xây dựng phần thô, thiết kế hiện đại','house-rough',8,'house-rough-song-lap','Hiện đại','http://localhost:9000/pgdesign-assets/projects/song-lap-001/thumbnail.jpg','<h2>Biệt Thự Song Lập</h2><p>Xây dựng phần thô với thiết kế hiện đại.</p>','[\"http://localhost:9000/pgdesign-assets/projects/song-lap-001/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/song-lap-001/image2.jpg\"]','Hoàn thành phần thô','4.8 tỷ','2023-08-20','KTS Phạm Văn K','Công ty PG Design','Biệt Thự Song Lập - Khu Compound Thảo Điền','Biệt thự song lập xây dựng phần thô tại Thảo Điền','[\"biệt thự\", \"song lập\", \"phần thô\", \"thảo điền\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',0),(15,'mai-thai-001','Nhà Cấp 4 Mái Thái - Thiết Kế Nội Thất Đồng Nai','Anh Bình - Chị Ngọc','12m x 18m','2023-05-05','KCN Biên Hòa, Đồng Nai','Nhà cấp 4 mái thái thiết kế nội thất hiện đại, ấm cúng','house-interior',9,'mai-thai','Hiện đại','http://localhost:9000/pgdesign-assets/projects/mai-thai-001/thumbnail.jpg','<h2>Nhà Cấp 4 Mái Thái</h2><p>Thiết kế nội thất hiện đại, ấm cúng.</p>','[\"http://localhost:9000/pgdesign-assets/projects/mai-thai-001/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/mai-thai-001/image2.jpg\", \"http://localhost:9000/pgdesign-assets/projects/mai-thai-001/image3.jpg\"]','Hoàn thành','1.8 tỷ','2023-08-15','KTS Ngô Thị L','Công ty PG Design','Nhà Cấp 4 Mái Thái - Thiết Kế Nội Thất Đồng Nai','Nhà cấp 4 mái thái thiết kế nội thất hiện đại tại Đồng Nai','[\"nhà cấp 4\", \"mái thái\", \"nội thất\", \"đồng nai\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',0),(16,'mai-nhat-001','Nhà Cấp 4 Mái Nhật - Nội Thất Minimalist','Anh Quang - Chị Linh','10m x 16m','2023-06-15','Huyện Củ Chi, TP.HCM','Nhà cấp 4 mái nhật thiết kế nội thất phong cách minimalist','house-interior',10,'mai-nhat','Minimalist','http://localhost:9000/pgdesign-assets/projects/mai-nhat-001/thumbnail.jpg','<h2>Nhà Cấp 4 Mái Nhật</h2><p>Nội thất minimalist, đơn giản và tinh tế.</p>','[\"http://localhost:9000/pgdesign-assets/projects/mai-nhat-001/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/mai-nhat-001/image2.jpg\"]','Hoàn thành','1.6 tỷ','2023-09-30','KTS Vũ Văn M','Công ty PG Design','Nhà Cấp 4 Mái Nhật - Nội Thất Minimalist','Nhà cấp 4 mái nhật thiết kế nội thất minimalist tại Củ Chi','[\"nhà cấp 4\", \"mái nhật\", \"minimalist\", \"củ chi\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',0),(17,'mai-bang-001','Nhà Cấp 4 Mái Bằng - Nội Thất Scandinavian','Anh Tâm - Chị Hương','11m x 15m','2023-07-20','Huyện Nhà Bè, TP.HCM','Nhà cấp 4 mái bằng thiết kế nội thất phong cách Scandinavian','house-interior',11,'mai-bang','Scandinavian','http://localhost:9000/pgdesign-assets/projects/mai-bang-001/thumbnail.jpg','<h2>Nhà Cấp 4 Mái Bằng</h2><p>Nội thất Scandinavian tươi sáng và thoáng mát.</p>','[\"http://localhost:9000/pgdesign-assets/projects/mai-bang-001/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/mai-bang-001/image2.jpg\"]','Hoàn thành','1.7 tỷ','2023-10-15','KTS Đặng Thị N','Công ty PG Design','Nhà Cấp 4 Mái Bằng - Nội Thất Scandinavian','Nhà cấp 4 mái bằng thiết kế nội thất Scandinavian tại Nhà Bè','[\"nhà cấp 4\", \"mái bằng\", \"scandinavian\", \"nhà bè\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',0),(18,'gac-lung-001','Nhà Cấp 4 Gác Lửng - Nội Thất Industrial','Anh Dũng - Chị Thảo','9m x 14m','2023-08-10','Huyện Hóc Môn, TP.HCM','Nhà cấp 4 có gác lửng thiết kế nội thất phong cách industrial','house-interior',12,'gac-lung','Industrial','http://localhost:9000/pgdesign-assets/projects/gac-lung-001/thumbnail.jpg','<h2>Nhà Cấp 4 Gác Lửng</h2><p>Nội thất industrial độc đáo và cá tính.</p>','[\"http://localhost:9000/pgdesign-assets/projects/gac-lung-001/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/gac-lung-001/image2.jpg\", \"http://localhost:9000/pgdesign-assets/projects/gac-lung-001/image3.jpg\"]','Hoàn thành','1.9 tỷ','2023-11-25','KTS Bùi Văn O','Công ty PG Design','Nhà Cấp 4 Gác Lửng - Nội Thất Industrial','Nhà cấp 4 gác lửng thiết kế nội thất industrial tại Hóc Môn','[\"nhà cấp 4\", \"gác lửng\", \"industrial\", \"hóc môn\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',0),(19,'gac-lung-002','Nhà Cấp 4 Gác Lửng - Nội Thất Vintage','Anh Vinh - Chị Oanh','8m x 16m','2023-09-05','Huyện Bình Chánh, TP.HCM','Nhà cấp 4 có gác lửng thiết kế nội thất phong cách vintage','house-interior',12,'gac-lung','Vintage','http://localhost:9000/pgdesign-assets/projects/gac-lung-002/thumbnail.jpg','<h2>Nhà Cấp 4 Gác Lửng</h2><p>Nội thất vintage ấm áp và cổ điển.</p>','[\"http://localhost:9000/pgdesign-assets/projects/gac-lung-002/image1.jpg\", \"http://localhost:9000/pgdesign-assets/projects/gac-lung-002/image2.jpg\"]','Hoàn thành','2.1 tỷ','2023-12-30','KTS Cao Thị P','Công ty PG Design','Nhà Cấp 4 Gác Lửng - Nội Thất Vintage','Nhà cấp 4 gác lửng thiết kế nội thất vintage tại Bình Chánh','[\"nhà cấp 4\", \"gác lửng\", \"vintage\", \"bình chánh\"]',1,'2025-07-12 20:15:10','2025-07-12 20:15:10',0);
/*!40000 ALTER TABLE `project_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_diary_data`
--

DROP TABLE IF EXISTS `project_diary_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_diary_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_diary_data`
--

LOCK TABLES `project_diary_data` WRITE;
/*!40000 ALTER TABLE `project_diary_data` DISABLE KEYS */;
INSERT INTO `project_diary_data` VALUES (4,'NHẬT KÝ HÀNH TRÌNH',1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `project_diary_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_diary_images`
--

DROP TABLE IF EXISTS `project_diary_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_diary_images` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `project_diary_id` int unsigned DEFAULT NULL,
  `image_url` varchar(500) NOT NULL,
  `image_alt` varchar(255) DEFAULT '',
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `project_diary_images_project_diary_id_display_order_index` (`project_diary_id`,`display_order`),
  CONSTRAINT `project_diary_images_project_diary_id_foreign` FOREIGN KEY (`project_diary_id`) REFERENCES `project_diary_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_diary_images`
--

LOCK TABLES `project_diary_images` WRITE;
/*!40000 ALTER TABLE `project_diary_images` DISABLE KEYS */;
INSERT INTO `project_diary_images` VALUES (25,4,'http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg','People presenting something at a table',0,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(26,4,'http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg','People inspecting a room in construction',1,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(27,4,'http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg','Construction workers reviewing plans',2,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(28,4,'http://localhost:9000/pgdesign-assets/images/diary-image-5.jpg','Stylish kitchen interior',3,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(29,4,'http://localhost:9000/pgdesign-assets/images/diary-image-6.jpg','Person using a tablet at a desk',4,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(30,4,'http://localhost:9000/pgdesign-assets/images/diary-image-7.jpg','Modern living room interior',5,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(31,4,'http://localhost:9000/pgdesign-assets/images/diary-image-8.jpg','Team standing in front of a house design',6,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(32,4,'http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg','Worker installing a window',7,1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `project_diary_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_specifications`
--

DROP TABLE IF EXISTS `project_specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_specifications` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `project_detail_id` int unsigned NOT NULL COMMENT 'Reference to project_details table',
  `label` varchar(200) NOT NULL COMMENT 'Specification label',
  `value` varchar(100) NOT NULL COMMENT 'Specification value',
  `unit` varchar(50) DEFAULT NULL COMMENT 'Unit of measurement',
  `display_order` int DEFAULT '0' COMMENT 'Display order',
  `is_active` tinyint(1) DEFAULT '1' COMMENT 'Whether the specification is active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `project_specifications_project_detail_id_index` (`project_detail_id`),
  KEY `project_specifications_display_order_index` (`display_order`),
  KEY `project_specifications_is_active_index` (`is_active`),
  CONSTRAINT `project_specifications_project_detail_id_foreign` FOREIGN KEY (`project_detail_id`) REFERENCES `project_details` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_specifications`
--

LOCK TABLES `project_specifications` WRITE;
/*!40000 ALTER TABLE `project_specifications` DISABLE KEYS */;
INSERT INTO `project_specifications` VALUES (1,1,'Diện tích đất','120','m²',1,1,'2025-07-11 19:07:42','2025-07-11 19:07:42'),(2,1,'Diện tích xây dựng','300','m²',2,1,'2025-07-11 19:07:42','2025-07-11 19:07:42'),(3,1,'Số tầng','3','',3,1,'2025-07-11 19:07:42','2025-07-11 19:07:42'),(4,1,'Số phòng ngủ','4','',4,1,'2025-07-11 19:07:42','2025-07-11 19:07:42'),(5,1,'Số phòng tắm','3','',5,1,'2025-07-11 19:07:42','2025-07-11 19:07:42'),(6,2,'Diện tích đất','200','m²',1,1,'2025-07-11 19:07:42','2025-07-11 19:07:42'),(7,2,'Diện tích xây dựng','350','m²',2,1,'2025-07-11 19:07:42','2025-07-11 19:07:42'),(8,2,'Số tầng','2','',3,1,'2025-07-11 19:07:42','2025-07-11 19:07:42'),(9,2,'Số phòng ngủ','5','',4,1,'2025-07-11 19:07:42','2025-07-11 19:07:42'),(10,2,'Số phòng tắm','4','',5,1,'2025-07-11 19:07:42','2025-07-11 19:07:42');
/*!40000 ALTER TABLE `project_specifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_sub_categories`
--

DROP TABLE IF EXISTS `project_sub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_sub_categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `project_category_id` int unsigned NOT NULL,
  `sub_category_id` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `hero_image_url` text,
  `display_order` int DEFAULT '0',
  `project_count` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_sub_cat_unique` (`project_category_id`,`sub_category_id`),
  UNIQUE KEY `project_sub_categories_sub_category_id_unique` (`sub_category_id`),
  CONSTRAINT `project_sub_categories_project_category_id_foreign` FOREIGN KEY (`project_category_id`) REFERENCES `project_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_sub_categories`
--

LOCK TABLES `project_sub_categories` WRITE;
/*!40000 ALTER TABLE `project_sub_categories` DISABLE KEYS */;
INSERT INTO `project_sub_categories` VALUES (1,1,'nha-ong','Nhà Ống Updated via SubCategoryId','Updated description using sub_category_id parameter','http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg',0,4,1,'2025-07-12 17:11:33','2025-07-13 02:01:01'),(2,1,'nha-lien-ke','Nhà Liền Kề','Nhà phố trong khu quy hoạch, kiến trúc đồng bộ và hiện đại.','http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg',1,4,1,'2025-07-12 17:11:33','2025-07-12 17:11:33'),(3,1,'house-normal-san-vuon','Nhà Phố Có Sân Vườn','Kết hợp không gian xanh, tạo sự thông thoáng và gần gũi thiên nhiên.','http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg',2,4,1,'2025-07-12 17:11:33','2025-07-12 17:11:33'),(4,1,'shophouse','Shophouse','Tầng trệt kinh doanh, tầng trên ở, tối ưu hóa mặt tiền thu hút khách hàng.','http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg',3,4,1,'2025-07-12 17:11:33','2025-07-12 17:11:33'),(5,2,'resort-villa','Resort Garden Houses','Diện tích lớn, nhiều tiện ích cao cấp như hồ bơi, sân tennis.','http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg',0,4,1,'2025-07-12 17:11:33','2025-07-12 17:11:33'),(6,2,'mini-garden','Nhà Vườn Mini','Diện tích vừa phải, vẫn có không gian xanh và cảnh quan nhỏ.','http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg',1,4,1,'2025-07-12 17:11:33','2025-07-12 17:11:33'),(7,3,'house-rough-don-lap','Biệt Thự Đơn Lập','Hoàn toàn độc lập, 4 mặt thoáng, tối đa hóa sự riêng tư.','http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg',0,4,1,'2025-07-12 17:11:33','2025-07-12 17:11:33'),(8,3,'house-rough-song-lap','Biệt Thự Song Lập','Hai biệt thự kiến trúc đối xứng, chung một bức tường.','http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg',1,4,1,'2025-07-12 17:11:33','2025-07-12 17:11:33'),(9,4,'mai-thai','Nhà Cấp 4 Mái Thái','Mái dốc lớn hình chóp hoặc chữ A, đẹp mắt, thoát nước tốt.','http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg',0,4,1,'2025-07-12 17:11:33','2025-07-12 17:11:33'),(10,4,'mai-nhat','Nhà Cấp 4 Mái Nhật','Độ dốc ít hơn mái Thái, tạo vẻ trang nghiêm, phù hợp phong cách hiện đại.','http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg',1,4,1,'2025-07-12 17:11:33','2025-07-12 17:11:33'),(11,4,'mai-bang','Nhà Cấp 4 Mái Bằng','Mái phẳng, có thể tận dụng không gian mái, kiến trúc vững chắc, hiện đại.','http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg',2,4,1,'2025-07-12 17:11:33','2025-07-12 17:11:33'),(12,4,'gac-lung','Nhà Cấp 4 Gác Lửng','Có thêm không gian gác lửng để tối ưu diện tích sử dụng.','http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg',3,4,1,'2025-07-12 17:11:33','2025-07-12 17:11:33'),(13,1,'test-subcategory','Updated Test Subcategory','This is an updated test subcategory','https://example.com/test.jpg',99,0,0,'2025-07-13 01:35:24','2025-07-13 01:37:59');
/*!40000 ALTER TABLE `project_sub_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_types`
--

DROP TABLE IF EXISTS `project_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `consultation_form_id` int unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `project_types_consultation_form_id_display_order_index` (`consultation_form_id`,`display_order`),
  CONSTRAINT `project_types_consultation_form_id_foreign` FOREIGN KEY (`consultation_form_id`) REFERENCES `consultation_form_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_types`
--

LOCK TABLES `project_types` WRITE;
/*!40000 ALTER TABLE `project_types` DISABLE KEYS */;
INSERT INTO `project_types` VALUES (22,4,'-- Chọn loại công trình --',0,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(23,4,'Nhà Phố - Căn hộ',1,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(24,4,'Nhà hàng - Khách sạn',2,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(25,4,'Quán Cafe',3,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(26,4,'Văn phòng',4,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(27,4,'Biệt thự',5,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(28,4,'Shophouse',6,1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `project_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_page_construction_sections`
--

DROP TABLE IF EXISTS `service_page_construction_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_page_construction_sections` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `section_number` int NOT NULL,
  `title_left` varchar(200) NOT NULL,
  `contents_left` json NOT NULL,
  `title_right` varchar(200) NOT NULL,
  `contents_right` json NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service_page_construction_sections_section_number_unique` (`section_number`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_page_construction_sections`
--

LOCK TABLES `service_page_construction_sections` WRITE;
/*!40000 ALTER TABLE `service_page_construction_sections` DISABLE KEYS */;
INSERT INTO `service_page_construction_sections` VALUES (1,1,'THI CÔNG PHẦN THÔ','[\"Đào móng, thi công móng - thi công bể tự hoại\", \"Thi công hệ khung bê tông cột thép: cột, dầm, sàn, cầu thang\", \"Thi công tường bao che, tường ngăn nhà\", \"Lắp đặt hệ thống điện, nước âm tường, sàn\", \"Thi công chống thấm, cán nền sàn, tô tường\"]','TRỌN GÓI HOÀN THIỆN','[\"Lát gạch nền, tường, khu vực vệ sinh\", \"Sơn nước trong - ngoài nhà\", \"Lắp trần thạch cao, trang trí phào chỉ (nếu có)\", \"Lắp thiết bị vệ sinh\", \"Lắp hệ thống điện nổi, đèn chiếu sáng\", \"Lắp đặt cửa chính, cửa sổ, lan can\"]',1,'2025-07-13 05:59:31','2025-07-13 05:59:31'),(2,2,'THI CÔNG HOÀN THIỆN','[\"Ốp lát gạch nền, tường WC, bếp, ban công\", \"Sơn nước hoàn thiện trong - ngoài\", \"Thi công trần thạch cao, phào chỉ (nếu có)\", \"Lắp thiết bị điện, đèn chiếu sáng\", \"Lắp đặt thiết bị vệ sinh\", \"Vệ sinh tổng thể trước khi bàn giao\"]','THI CÔNG NỘI THẤT','[\"Gia công, sản xuất và lắp đặt nội thất theo bản vẽ thiết kế\", \"Trình mẫu vật tư và nghiệm thu vật liệu đầu vào trước khi sản xuất\", \"Vật liệu nội thất từ gỗ công nghiệp (An Cường,...) gỗ tự nhiên (gỗ óc chó...) hoặc gỗ nhựa (Picomat, WPB...)\", \"Cung cấp lắp đặt phụ kiện tủ từ cơ bản tới cao cấp\", \"Cung cấp và lắp đặt thiết bị bếp (máy rửa chén, bếp từ, lò vi sóng...)\", \"Cung cấp và lắp đặt thiết bị thông minh (nếu có)\", \"Nhận thi công nội thất từ thiết kế của khách hàng\"]',1,'2025-07-13 05:59:31','2025-07-13 05:59:31'),(3,3,'THIẾT KẾ KIẾN TRÚC','[\"Bản vẽ cơ sở kiến trúc\", \"Phối cảnh thiết kế hoàn chỉnh\", \"Bộ hồ sơ kiến trúc chi tiết\", \"Bộ hồ sơ kết cấu\", \"Hồ sơ kỹ thuật điện - nước\"]','THIẾT KẾ NỘI THẤT','[\"Định hướng không gian tổng thể\", \"Phối cảnh nội thất hoàn chỉnh\", \"Mặt bằng & chi tiết kỹ thuật\", \"Thiết kế chi tiết tiện ích phụ\", \"Hồ sơ kỹ thuật điện - công nghệ\"]',1,'2025-07-13 05:59:31','2025-07-13 05:59:31'),(4,4,'CẢI TẠO SỬA CHỮA','[\"Khảo sát thực tế hiện trạng công trình\", \"Đánh giá kết cấu, hệ thống điện nước, vật liệu, công năng\", \"Đề xuất phương án cải tạo phù hợp nhu cầu - thẩm mỹ - ngân sách\", \"Lập hồ sơ thiết kế cải tạo và dự toán công trình\", \"Thi công từ phần thô đến hoàn thiện\", \"Đảm bảo tiến độ, giám sát kỹ thuật và an toàn công trình trong suốt quá trình thi công\"]','DỰ ÁN ĐÃ CÓ BẢN VẼ','[\"Tiếp nhận, rà soát và phân tích bản vẽ thiết kế\", \"Tư vấn vật tư, phương án thi công phù hợp thực tế\", \"Bóc tách khối lượng - lập báo giá chi tiết\", \"Trình mẫu vật tư trước khi thi công\", \"Triển khai thi công theo đúng hồ sơ thiết kế\", \"Nghiệm thu từng phần & tổng thể công trình với CĐT trước khi bản giao\", \"Giám sát chặt chẽ - bảo hành công trình sau hoàn thiện\"]',1,'2025-07-13 05:59:31','2025-07-13 05:59:31');
/*!40000 ALTER TABLE `service_page_construction_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_page_hero`
--

DROP TABLE IF EXISTS `service_page_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_page_hero` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `main_title` varchar(100) NOT NULL,
  `brand_name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `hero_image_url` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `display_order` int DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_page_hero`
--

LOCK TABLES `service_page_hero` WRITE;
/*!40000 ALTER TABLE `service_page_hero` DISABLE KEYS */;
INSERT INTO `service_page_hero` VALUES (1,'DỊCH VỤ','PG DESIGN','Chúng tôi đồng hành cùng khách hàng từ bản vẽ ý tưởng đến không gian sống hoàn thiện, tối ưu công năng - nâng tầm thẩm mỹ - đảm bảo chất lượng thi công.','http://localhost:9000/pgdesign-assets/images/vision-mission-section.jpg',1,1,'2025-07-13 05:59:31','2025-07-13 05:59:31');
/*!40000 ALTER TABLE `service_page_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_page_process_sections`
--

DROP TABLE IF EXISTS `service_page_process_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_page_process_sections` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `process_number` int NOT NULL,
  `title` varchar(300) NOT NULL,
  `description` text NOT NULL,
  `note` text,
  `image_url` varchar(500) DEFAULT NULL COMMENT 'Background image URL for the process section',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service_page_process_sections_process_number_unique` (`process_number`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_page_process_sections`
--

LOCK TABLES `service_page_process_sections` WRITE;
/*!40000 ALTER TABLE `service_page_process_sections` DISABLE KEYS */;
INSERT INTO `service_page_process_sections` VALUES (1,1,'THI CÔNG PHẦN THÔ HOẶC TRỌN GÓI HOÀN THIỆN','PG Design đảm nhận toàn bộ quy trình xây dựng từ phần thô đến hoàn thiện công trình — bao gồm thi công móng, kết cấu, xây tô, ốp lát, sơn nước, lắp đặt thiết bị vệ sinh, hệ thống điện - nước và trần đến hoàn chỉnh.','Không bao gồm thi công đồ nội thất rời - xem mục Thi công nội thất','http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg',1,'2025-07-13 05:59:31','2025-07-13 05:59:31'),(2,2,'THI CÔNG NỘI THẤT','PG Design đồng hành cùng bạn từ khâu hoàn thiện công trình, thi công nội thất đến cải tạo lại toàn bộ không gian sống - mang đến sự chỉn chu, tiện nghi và cảm xúc sống trọn vẹn.','','http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg',1,'2025-07-13 05:59:31','2025-07-13 05:59:31'),(3,3,'THIẾT KẾ KIẾN TRÚC & NỘI THẤT','Từ khái niệm không gian đến bản vẽ chi tiết, PG Design kiến tạo nên những thiết kế vừa chuẩn công năng, vừa đậm chất thẩm mỹ - thể hiện rõ cá tính và phong cách sống của gia chủ trong từng đường nét.','','http://localhost:9000/pgdesign-assets/images/diary-image-5.jpg',1,'2025-07-13 05:59:31','2025-07-13 05:59:31'),(4,4,'CẢI TẠO SỬA CHỮA HOẶC DỰ ÁN ĐÃ CÓ BẢN VẼ','PG Design nhận thi công các công trình đã có bản vẽ kiến trúc hoặc nội thất, đảm bảo đúng kỹ thuật - đúng thiết kế - đúng tiến độ, mang đến sản phẩm cuối cùng hoàn thiện với chất lượng chuẩn mực.','','http://localhost:9000/pgdesign-assets/images/diary-image-7.jpg',1,'2025-07-13 05:59:31','2025-07-13 05:59:31');
/*!40000 ALTER TABLE `service_page_process_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_page_services`
--

DROP TABLE IF EXISTS `service_page_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_page_services` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `subtitle` varchar(200) DEFAULT '',
  `description` text NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `display_order` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_page_services`
--

LOCK TABLES `service_page_services` WRITE;
/*!40000 ALTER TABLE `service_page_services` DISABLE KEYS */;
INSERT INTO `service_page_services` VALUES (1,'Dịch vụ thi công','Phần thô hoặc','Trọn gói hoàn thiện',1,1,'2025-07-13 05:59:31','2025-07-13 05:59:31'),(2,'Dịch vụ thi công','','Nội thất',1,2,'2025-07-13 05:59:31','2025-07-13 05:59:31'),(3,'Dịch vụ thiết kế','','Kiến trúc - Nội thất',1,3,'2025-07-13 05:59:31','2025-07-13 05:59:31'),(4,'Dịch vụ thi công','Cải tạo sửa chữa hoặc','Dự án đã có bản vẽ',1,4,'2025-07-13 05:59:31','2025-07-13 05:59:31');
/*!40000 ALTER TABLE `service_page_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solution_header`
--

DROP TABLE IF EXISTS `solution_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solution_header` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `main_headline` varchar(255) NOT NULL,
  `sub_headline` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution_header`
--

LOCK TABLES `solution_header` WRITE;
/*!40000 ALTER TABLE `solution_header` DISABLE KEYS */;
INSERT INTO `solution_header` VALUES (6,'GIẢI PHÁP KHÔNG GIAN','DÀNH RIÊNG CHO BẠN',1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `solution_header` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solution_items`
--

DROP TABLE IF EXISTS `solution_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solution_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `solution_header_id` int unsigned DEFAULT NULL,
  `image_url` varchar(500) NOT NULL,
  `image_alt` varchar(255) DEFAULT '',
  `category` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `link` varchar(500) NOT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `solution_items_solution_header_id_display_order_index` (`solution_header_id`,`display_order`),
  CONSTRAINT `solution_items_solution_header_id_foreign` FOREIGN KEY (`solution_header_id`) REFERENCES `solution_header` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution_items`
--

LOCK TABLES `solution_items` WRITE;
/*!40000 ALTER TABLE `solution_items` DISABLE KEYS */;
INSERT INTO `solution_items` VALUES (21,6,'/images/diary-image-5.jpg','Thiết kế kiến trúc','Dịch vụ','Thiết kế kiến trúc','/services/architecture-design',0,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(22,6,'/images/diary-image-6.jpg','Thiết kế nội thất','Dịch vụ','Thiết kế nội thất','/services/interior-design',1,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(23,6,'/images/diary-image-7.jpg','Thi công hoàn thiện','Dịch vụ','Thi công hoàn thiện','/services/construction',2,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(24,6,'/images/diary-image-8.jpg','Thi công trọn gói','Dịch vụ','Thi công trọn gói','/services/full-package',3,1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `solution_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats_header`
--

DROP TABLE IF EXISTS `stats_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stats_header` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `main_headline` varchar(255) NOT NULL,
  `sub_headline` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats_header`
--

LOCK TABLES `stats_header` WRITE;
/*!40000 ALTER TABLE `stats_header` DISABLE KEYS */;
INSERT INTO `stats_header` VALUES (7,'THÀNH TỰU CỦA CHÚNG TÔI','Những con số ấn tượng','Với nhiều năm kinh nghiệm trong lĩnh vực thiết kế kiến trúc và nội thất, chúng tôi tự hào mang đến những giải pháp tối ưu cho mọi không gian sống.',1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `stats_header` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats_items`
--

DROP TABLE IF EXISTS `stats_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stats_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `stats_header_id` int unsigned DEFAULT NULL,
  `icon_name` varchar(100) NOT NULL,
  `icon_url` varchar(500) NOT NULL,
  `target_value` int NOT NULL,
  `label` varchar(255) NOT NULL,
  `suffix` varchar(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `background_image_url` varchar(500) NOT NULL,
  `category` varchar(100) NOT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `stats_items_stats_header_id_display_order_index` (`stats_header_id`,`display_order`),
  CONSTRAINT `stats_items_stats_header_id_foreign` FOREIGN KEY (`stats_header_id`) REFERENCES `stats_header` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats_items`
--

LOCK TABLES `stats_items` WRITE;
/*!40000 ALTER TABLE `stats_items` DISABLE KEYS */;
INSERT INTO `stats_items` VALUES (26,7,'experience-icon','/icons/experience-icon.svg',5,'Kinh nghiệm','+ năm','Kinh nghiệm','/images/diary-image-1.jpg','experience',0,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(27,7,'customer-icon','/icons/customer-icon.svg',500,'Khách hàng','+','Tin tưởng & hài lòng','/images/diary-image-2.jpg','customers',1,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(28,7,'design-icon','/icons/design-icon.svg',450,'Dự án','+','Thiết kế hoàn thành','/images/diary-image-3.jpg','projects',2,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(29,7,'building-icon','/icons/building-icon.svg',98,'Chất lượng','%','Cam kết hoàn hảo','/images/diary-image-4.jpg','quality',3,1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `stats_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats_section_data`
--

DROP TABLE IF EXISTS `stats_section_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stats_section_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `main_headline` varchar(255) NOT NULL,
  `sub_headline` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats_section_data`
--

LOCK TABLES `stats_section_data` WRITE;
/*!40000 ALTER TABLE `stats_section_data` DISABLE KEYS */;
INSERT INTO `stats_section_data` VALUES (3,'THÀNH TỰU CỦA CHÚNG TÔI','Những con số ấn tượng','Với nhiều năm kinh nghiệm trong lĩnh vực thiết kế kiến trúc và nội thất, chúng tôi tự hào mang đến những giải pháp tối ưu cho mọi không gian sống.',1,'2025-07-12 16:44:14','2025-07-12 16:44:14');
/*!40000 ALTER TABLE `stats_section_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_data`
--

DROP TABLE IF EXISTS `team_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `heading` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_data`
--

LOCK TABLES `team_data` WRITE;
/*!40000 ALTER TABLE `team_data` DISABLE KEYS */;
INSERT INTO `team_data` VALUES (1,'Đội ngũ PG Design','Những người trẻ đầy nhiệt huyết và đam mê sáng tạo. Đội ngũ được xây dựng để đồng hành cùng bạn từ bước định hình ý tưởng, phát triển bản sắc thương hiệu cho đến quản lý toàn bộ quy trình - từ trước đến sau khi sản phẩm hoàn thiện.',1,'2025-07-13 07:03:23','2025-07-13 07:03:23');
/*!40000 ALTER TABLE `team_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_members`
--

DROP TABLE IF EXISTS `team_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_members` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `team_id` int unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `team_members_team_id_display_order_index` (`team_id`,`display_order`),
  CONSTRAINT `team_members_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `team_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_members`
--

LOCK TABLES `team_members` WRITE;
/*!40000 ALTER TABLE `team_members` DISABLE KEYS */;
INSERT INTO `team_members` VALUES (1,1,'Nguyễn Văn A','Senior Architect','http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg',0,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(2,1,'Trần Thị B','Interior Designer','http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg',1,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(3,1,'Lê Minh C','Construction Manager','http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg',2,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(4,1,'Phạm Thu D','3D Designer','http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg',3,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(5,1,'Hoàng Văn E','Site Supervisor','http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg',4,1,'2025-07-13 07:03:23','2025-07-13 07:03:23'),(6,1,'Đỗ Thị F','Project Coordinator','http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg',5,1,'2025-07-13 07:03:23','2025-07-13 07:03:23');
/*!40000 ALTER TABLE `team_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonial_header`
--

DROP TABLE IF EXISTS `testimonial_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonial_header` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `main_headline` varchar(255) NOT NULL,
  `sub_headline` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonial_header`
--

LOCK TABLES `testimonial_header` WRITE;
/*!40000 ALTER TABLE `testimonial_header` DISABLE KEYS */;
INSERT INTO `testimonial_header` VALUES (4,'CẢM NHẬN KHÁCH HÀNG','VỀ PG DESIGN',1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `testimonial_header` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `testimonial_header_id` int unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `project` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `avatar_url` varchar(500) DEFAULT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `testimonials_testimonial_header_id_display_order_index` (`testimonial_header_id`,`display_order`),
  CONSTRAINT `testimonials_testimonial_header_id_foreign` FOREIGN KEY (`testimonial_header_id`) REFERENCES `testimonial_header` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (16,4,'CHỊ NHI','CHUNG CƯ CITY GATES - Q1','Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.',NULL,0,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(17,4,'ANH BÌNH','CHUNG CƯ CITY GATES - Q1','Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor.',NULL,1,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(18,4,'CHỊ LAN','DỰ ÁN BIỆT THỰ ĐÀ LẠT - Q1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.',NULL,2,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(19,4,'ANH THỊNH','NHÀ PHỐ QUẬN 7 - Q1','Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.',NULL,3,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(20,4,'CHỊ MAI','CĂN HỘ CAO CẤP - Q8','Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.',NULL,4,1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vision_mission_data`
--

DROP TABLE IF EXISTS `vision_mission_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vision_mission_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `image_url` varchar(500) NOT NULL,
  `vision_title` varchar(255) NOT NULL,
  `vision_paragraph_1` text NOT NULL,
  `vision_paragraph_2` text NOT NULL,
  `mission_title` varchar(255) NOT NULL,
  `core_values_title` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vision_mission_data`
--

LOCK TABLES `vision_mission_data` WRITE;
/*!40000 ALTER TABLE `vision_mission_data` DISABLE KEYS */;
INSERT INTO `vision_mission_data` VALUES (1,'http://localhost:9000/pgdesign-assets/images/vision-mission-section.jpg','TẦM NHÌN','PG Design tự hào trở thành đơn vị thiết kế - thi công uy tín hàng đầu: nơi mở không gian không chỉ được đầu tư về công năng và thẩm mỹ, mà còn là nơi kiến tạo câu chuyện bằng không gian sống của người sở hữu.','Chúng tôi tin rằng, một không gian đẹp là không gian đặt dấu cảm xúc và đồng điệu với nhu cầu sống, từ đó nâng tầm trải nghiệm và chất lượng cuộc sống mỗi ngày.','SỨ MỆNH','GIÁ TRỊ CỐT LÕI',1,'2025-07-13 07:03:23','2025-07-13 07:03:23');
/*!40000 ALTER TABLE `vision_mission_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_data`
--

DROP TABLE IF EXISTS `workflow_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workflow_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_data`
--

LOCK TABLES `workflow_data` WRITE;
/*!40000 ALTER TABLE `workflow_data` DISABLE KEYS */;
INSERT INTO `workflow_data` VALUES (5,'QUY TRÌNH LÀM VIỆC',1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `workflow_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_tabs`
--

DROP TABLE IF EXISTS `workflow_tabs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workflow_tabs` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `workflow_id` int unsigned DEFAULT NULL,
  `workflow_key` varchar(100) NOT NULL,
  `icon_name` varchar(100) NOT NULL,
  `icon_url` varchar(500) NOT NULL,
  `title` varchar(255) NOT NULL,
  `diagram_url` varchar(500) NOT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `workflow_tabs_workflow_id_display_order_index` (`workflow_id`,`display_order`),
  CONSTRAINT `workflow_tabs_workflow_id_foreign` FOREIGN KEY (`workflow_id`) REFERENCES `workflow_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_tabs`
--

LOCK TABLES `workflow_tabs` WRITE;
/*!40000 ALTER TABLE `workflow_tabs` DISABLE KEYS */;
INSERT INTO `workflow_tabs` VALUES (7,5,'design','design-icon','http://localhost:9000/pgdesign-assets/icons/design-icon.svg','QUY TRÌNH THIẾT KẾ','http://localhost:9000/pgdesign-assets/icons/work-process-flow-diagram-1.svg',0,1,'2025-07-13 12:57:43','2025-07-13 12:57:43'),(8,5,'construction','building-icon','http://localhost:9000/pgdesign-assets/icons/building-icon.svg','QUY TRÌNH THI CÔNG','http://localhost:9000/pgdesign-assets/icons/work-process-flow-diagram-2.svg',1,1,'2025-07-13 12:57:43','2025-07-13 12:57:43');
/*!40000 ALTER TABLE `workflow_tabs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-13 10:17:45
