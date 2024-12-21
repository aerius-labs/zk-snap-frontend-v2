'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const fallbackImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s';

const ImageWithFallback = ({
  fallback = fallbackImage,
  alt,
  src,
  ...props
}: {
  fallback?: string;
  alt: string;
  src: string;
  [key: string]: any;
}) => {
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallbackImage : src}
      {...props}
    />
  );
};
export default ImageWithFallback;
