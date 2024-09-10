// import Image from "next/image";
import Link from "next/link";
// import Logo from "@/public/logo.svg";

import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser, Home, Globe, DollarSign, PlusCircle, Table, Image } from "lucide-react";
import DashboardItems from "@/components/Dashboard/DashboardItems";

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
//   {
//     name: "Sites",
//     href: "/dashboard/sites",
//     icon: Globe,
//   },
//   {
//     name: "Pricing",
//     href: "/dashboard/pricing",
//     icon: DollarSign,
//   },
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full maxhscreen flex-col gap-2">
          
          <div className="flex-1">
            <nav className="grid items-start px-2  font-medium lg:px-4 mt-10">
              <DashboardItems />
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
