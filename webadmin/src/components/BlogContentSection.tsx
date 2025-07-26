import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import './BlogContentSection.css';

interface BlogContentSectionProps {
  htmlContent: string;
  onEditorChange: (content: string) => void;
  onPreviewContent: () => void;
  onSubmitContent: () => void;
  showPreviewModal: boolean;
  onClosePreviewModal: () => void;
  editorContent: string;
  placeholder?: string;
  showEditorControls?: boolean;
  showPreviewButton?: boolean;
  showSubmitButton?: boolean;
  previewButtonText?: string;
  submitButtonText?: string;
  modalTitle?: string;
}

export interface BlogContentSectionRef {
  getEditorContent: () => { html: string; delta: any } | null;
  getFormattedHTML: () => string;
}

const BlogContentSection = forwardRef<BlogContentSectionRef, BlogContentSectionProps>(({
  htmlContent,
  onEditorChange,
  onPreviewContent,
  onSubmitContent,
  showPreviewModal,
  onClosePreviewModal,
  editorContent,
  placeholder = "Bắt đầu chỉnh sửa nội dung bài viết...",
  showEditorControls = true,
  showPreviewButton = true,
  showSubmitButton = true,
  previewButtonText = "Preview Content",
  submitButtonText = "Submit Content",
  modalTitle = "Content Preview"
}, ref) => {
  const quillRef = useRef<ReactQuill>(null);

  useImperativeHandle(ref, () => ({
    getEditorContent: () => {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        return {
          html: editor.root.innerHTML,
          delta: editor.getContents()
        };
      }
      return null;
    },
    getFormattedHTML: () => {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        const html = editor.root.innerHTML;
        return formatHTMLContent(html);
      }
      return '';
    }
  }));

  const formatHTMLContent = (html: string): string => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    const paragraphs = tempDiv.querySelectorAll('p');
    paragraphs.forEach(p => {
      if (p.innerHTML === '<br>' || p.innerHTML === '') {
        p.remove();
      }
    });
    
    return tempDiv.innerHTML
      .replace(/></g, '>\n<')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  };

  const handleChange = (content: string, delta: any, source: any, editor: any) => {
    onEditorChange(content);
  };

  return (
    <div className="blog-content-wrapper">
      <div className="content-grid">
        {/* Main Content */}
        <div className="main-content">
          {showEditorControls && (
            <div className="editor-controls">
              <h4>Editor Controls</h4>
              <div className="editor-buttons">
                {showPreviewButton && (
                  <button 
                    className="editor-button editor-button-preview"
                    onClick={onPreviewContent}
                  >
                    {previewButtonText}
                  </button>
                )}
                {showSubmitButton && (
                  <button 
                    className="editor-button editor-button-submit"
                    onClick={onSubmitContent}
                  >
                    {submitButtonText}
                  </button>
                )}
              </div>
            </div>
          )}

          <ReactQuill 
            ref={quillRef}
            value={htmlContent} 
            onChange={handleChange}
            placeholder={placeholder}
            theme="snow"
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
              ]
            }}
            formats={[
              'header',
              'bold', 'italic', 'underline', 'strike',
              'color', 'background',
              'align',
              'list', 'bullet',
              'link', 'image'
            ]}
          />

          {/* Preview Modal */}
          {showPreviewModal && (
            <div className="preview-modal-overlay" onClick={onClosePreviewModal}>
              <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>{modalTitle}</h3>
                  <button 
                    className="modal-close-button"
                    onClick={onClosePreviewModal}
                  >
                    ×
                  </button>
                </div>
                <div className="modal-content">
                  <div 
                    className="preview-content"
                    dangerouslySetInnerHTML={{ __html: editorContent }}
                  />
                </div>
                <div className="modal-footer">
                  <button 
                    className="modal-button modal-button-secondary"
                    onClick={onClosePreviewModal}
                  >
                    Close
                  </button>
                  {showSubmitButton && (
                    <button 
                      className="modal-button modal-button-primary"
                      onClick={onSubmitContent}
                    >
                      {submitButtonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

BlogContentSection.displayName = 'BlogContentSection';

export default BlogContentSection; 