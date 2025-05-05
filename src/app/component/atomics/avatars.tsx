// @/components/ui/avatar.tsx
import React from 'react';

interface AvatarProps {
  className?: string;
  children?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({ children, className }) => {
  return (
    <div className={`inline-flex items-center justify-center rounded-full bg-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const AvatarImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />;
};

export const AvatarFallback: React.FC<{ children: string }> = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-full h-full text-white bg-gray-500 rounded-full">
      {children}
    </div>
  );
};
