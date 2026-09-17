import { useState } from 'react';
import type { ImageAsset } from '../types/content';

interface BrandImageProps {
  image: ImageAsset;
  className?: string;
  fallbackLabel?: string;
  eager?: boolean;
}

export function BrandImage({ image, className, fallbackLabel, eager }: BrandImageProps) {
  const [currentSrc, setCurrentSrc] = useState(image.src);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (currentSrc.includes('postimg.cc') && currentSrc.includes('image.png')) {
      setCurrentSrc('/assets/athar-logo.png');
      return;
    }
    if (currentSrc.includes('postimg.cc') && currentSrc.includes('1.jpg')) {
      setCurrentSrc('/assets/trainer-mohamed.jpg');
      return;
    }
    setFailed(true);
  };

  if (failed) {
    return fallbackLabel ? (
      <span className={`${className ?? ''} image-fallback`} role="img" aria-label={fallbackLabel}>
        {fallbackLabel.slice(0, 1)}
      </span>
    ) : null;
  }

  return (
    <img
      alt={image.alt}
      className={className}
      decoding="async"
      loading={eager ? 'eager' : 'lazy'}
      onError={handleError}
      referrerPolicy="no-referrer"
      src={currentSrc}
    />
  );
}
