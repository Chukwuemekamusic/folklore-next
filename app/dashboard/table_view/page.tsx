import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import defaultImage from "@/public/img/default.png";
import { requireUser } from "@/lib/requireUser";
import { getStoriesByUser } from "@/actions/storyService";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { LucidePlus, Pencil, PlusCircle } from "lucide-react";
import { EmptyState } from "@/components/Dashboard/EmptyState";
import { format } from "date-fns";
import { getAllContinentsWithLegends } from "@/actions/storyService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2 } from "lucide-react";

export default async function TableViewPage() {
  const user = await requireUser();
  const stories = await getStoriesByUser({ userId: user.id });
  const continents = await getAllContinentsWithLegends();
  const encodedContinents = encodeURIComponent(JSON.stringify(continents));
  
  return (
    <div className="container mx-auto mt-4 px-4">
      <div className="flex justify-end gap-x-4 mb-4">
        <Button asChild>
          <Link href="/dashboard/create" className="flex items-center gap-2">
            <PlusCircle className="size-5" />
            Create Story real
          </Link>
        </Button>
      </div>
      {/* <h1 className="text-2xl font-bold mb-4">Your Stories</h1> */}
      {stories.length === 0 ? (
        <EmptyState
          title="No stories written by you!"
          description="You don't have any stories yet. Create one to get started."
          buttonText="Create Story"
          href="/dashboard/create"
        />
      ) : (
        <div className="w-full justify-endgrid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Stories</CardTitle>
              <CardDescription>
                You have {stories.length} stories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Continent</TableHead>
                    <TableHead>Legend</TableHead>
                    <TableHead>CreatedAt</TableHead>
                    {/* <TableHead>UpdatedAt</TableHead> */}
                    <TableHead className="text-end">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stories.map((story) => (
                    <TableRow key={story.id}>
                      <TableCell>
                        <Image
                          src={story.image || defaultImage}
                          alt={story.title}
                          width={50}
                          height={50}
                          className="rounded-md md:size-14 lg:size-20 object-cover"
                        />
                      </TableCell>
                      <TableCell>{story.title}</TableCell>
                      <TableCell>
                        {story.description.length > 100 
                          ? `${story.description.slice(0, 100)}...` 
                          : story.description}
                      </TableCell>
                      <TableCell>{story.status}</TableCell>
                      <TableCell>{story.continent.name}</TableCell>
                      <TableCell>{story.legend.name}</TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                        }).format(story.createdAt)}
                      </TableCell>
                      <TableCell className="text-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/edit/${story.id}`}>
                                <Pencil className="size-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/delete/${story.id}`}>
                                <Trash2 className="size-4 mr-2" />
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>

            <CardFooter></CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
