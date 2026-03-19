import React, { useState, useEffect, useRef } from 'react';

interface ScaleContainerProps {
  children: React.ReactNode;
  baseWidth?: number;
}

export const ScaleContainer: React.FC<ScaleContainerProps> = ({ 
  children, 
  baseWidth = 800 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(baseWidth * 1.414);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          const containerWidth = entry.contentRect.width;
          if (containerWidth > 0) {
            setScale(containerWidth / baseWidth);
          }
        } else if (entry.target === contentRef.current) {
          setContentHeight(entry.contentRect.height);
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    resizeObserver.observe(contentRef.current);

    return () => resizeObserver.disconnect();
  }, [baseWidth]);

  return (
    <div 
      ref={containerRef} 
      className="w-full relative"
      style={{ height: contentHeight * scale }}
    >
      <div 
        ref={contentRef}
        className="absolute top-0 left-1/2 origin-top"
        style={{ 
          width: baseWidth,
          transform: `translateX(-50%) scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
