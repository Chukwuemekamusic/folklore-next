"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { SubmitButton } from "./SubmitButton";
import { deleteStoryAction2 } from "@/actions/createService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function DeleteForm({
  storyId,
  authorId,
  storyTitle,
}: {
  storyId: string;
  authorId: string;
  storyTitle: string;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const actionResult = await deleteStoryAction2(
        data.storyId,
        data.authorId
      );
      if (actionResult.error) {
        return toast.error(actionResult.error);
      }
      toast.success(actionResult.message);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-3 text-center">
          Are you sure you want to delete this story? <br />
          <span className="text-primary text-xl text-slate-500 block mt-2">
            "{storyTitle.toUpperCase()}"
          </span>
        </CardTitle>
        <CardDescription className="text-sm text-destructive font-bold text-center mb-3">
          This action cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-full flex justify-between">
        <Button onClick={() => router.back()}>
          <ArrowLeft className="size-4 mr-2" /> Cancel
        </Button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("storyId")} value={storyId} />
          <input type="hidden" {...register("authorId")} value={authorId} />
          <SubmitButton
            text="Delete Test"
            variant="destructive"
            icon={<Trash2 className="size-4 mr-2" />}
            isSubmitting={isSubmitting}
          />
        </form>
      </CardFooter>
    </Card>
  );
}
