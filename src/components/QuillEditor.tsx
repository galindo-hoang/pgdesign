import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import ReactQuill from 'react-quill';
// Import Quill CSS first
import 'quill/dist/quill.snow.css';
import './QuillEditor.css';

interface QuillEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  theme?: 'snow' | 'bubble';
  modules?: any;
  formats?: string[];
  className?: string;
  onGetContent?: (html: string, delta: any) => void;
}

export interface QuillEditorRef {
  getContentAsHTML: () => string;
  getContentAsDelta: () => any;
  getContent: () => { html: string; delta: any };
  getFormattedHTML: () => string;
}

const QuillEditor = forwardRef<QuillEditorRef, QuillEditorProps>(({
  value = '',
  onChange,
  placeholder = 'Bắt đầu nhập nội dung...',
  readOnly = false,
  theme = 'snow',
  modules,
  formats,
  className = '',
  onGetContent
}, ref) => {
  const [editorValue, setEditorValue] = useState(value);
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleChange = (content: string, delta: any, source: any, editor: any) => {
    setEditorValue(content);
    if (onChange) {
      onChange(content);
    }
  };

  // Function to get editor content as HTML
  const getContentAsHTML = (): string => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      return editor.root.innerHTML;
    }
    return editorValue;
  };

  // Function to get editor content as Delta
  const getContentAsDelta = (): any => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      return editor.getContents();
    }
    return null;
  };

  // Function to get both HTML and Delta
  const getContent = (): { html: string; delta: any } => {
    const html = getContentAsHTML();
    const delta = getContentAsDelta();
    return { html, delta };
  };

  // Function to format HTML content
  const formatHTMLContent = (html: string): string => {
    // Create a temporary div to parse and format the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Clean up empty paragraphs
    const paragraphs = tempDiv.querySelectorAll('p');
    paragraphs.forEach(p => {
      if (p.innerHTML === '<br>' || p.innerHTML === '') {
        p.remove();
      }
    });
    
    // Format the HTML with proper indentation
    return tempDiv.innerHTML
      .replace(/></g, '>\n<')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  };

  // Function to get formatted HTML
  const getFormattedHTML = (): string => {
    const html = getContentAsHTML();
    return formatHTMLContent(html);
  };

  // Expose functions through ref
  useImperativeHandle(ref, () => ({
    getContentAsHTML,
    getContentAsDelta,
    getContent,
    getFormattedHTML
  }));

  // Default modules configuration - removed font picker
  const defaultModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [
        '#000000', '#e60000', '#008a00', '#0066cc', '#9933ff',
        '#ff6600', '#ffcc00', '#33cc33', '#3366ff', '#cc33ff',
        '#ff3366', '#ff9933', '#ffff00', '#99ff33', '#33ffff',
        '#3399ff', '#ff33cc', '#ff6633', '#ffff99', '#ccff99',
        '#99ffff', '#9999ff', '#ff99cc', '#ffcc99', '#ffffff'
      ]}, { 'background': [
        '#000000', '#e60000', '#008a00', '#0066cc', '#9933ff',
        '#ff6600', '#ffcc00', '#33cc33', '#3366ff', '#cc33ff',
        '#ff3366', '#ff9933', '#ffff00', '#99ff33', '#33ffff',
        '#3399ff', '#ff33cc', '#ff6633', '#ffff99', '#ccff99',
        '#99ffff', '#9999ff', '#ff99cc', '#ffcc99', '#ffffff'
      ]}],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': 'center' }, { 'align': 'right' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    },
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true
    }
  };

  // Default formats - removed font
  const defaultFormats = [
    'header', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'script', 'align', 'direction'
  ];

  return (
    <div className={`quill-editor-container ${className}`}>
      <ReactQuill
        ref={quillRef}
        theme={theme}
        value={editorValue}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readOnly}
        modules={modules || defaultModules}
        formats={formats || defaultFormats}
        className="quill-editor"
      />
      
      {/* Debug panel for development */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="quill-debug-panel" style={{ marginTop: '10px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
          <h4>Debug Panel</h4>
          <button 
            onClick={() => {
              const content = getContent();
              console.log('HTML Content:', content.html);
              console.log('Delta Content:', content.delta);
            }}
            style={{ marginRight: '10px', padding: '5px 10px' }}
          >
            Log Content
          </button>
          <button 
            onClick={() => {
              const html = getFormattedHTML();
              console.log('Formatted HTML:', html);
            }}
            style={{ padding: '5px 10px' }}
          >
            Log Formatted HTML
          </button>
        </div>
      )} */}
    </div>
  );
});

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;