/**
 * Utility functions for processing HTML content from Quill editor
 */

export interface HTMLContentOptions {
  cleanEmptyParagraphs?: boolean;
  formatOutput?: boolean;
  removeScripts?: boolean;
  sanitize?: boolean;
}

/**
 * Clean and format HTML content from Quill editor
 */
export const processHTMLContent = (
  html: string, 
  options: HTMLContentOptions = {}
): string => {
  const {
    cleanEmptyParagraphs = true,
    formatOutput = true,
    removeScripts = true,
    sanitize = true
  } = options;

  // Create a temporary div to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Remove scripts if requested
  if (removeScripts) {
    const scripts = tempDiv.querySelectorAll('script');
    scripts.forEach(script => script.remove());
  }

  // Clean empty paragraphs
  if (cleanEmptyParagraphs) {
    const paragraphs = tempDiv.querySelectorAll('p');
    paragraphs.forEach(p => {
      if (p.innerHTML === '<br>' || p.innerHTML === '' || p.textContent?.trim() === '') {
        p.remove();
      }
    });
  }

  // Sanitize content (basic)
  if (sanitize) {
    // Remove potentially dangerous attributes
    const allElements = tempDiv.querySelectorAll('*');
    allElements.forEach(element => {
      const dangerousAttrs = ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus'];
      dangerousAttrs.forEach(attr => {
        if (element.hasAttribute(attr)) {
          element.removeAttribute(attr);
        }
      });
    });
  }

  let result = tempDiv.innerHTML;

  // Format output
  if (formatOutput) {
    result = result
      .replace(/></g, '>\n<')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  }

  return result;
};

/**
 * Convert HTML content to plain text
 */
export const htmlToText = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

/**
 * Extract images from HTML content
 */
export const extractImages = (html: string): string[] => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const images = tempDiv.querySelectorAll('img');
  return Array.from(images).map(img => img.src);
};

/**
 * Extract links from HTML content
 */
export const extractLinks = (html: string): string[] => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const links = tempDiv.querySelectorAll('a');
  return Array.from(links).map(link => link.href);
};

/**
 * Get word count from HTML content
 */
export const getWordCount = (html: string): number => {
  const text = htmlToText(html);
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

/**
 * Get character count from HTML content
 */
export const getCharacterCount = (html: string): number => {
  const text = htmlToText(html);
  return text.length;
};

/**
 * Validate HTML content
 */
export const validateHTMLContent = (html: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Check for basic HTML structure
  if (!html || html.trim() === '') {
    errors.push('Content is empty');
  }

  // Check for unclosed tags (basic check)
  const openTags = (html.match(/<[^/][^>]*>/g) || []).length;
  const closeTags = (html.match(/<\/[^>]*>/g) || []).length;
  
  if (Math.abs(openTags - closeTags) > 2) { // Allow some tolerance
    errors.push('Possible unclosed HTML tags');
  }

  // Check for potentially dangerous content
  if (html.includes('<script') || html.includes('javascript:')) {
    errors.push('Contains potentially dangerous script content');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Create a summary of HTML content
 */
export const createContentSummary = (html: string) => {
  const text = htmlToText(html);
  const wordCount = getWordCount(html);
  const charCount = getCharacterCount(html);
  const images = extractImages(html);
  const links = extractLinks(html);

  return {
    wordCount,
    charCount,
    imageCount: images.length,
    linkCount: links.length,
    preview: text.substring(0, 150) + (text.length > 150 ? '...' : ''),
    images,
    links
  };
};

/**
 * Export HTML content with metadata
 */
export const exportHTMLContent = (html: string, title?: string) => {
  const processedHTML = processHTMLContent(html, {
    cleanEmptyParagraphs: true,
    formatOutput: true,
    removeScripts: true,
    sanitize: true
  });

  const summary = createContentSummary(html);
  
  return {
    html: processedHTML,
    summary,
    metadata: {
      title: title || 'Exported Content',
      exportedAt: new Date().toISOString(),
      wordCount: summary.wordCount,
      charCount: summary.charCount
    }
  };
}; 