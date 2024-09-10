import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { getStory } from "@/actions/storyService";
import { requireUser } from "@/lib/requireUser";
import { deleteStoryAction } from "@/actions/createService";
import { toast } from "sonner";
import { SubmitButton } from "@/components/Dashboard/forms/SubmitButton";
import DeleteForm from "@/components/Dashboard/forms/DeleteForm";

export default async function DeleteStoryPage({
  params,
}: {
  params: { storyId: string };
}) {
  const story = await getStory(params.storyId);
  if (!story) {
    return <div>Story not found</div>;
  }
  const user = await requireUser();

  if (story.author.id !== user.id) {
    return (
      <div className="flex flex-col items-center h-[calc(100vh-20rem)] justify-center">
        <h1 className="text-2xl font-bold mb-3">
          You are not authorized to delete this story
        </h1>
        <Button variant="destructive" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-20rem)]">
      <DeleteForm storyId={story.id} authorId={story.author.id} storyTitle={story.title}/>
    </div>
  );
}
