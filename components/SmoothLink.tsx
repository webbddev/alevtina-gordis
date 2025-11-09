'use client';

import { useLenis } from 'lenis/react';
import React from 'react';

interface SmoothLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: React.ReactNode;
}

export function SmoothLink({ href, children, ...props }: SmoothLinkProps) {
  const lenis = useLenis();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = href;
    if (target) {
      lenis?.scrollTo(target, { lerp: 0.05 });
    }
  };

  return (
    <a href={href} {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
