"use client";

import dynamic from 'next/dynamic';

const CrispWithNoSSR = dynamic(() => import('@/components/ui/crisp'), { 
  ssr: false 
});

export default function CrispProvider() {
  return <CrispWithNoSSR />;
}
