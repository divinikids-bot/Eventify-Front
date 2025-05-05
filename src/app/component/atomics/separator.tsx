// @/components/ui/separator.tsx
import React from 'react';

export const Separator: React.FC<{ className?: string }> = ({ className }) => {
  return <hr className={`border-t border-border/40 ${className}`} />;
};
