import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import defaultImage from "@/public/img/default.png";
import { requireUser } from "@/lib/requireUser";
import { getStoriesByUser, getStories } from "@/actions/storyService";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Edit, Eye, LucidePlus, PlusCircle, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/Dashboard/EmptyState";
import { format } from "date-fns";
import { getAllContinentsWithLegends } from "@/actions/storyService";

export default async function DashboardPage() {
  const user = await requireUser();
  const stories = await getStoriesByUser({ userId: user.id });
//   const stories = await getStories();
  const continents = await getAllContinentsWithLegends();
  const encodedContinents = encodeURIComponent(JSON.stringify(continents));
  return (
    <div className="container mx-auto mt-4">
      <div className="flex justify-end mb-4">
        <Button asChild>
          <Link href="/dashboard/create" className="flex items-center gap-2">
            <PlusCircle className="size-5" />
            Create Story real
          </Link>
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold mb-4">Your Stories</h1>
      {stories.length === 0 ? (
        <EmptyState
          title="No stories written by you"
          description="You don't have any stories yet. Create one to get started."
          buttonText="Create Story"
          href="/dashboard/create"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {stories.map((story) => (
            <Card key={story.id}>
              <Image
                src={story.image || defaultImage}
                alt={story.title}
                width={400}
                height={200}
                className="w-full  object-cover rounded-t-lg h-[200px]"
              />
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge
                    variant={
                      story.status === "PUBLISHED" ? "default" : "secondary"
                    }
                  >
                    {story.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(story.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
                <CardTitle>{story.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {story.description.length > 100 
                    ? `${story.description.slice(0, 100)}...` 
                    : story.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col space-y-2">
                {/* <p>Rating: {story.rating}</p> */}
                <div className="flex w-full space-x-2 ">
                <Button asChild className="w-full mr-2" variant="secondary">
                  <Link href={`/stories/${story.id}`}><Eye className="mr-2 size-4" /> Read Story</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/edit/${story.id}`}><Edit className="mr-2 size-4" /> Edit Story</Link>
                </Button>
                </div>
               
                <Button
                  variant="destructive"
                  className="w-full mt-3"
                  asChild
                >
                    <Link href={`/dashboard/delete/${story.id}`}>
                  <Trash2 className="mr-2 size-4" /> Delete
                </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
