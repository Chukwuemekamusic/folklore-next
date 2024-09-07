"use server"

import { requireUser } from "@/lib/requireUser";
import { parseWithZod } from "@conform-to/zod";
import { createStorySchema, TcreateStorySchema } from "@/lib/zodSchemas";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

export async function createStoryAction(prevState: any, data: TcreateStorySchema) {
  const user = await requireUser();

  const submission = createStorySchema.safeParse(data);

  if (!submission.success) {
    return {error: submission.error.issues};
  }

  const { title, description, legendId, image, content, continentName, slug } =
    submission.data;


  const story = await prisma.story.create({
    data: {
      title,
      description,
      legend: {
        connect: { id: legendId },
      },
      image,
      content,
      continent: {
        connect: {
          name: continentName,
        },
      },
      slug,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  revalidatePath("/");


  return {
    message: "Story created successfully",
  };
}

export async function createStoryAction2(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: createStorySchema,
    // async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { title, description, legendId, image, content, continentName, slug } =
    submission.value;


  const story = await prisma.story.create({
    data: {
      title,
      description,
      legend: {
        connect: { id: legendId },
      },
      image,
      content,
      continent: {
        connect: {
          name: continentName,
        },
      },
      slug,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  revalidatePath("/");

  toast.success("Story created successfully");

  return {
    redirect: `/dashboard`,
  };
}
