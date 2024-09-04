import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Book, CircleUser } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

import { getAllContinentsWithStoryCount, getLegendsOfAvailableStories } from "@/actions/storyService";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";


const Navbar = async () => {
  const continents = await getAllContinentsWithStoryCount();
  const legends = await getLegendsOfAvailableStories();
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  return (
    <header className="flex items-center justify-between p-6 md:p-8 bg-muted/30">
      <nav className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">Folk<span className="font-bold">lore</span></h1>
        </div>
        
        <ul className="flex items-center space-x-6 ml-auto">
          <li className="">
            <ThemeToggle />
          </li>
          <li className="hover:text-gray-400">
            <Link href="/">Home</Link>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-gray-400">
                Explore
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="hover:text-gray-400">
                    By Legend
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {legends.map((legend) => (
                      <DropdownMenuItem key={legend.id}>
                        <Link href={`/stories/legend/${legend.id}`}>
                          {legend.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="hover:text-gray-400">
                    By Continent
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {continents.map((continent) => (
                      <DropdownMenuItem key={continent.id}>
                        <Link href={`/stories/continent/${continent.name}`}>
                          <MapPin className="mr-2 inline-block size-4" />
                          {continent.name}
                          {continent._count.stories > 0 && (
                            <Book className="inline-block ml-2 size-4" />
                          )}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li className="hover:text-gray-400">
            <Link href="/stories">All Stories</Link>
          </li>
          
          {/* TODO: this should show after login */}
          <li>
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {session ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <LogoutLink>Log out</LogoutLink>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <LoginLink>Login</LoginLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <RegisterLink>Register</RegisterLink>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
