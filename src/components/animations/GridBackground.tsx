import React from 'react';

interface GridBackgroundProps {
  lineColor?: string;
  spacing?: number;
  className?: string;
}

const GridBackground: React.FC<GridBackgroundProps> = ({ 
  lineColor = 'rgba(0, 123, 255, 0.05)', 
  spacing = 40, 
  className = "" 
}) => {
  return (
    <div 
      className={`absolute inset-0 -z-20 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, ${lineColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: `${spacing}px ${spacing}px`,
        maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
      }}
    />
  );
};

export default GridBackground;
