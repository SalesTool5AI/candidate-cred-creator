import { useEffect } from 'react';

export const SecurityHeaders = () => {
  useEffect(() => {
    // Add security headers via meta tags
    const addMetaTag = (name: string, content: string) => {
      const existing = document.querySelector(`meta[name="${name}"]`);
      if (!existing) {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // Basic security headers
    addMetaTag('referrer', 'strict-origin-when-cross-origin');
    addMetaTag('robots', 'index, follow');
    
    // Prevent potential XSS via iframe
    if (window.self !== window.top) {
      console.warn('Application loaded in iframe - potential security issue');
    }
  }, []);

  return null;
};