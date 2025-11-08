'use client';

import Link from 'next/link';
import { Grid } from 'lucide-react';

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick }: LogoProps) {
  return (
    <Link href="/" className="flex items-center space-x-2" onClick={onClick}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-500">
        <Grid className="h-5 w-5 text-white" />
      </div>
      <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent">
        Pinspire
      </span>
    </Link>
  );
}
