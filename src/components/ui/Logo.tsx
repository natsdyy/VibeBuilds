import React from 'react';
import logoImg from '../../assets/logowithname.png';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center group cursor-pointer ${className}`}>
      <div className="relative">
        <img 
          src={logoImg} 
          alt="VibeBuilds" 
          className="h-9 w-auto group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity -z-10" />
      </div>
    </div>
  );
};

export default Logo;
