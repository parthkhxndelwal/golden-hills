import { useState, useEffect } from 'react';

export const usePreloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Wait for DOM to be ready
        await new Promise<void>((resolve) => {
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => resolve());
          } else {
            resolve();
          }
        });

        // Get all images in the public directory and preload them
        const publicImages = [
          '/heroImage.png',
          '/placeholder.svg',
          '/brochure.pdf',
          '/lovable-uploads/676a26bb-7a10-4030-9e46-379c66a5be16.png'
          ,'/video.mp4'
        ];

        const imagePromises = publicImages.map((src) => {
          return new Promise<void>((resolve, reject) => {
            // Skip PDF files
            if (src.endsWith('.pdf')) {
              resolve();
              return;
            }

            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Continue even if image fails
            img.src = src;
          });
        });

        // Also preload any existing images on the page
        const existingImages = document.querySelectorAll('img');
        const existingImagePromises = Array.from(existingImages).map((img) => {
          return new Promise<void>((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          });
        });

        // Wait for all resources to load
        await Promise.all([...imagePromises, ...existingImagePromises]);

        // Add minimum loading time for black screen transition (1 second)
        await new Promise<void>((resolve) => setTimeout(resolve, 1000));

      } catch (error) {
        console.warn('Some resources failed to load:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  return isLoading;
};
