import { getStory } from "@/actions/storyService";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EditArticleForm from "@/components/Dashboard/forms/EditArticleForm";
import {getAllContinentsWithLegends} from "@/actions/storyService";
import { requireUser } from "@/lib/requireUser";

export default async function EditStoryPage2({
  params,
}: {
  params: { storyId: string };
}) {
  const continents = await getAllContinentsWithLegends();
  const story = await getStory(params.storyId);
  if (!story) {
    return <div>Story not found</div>;
  }
  const user = await requireUser();

  if(story.author.id !== user.id) {
    return <div className="flex flex-col items-center h-[calc(100vh-20rem)] justify-center">
        <h1 className="text-2xl font-bold mb-3">You are not authorized to edit this story</h1>
        <Button variant="destructive" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
    </div>;
  }

  return (
    <div>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-2" asChild>
          <Link href="/dashboard/table_view">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Story</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Story Details</CardTitle>
          <CardDescription>Edit your story details.</CardDescription>
        </CardHeader>
        <CardContent>
          <EditArticleForm story={story} continentData={continents} />
        </CardContent>
      </Card>
    </div>
  );
}
