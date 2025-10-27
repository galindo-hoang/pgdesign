# Blog Post Title Locked When Editing

## Tổng quan
Đã thêm tính năng không cho phép chỉnh sửa title khi đang edit bài viết blog.

## Thay đổi

### Frontend (`webadmin/src/pages/BlogPostEditor.tsx`)

#### 1. Disable Title Input Field
```tsx
<input
  type="text"
  id="title"
  value={postData.title}
  onChange={(e) => handleTitleChange(e.target.value)}
  placeholder="Enter post title"
  className="form-input"
  readOnly={isEditing}          // ✅ Bị khóa khi đang edit
  disabled={isEditing}           // ✅ Vô hiệu hóa
  style={isEditing ? { 
    background: '#f5f5f5', 
    cursor: 'not-allowed',
    opacity: 0.6 
  } : {}}
/>
```

#### 2. Hiển thị thông báo
```tsx
{isEditing && (
  <small style={{ color: '#6c757d', fontSize: '12px', display: 'block', marginTop: '0.25rem' }}>
    Title không thể chỉnh sửa khi đang edit bài viết
  </small>
)}
```

#### 3. Vô hiệu hóa handleTitleChange
```tsx
const handleTitleChange = (value: string) => {
  // Don't allow title change when editing
  if (isEditing) {
    return;  // ✅ Không cho phép thay đổi
  }
  
  handleInputChange('title', value);
  
  // Always auto-generate slug from title
  const newSlug = generateSlugFromTitle(value);
  setPostData(prev => ({
    ...prev,
    slug: newSlug
  }));
};
```

## Cách hoạt động

### Khi tạo mới (`isEditing = false`)
- Title field hoạt động bình thường
- User có thể nhập và chỉnh sửa title
- Slug được tự động generate từ title
- Styling bình thường

### Khi edit (`isEditing = true`)
- Title field bị disable
- Background chuyển sang màu xám (`#f5f5f5`)
- Cursor chuyển sang `not-allowed`
- Opacity giảm xuống 0.6
- Hiển thị thông báo: "Title không thể chỉnh sửa khi đang edit bài viết"
- `handleTitleChange` return ngay lập tức nếu cố gắng thay đổi

## Lý do thiết kế

1. **Giữ nguyên URL**: Title thay đổi sẽ làm thay đổi slug, dẫn đến URL blog bị thay đổi
2. **SEO**: Giữ nguyên URL giúp không làm mất traffic và SEO rankings
3. **UX**: Tránh nhầm lẫn cho user khi URL thay đổi
4. **Data integrity**: Đảm bảo tính nhất quán của dữ liệu

## Giải pháp thay thế

Nếu cần chỉnh sửa title:
1. Tạo bài viết mới với title mới
2. Copy nội dung từ bài cũ sang bài mới
3. Delete bài cũ (nếu cần)

## Testing

### Test Case 1: Tạo mới
1. Vào "Add New Blog Post"
2. Nhập title mới → ✅ Title có thể nhập được
3. Slug được tự động generate

### Test Case 2: Edit bài viết
1. Click "Edit" trên một bài viết
2. Vào form edit
3. Title field → ✅ Bị disabled, không thể chỉnh sửa
4. Hiển thị thông báo "Title không thể chỉnh sửa khi đang edit bài viết"
5. Các field khác vẫn hoạt động bình thường

