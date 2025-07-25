import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import QuillEditor, { QuillEditorRef } from './QuillEditor';
import ContentPreviewModal from './ContentPreviewModal';
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
  const quillEditorRef = useRef<QuillEditorRef>(null);

  useImperativeHandle(ref, () => ({
    getEditorContent: () => {
      if (quillEditorRef.current) {
        return quillEditorRef.current.getContent();
      }
      return null;
    },
    getFormattedHTML: () => {
      if (quillEditorRef.current) {
        return quillEditorRef.current.getFormattedHTML();
      }
      return '';
    }
  }));

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

          <QuillEditor 
            ref={quillEditorRef}
            value={htmlContent} 
            onChange={onEditorChange}
            placeholder={placeholder}
          />

          {/* Full Screen Preview Modal */}
          <ContentPreviewModal
            isOpen={showPreviewModal}
            onClose={onClosePreviewModal}
            content={editorContent}
            title={modalTitle}
            onSubmit={onSubmitContent}
            submitButtonText={submitButtonText}
            showSubmitButton={showSubmitButton}
          />
        </div>
      </div>
    </div>
  );
});

BlogContentSection.displayName = 'BlogContentSection';

export default BlogContentSection; 