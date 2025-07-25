# Quill Editor Integration

## Overview

The Quill editor has been successfully integrated into the BlogDetailPage to provide a rich text editing experience. This implementation uses React 18 and includes Vietnamese localization with a clean light theme design.

## Features

### ✅ **Core Functionality**
- **Rich Text Editing**: Full WYSIWYG capabilities
- **Vietnamese Interface**: Localized placeholder and tooltips
- **Light Theme Design**: Clean, professional Microsoft Fluent Design theme
- **Responsive Design**: Works on all screen sizes
- **Comprehensive Toolbar**: All common formatting options (excluding font picker)

### 🎨 **Toolbar Features**
- **Text Formatting**: Bold, Italic, Underline, Strike
- **Headers**: H1-H6 with dropdown selection
- **Size**: Text size controls (small, normal, large, huge)
- **Colors**: Text and background color pickers
- **Alignment**: Left, Center, Right, Justify
- **Lists**: Ordered and unordered lists
- **Indentation**: Increase/decrease indentation
- **Links**: Insert and edit hyperlinks
- **Media**: Insert images and videos
- **Code**: Inline code and code blocks
- **Quotes**: Blockquote formatting
- **Clean**: Remove all formatting

## Technical Implementation

### File Structure
```
src/components/
├── QuillEditor.tsx          # Main Quill component
├── QuillEditor.css          # Custom styling (light theme)
└── README_QUILL_EDITOR.md   # This documentation
```

### Dependencies
```json
{
  "react-quill": "^2.0.0",
  "quill": "^1.3.7"
}
```

### Component Props
```typescript
interface QuillEditorProps {
  value?: string;                    // Initial content
  onChange?: (content: string) => void; // Content change handler
  placeholder?: string;              // Placeholder text
  readOnly?: boolean;                // Read-only mode
  theme?: 'snow' | 'bubble';         // Editor theme
  modules?: any;                     // Custom modules
  formats?: string[];                // Allowed formats
  className?: string;                // Additional CSS classes
}
```

## Usage Examples

### Basic Usage
```tsx
import QuillEditor from '../../components/QuillEditor';

<QuillEditor
  value={blogData.htmlContent}
  onChange={(content) => {
    console.log('Content changed:', content);
    // Save content logic here
  }}
  placeholder="Bắt đầu chỉnh sửa nội dung bài viết..."
/>
```

### Read-only Mode
```tsx
<QuillEditor
  value={blogData.htmlContent}
  readOnly={true}
  placeholder="Nội dung chỉ đọc..."
/>
```

### Custom Modules
```tsx
const customModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image']
  ]
};

<QuillEditor
  value={content}
  modules={customModules}
  onChange={handleChange}
/>
```

## Styling

### Design System
- **Primary Color**: #0078d4 (Microsoft Blue)
- **Background**: #ffffff (White)
- **Border**: #d2d0ce (Light Gray)
- **Text**: #323130 (Dark Gray)
- **Hover**: #e1dfdd (Light Hover)
- **Toolbar Background**: #f3f2f1 (Light Gray)

### Responsive Breakpoints
- **Desktop**: Full toolbar with all features
- **Tablet**: Compact toolbar layout
- **Mobile**: Minimal toolbar with essential features

### Light Theme Focus
The editor is designed with a clean light theme that provides:
- High contrast for better readability
- Professional appearance
- Consistent with Microsoft Fluent Design
- Optimized for content creation and editing

## Content Handling

### HTML Output
The editor outputs clean HTML that can be:
- Saved to database
- Rendered with `dangerouslySetInnerHTML`
- Processed for SEO optimization

### Content Validation
```typescript
const validateContent = (content: string) => {
  // Remove empty paragraphs
  const cleanContent = content.replace(/<p><br><\/p>/g, '');
  return cleanContent;
};
```

## Security Considerations

### XSS Prevention
- Quill automatically sanitizes HTML input
- Only allowed formats are processed
- Script tags are stripped automatically

### Content Sanitization
```typescript
import DOMPurify from 'dompurify';

const sanitizeContent = (content: string) => {
  return DOMPurify.sanitize(content);
};
```

## Customization

### Vietnamese Localization
```css
.quill-editor .ql-toolbar .ql-bold::after {
  content: "Đậm";
  font-size: 10px;
  margin-left: 2px;
}
```

### Custom Toolbar Icons
```typescript
const customToolbar = [
  [{ 'header': [1, 2, 3, false] }],
  ['bold', 'italic', 'underline'],
  [{ 'color': [] }, { 'background': [] }],
  ['link', 'image'],
  ['clean']
];
```

## Performance Optimization

### Lazy Loading
```tsx
const QuillEditor = React.lazy(() => import('./QuillEditor'));

<Suspense fallback={<div>Loading editor...</div>}>
  <QuillEditor />
</Suspense>
```

### Content Debouncing
```typescript
import { debounce } from 'lodash';

const debouncedSave = debounce((content) => {
  saveContent(content);
}, 1000);
```

## Testing

### Unit Tests
```typescript
import { render, fireEvent } from '@testing-library/react';
import QuillEditor from './QuillEditor';

test('renders with initial value', () => {
  const { getByText } = render(
    <QuillEditor value="<p>Test content</p>" />
  );
  expect(getByText('Test content')).toBeInTheDocument();
});
```

### Integration Tests
```typescript
test('calls onChange when content changes', () => {
  const mockOnChange = jest.fn();
  render(<QuillEditor onChange={mockOnChange} />);
  // Simulate content change
  expect(mockOnChange).toHaveBeenCalled();
});
```

## Troubleshooting

### Common Issues

#### 1. Toolbar Not Visible
```css
/* Ensure proper CSS imports */
@import 'react-quill/dist/quill.snow.css';
```

#### 2. Content Not Updating
```typescript
// Use useEffect to sync external value changes
useEffect(() => {
  setEditorValue(value);
}, [value]);
```

#### 3. Styling Conflicts
```css
/* Use more specific selectors */
.quill-editor-container .ql-toolbar {
  /* Your styles */
}
```

### Debug Mode
```typescript
const debugModules = {
  ...defaultModules,
  debug: 'info'
};
```

## Future Enhancements

### Planned Features
- [ ] **Auto-save**: Automatic content saving
- [ ] **Version History**: Content versioning
- [ ] **Collaborative Editing**: Real-time collaboration
- [ ] **Custom Plugins**: Extend functionality
- [ ] **Export Options**: PDF, Word, Markdown export
- [ ] **Image Optimization**: Automatic image compression
- [ ] **SEO Tools**: Meta description generator
- [ ] **Accessibility**: Enhanced screen reader support

### Plugin Integration
```typescript
// Example: Math equation plugin
import 'quill-math';

const mathModules = {
  ...defaultModules,
  math: {
    engine: 'katex'
  }
};
```

## Migration Guide

### From Custom Editor
1. Replace custom editor component with QuillEditor
2. Update content format to HTML
3. Migrate toolbar configuration
4. Update styling classes

### From Draft.js
1. Convert Draft.js content to HTML
2. Replace Draft.js components
3. Update onChange handlers
4. Migrate custom decorators

## Support

### Documentation
- [Quill.js Official Docs](https://quilljs.com/docs/)
- [React-Quill GitHub](https://github.com/zenoamaro/react-quill)
- [Microsoft Fluent Design](https://fluent2.microsoft.design/)

### Community
- Stack Overflow: `react-quill` tag
- GitHub Issues: React-Quill repository
- Discord: React community channels

---

**Last Updated**: December 2024
**Version**: 1.0.0
**React Version**: 18.x
**Quill Version**: 1.3.7
**Theme**: Light Theme Only 