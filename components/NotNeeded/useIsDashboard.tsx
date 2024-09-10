'use client'

import { usePathname } from "next/navigation";

export function useIsDashboard() {
    const pathname = usePathname();
    return pathname.startsWith('/dashboard');
}