import React from 'react';
import { Heart, Shield, Star } from 'lucide-react';

interface HealthMascotProps {
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  className?: string;
}

const HealthMascot: React.FC<HealthMascotProps> = ({ 
  size = 'md', 
  animate = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-24 h-24'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Main mascot circle */}
      <div className={`
        w-full h-full rounded-full bg-gradient-medical 
        flex items-center justify-center shadow-soft
        ${animate ? 'animate-pulse-gentle' : ''}
      `}>
        {/* Medical cross/heart icon */}
        <Heart className={`
          text-white
          ${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-12 h-12'}
        `} />
      </div>
      
      {/* Floating elements for larger sizes */}
      {size !== 'sm' && (
        <>
          {/* Shield icon */}
          <div className={`
            absolute -top-1 -right-1 w-6 h-6 bg-trust rounded-full 
            flex items-center justify-center shadow-soft
            ${animate ? 'animate-bounce' : ''}
          `} style={{ animationDelay: '0.5s', animationDuration: '2s' }}>
            <Shield className="w-3 h-3 text-white" />
          </div>
          
          {/* Star icon for lg size */}
          {size === 'lg' && (
            <div className={`
              absolute -bottom-1 -left-1 w-6 h-6 bg-warning rounded-full 
              flex items-center justify-center shadow-soft
              ${animate ? 'animate-bounce' : ''}
            `} style={{ animationDelay: '1s', animationDuration: '2s' }}>
              <Star className="w-3 h-3 text-white" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HealthMascot;