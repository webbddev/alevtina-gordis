'use client';

import { ReactLenis } from 'lenis/react';

function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <ReactLenis root>{children}</ReactLenis>;
}

export default SmoothScrollProvider;
