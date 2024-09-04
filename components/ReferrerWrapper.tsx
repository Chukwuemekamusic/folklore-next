'use client'
import { useEffect, useState } from 'react';

export default function ReferrerWrapper({ children }: { children: (referrer: string) => JSX.Element }) {
  const [referrer, setReferrer] = useState('');

  useEffect(() => {
    setReferrer(document.referrer);
  }, []);

  return children(referrer);
}