'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, Table, Image, PlusCircle } from "lucide-react";

export const navLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Table View",
    href: "/dashboard/table_view",
    icon: Table,
  },
  {
    name: "Images used",
    href: "/dashboard/images",
    icon: Image,
  },
  {
    name: "Create Story",
    href: "/dashboard/create",
    icon: PlusCircle,
  },
  
];

export default function DashboardItems() {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(
            "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted",
            pathname === link.href && "bg-muted"
          )}
        >
          <link.icon className="h-4 w-4" />
          {link.name}
        </Link>
      ))}
    </>
  );
  
}