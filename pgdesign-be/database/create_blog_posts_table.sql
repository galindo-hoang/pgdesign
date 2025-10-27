-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  author VARCHAR(100) DEFAULT 'Admin',
  status ENUM('published', 'draft', 'archived') DEFAULT 'draft',
  publish_date DATE,
  views INT DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO blog_posts (title, content, author, status, publish_date, views, featured) VALUES
('Thiết kế nội thất phòng khách hiện đại', 'Xu hướng thiết kế nội thất phòng khách hiện đại với những gam màu tươi sáng và không gian mở...', 'Admin', 'published', '2024-01-15', 1250, TRUE),
('Bí quyết chọn màu sắc cho không gian sống', 'Màu sắc đóng vai trò quan trọng trong việc tạo nên cảm xúc và không khí...', 'Admin', 'published', '2024-01-10', 890, FALSE),
('Thiết kế phòng ngủ master sang trọng', 'Phòng ngủ master cần được thiết kế với sự chú ý đặc biệt đến không gian...', 'Admin', 'draft', '2024-01-20', 0, FALSE),
('Xu hướng thiết kế bếp năm 2024', 'Những xu hướng mới nhất trong thiết kế bếp với công nghệ thông minh...', 'Admin', 'published', '2024-01-05', 2100, TRUE);
