'use client';

import { useIsDashboard } from './useIsDashboard';
import Navbar from "@/components/Navbar";

export default function ConditionalNavbar() {
  const isDashboard = useIsDashboard();

  if (isDashboard) {
    return null;
  }

  return <Navbar />;
}