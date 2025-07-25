# ContentPreviewModal Component

A reusable, full-screen modal component for previewing HTML content with customizable options.

## Features

- ✅ **Full-screen overlay** with backdrop blur
- ✅ **Responsive design** that works on all devices
- ✅ **Keyboard support** (Escape key to close)
- ✅ **Click outside to close** functionality
- ✅ **Customizable title** and button text
- ✅ **Optional submit button** with custom action
- ✅ **Smooth animations** and transitions
- ✅ **Accessibility features** (ARIA labels, focus management)
- ✅ **Content styling** for HTML elements (headings, lists, images, etc.)

## Usage

### Basic Usage

```tsx
import React, { useState } from 'react';
import ContentPreviewModal from './ContentPreviewModal';

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('<h1>Hello World</h1><p>This is my content.</p>');

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Preview Content
      </button>

      <ContentPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={content}
      />
    </div>
  );
};
```

### Advanced Usage with Custom Options

```tsx
<ContentPreviewModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  content={htmlContent}
  title="Custom Preview Title"
  onSubmit={handleSubmitContent}
  submitButtonText="Save Changes"
  showSubmitButton={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Controls whether the modal is visible |
| `onClose` | `() => void` | - | Function called when modal should close |
| `content` | `string` | - | HTML content to display in the modal |
| `title` | `string` | `"Content Preview"` | Title displayed in the modal header |
| `onSubmit` | `() => void` | - | Function called when submit button is clicked |
| `submitButtonText` | `string` | `"Submit Content"` | Text for the submit button |
| `showSubmitButton` | `boolean` | `true` | Whether to show the submit button |

## Examples

### Preview Only (No Submit Button)

```tsx
<ContentPreviewModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  content={content}
  title="Content Review"
  showSubmitButton={false}
/>
```

### Custom Submit Action

```tsx
const handleSubmit = async () => {
  try {
    await saveContent(content);
    setIsModalOpen(false);
    showSuccessMessage('Content saved successfully!');
  } catch (error) {
    showErrorMessage('Failed to save content');
  }
};

<ContentPreviewModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  content={content}
  onSubmit={handleSubmit}
  submitButtonText="Save to Database"
/>
```

### Different Content Types

The modal can display any HTML content:

```tsx
// Rich text content
const richContent = `
  <h1>Article Title</h1>
  <p>This is a <strong>bold</strong> paragraph with <em>italic</em> text.</p>
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
  </ul>
  <blockquote>This is a quote</blockquote>
`;

// Content with images
const contentWithImages = `
  <h2>Project Gallery</h2>
  <img src="/images/project1.jpg" alt="Project 1" />
  <p>Description of the project...</p>
`;

// Code content
const codeContent = `
  <h3>Code Example</h3>
  <pre><code>function hello() {
  console.log("Hello, World!");
}</code></pre>
`;
```

## Styling

The component includes comprehensive styling for common HTML elements:

- **Headings** (h1-h6) with proper hierarchy
- **Paragraphs** with good line spacing
- **Lists** (ul, ol) with proper indentation
- **Blockquotes** with left border and italic styling
- **Images** with responsive sizing and shadows
- **Links** with hover effects
- **Code** blocks with syntax highlighting background
- **Tables** with proper borders and spacing

## Responsive Design

The modal automatically adapts to different screen sizes:

- **Desktop**: Full modal with max dimensions
- **Tablet**: Adjusted padding and font sizes
- **Mobile**: Full-screen modal with touch-friendly buttons

## Accessibility

- **Keyboard navigation**: Escape key to close
- **Focus management**: Proper focus trapping
- **ARIA labels**: Screen reader friendly
- **High contrast**: Good color contrast ratios
- **Touch targets**: Adequate size for mobile devices

## Integration Examples

### With Quill Editor

```tsx
const handlePreview = () => {
  if (quillEditorRef.current) {
    const content = quillEditorRef.current.getFormattedHTML();
    setPreviewContent(content);
    setIsModalOpen(true);
  }
};
```

### With Form Data

```tsx
const handlePreviewForm = () => {
  const formData = new FormData(formRef.current);
  const content = generateHTMLFromFormData(formData);
  setPreviewContent(content);
  setIsModalOpen(true);
};
```

### With API Data

```tsx
const handlePreviewFromAPI = async () => {
  const response = await fetch('/api/content/123');
  const data = await response.json();
  setPreviewContent(data.htmlContent);
  setIsModalOpen(true);
};
```

## Best Practices

1. **Always provide an `onClose` handler** to ensure the modal can be closed
2. **Use meaningful titles** that describe what's being previewed
3. **Handle submit actions gracefully** with loading states and error handling
4. **Sanitize HTML content** before passing it to the modal to prevent XSS attacks
5. **Test on different screen sizes** to ensure responsive behavior
6. **Consider accessibility** when customizing the modal behavior

## Troubleshooting

### Modal not closing
- Ensure `onClose` function is properly passed
- Check that `isOpen` state is being updated correctly

### Content not displaying
- Verify that `content` prop contains valid HTML
- Check browser console for any JavaScript errors

### Styling issues
- Ensure the CSS file is properly imported
- Check for conflicting styles in parent components

### Performance issues
- Consider memoizing the content if it's large or complex
- Use React.memo() if the component re-renders frequently 