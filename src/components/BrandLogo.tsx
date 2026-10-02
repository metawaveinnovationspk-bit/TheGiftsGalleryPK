import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'emerald';
  type?: 'seal' | 'horizontal' | 'mark' | 'image-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  type = 'horizontal',
  size = 'md',
  showTagline = true
}) => {
  const isLight = variant === 'light';

  // Size specifications
  const sizeClasses = {
    sm: {
      img: 'h-8 sm:h-9 w-auto',
      text: 'text-xl',
      sub: 'text-[9px]',
      seal: 'w-14 h-14'
    },
    md: {
      img: 'h-10 sm:h-12 w-auto',
      text: 'text-2xl sm:text-3xl',
      sub: 'text-[11px]',
      seal: 'w-20 h-20'
    },
    lg: {
      img: 'h-14 sm:h-16 w-auto',
      text: 'text-3xl sm:text-4xl',
      sub: 'text-xs',
      seal: 'w-28 h-28'
    },
    xl: {
      img: 'h-20 sm:h-24 w-auto',
      text: 'text-4xl sm:text-5xl',
      sub: 'text-sm',
      seal: 'w-36 h-36'
    }
  };

  const currentSize = sizeClasses[size];

  // Exact attached TGG.png image asset as requested
  const exactTGGImage = (
    <img
      src="/TGG.png"
      alt="The Gifts Gallery (TGG)"
      className={`${currentSize.img} object-contain rounded-md drop-shadow-xs`}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = '/tgg_logo.png';
      }}
    />
  );

  // TYPE: Image Only (Raw exact attached image)
  if (type === 'image-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {exactTGGImage}
      </div>
    );
  }

  // TYPE 1: Circular Seal / Poster Emblem (Used on headers, posters and hero)
  if (type === 'seal') {
    return (
      <div className={`relative flex items-center justify-center ${currentSize.seal} ${className}`}>
        <div className="relative w-full h-full rounded-full bg-[#FAF7F0] p-2 flex flex-col items-center justify-center border-2 border-[#C59B27] shadow-md overflow-hidden">
          <img
            src="/TGG.png"
            alt="The Gifts Gallery"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }

  // TYPE 2: Mark Only
  if (type === 'mark') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        {exactTGGImage}
      </div>
    );
  }

  // TYPE 3: Horizontal Lockup with the exact TGG.png image
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Exact Attached Image */}
      <div className="shrink-0 flex items-center justify-center">
        {exactTGGImage}
      </div>

      <div className="flex flex-col leading-tight">
        <span
          className={`font-display font-bold tracking-tight ${currentSize.text} ${
            isLight ? 'text-[#FBF9F5]' : 'text-[#14382C]'
          }`}
        >
          The Gifts Gallery
        </span>
        {showTagline && (
          <span
            className={`font-sans tracking-[0.2em] uppercase font-semibold ${currentSize.sub} ${
              isLight ? 'text-[#DFC066]' : 'text-[#C59B27]'
            }`}
          >
            Gifts for Every Moment.
          </span>
        )}
      </div>
    </div>
  );
};
