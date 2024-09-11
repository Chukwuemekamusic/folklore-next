"use server";

import { requireUser } from "@/lib/requireUser";
import { parseWithZod } from "@conform-to/zod";
import { createStorySchema, TcreateStorySchema } from "@/lib/zodSchemas";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import { StoryStatus } from "@prisma/client";
import { redirect } from "next/navigation";

const convertTagsToArray = (tags: string) => {
  return tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
}

export async function createStoryAction(
  prevState: any,
  data: TcreateStorySchema
) {
  const user = await requireUser();

  const submission = createStorySchema.safeParse(data);

  if (!submission.success) {
    return { error: submission.error.issues };
  }

  const {
    title,
    description,
    legendId,
    image,
    content,
    continentName,
    slug,
    status,
    tags,
  } = submission.data;

  const storyStatus = status as StoryStatus;
  const storyContent = JSON.parse(content);
  const tagsArray = convertTagsToArray(tags);

  const story = await prisma.story.create({
    data: {
      title,
      description,
      legend: {
        connect: { id: legendId },
      },
      image,
      content: storyContent,
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
      status: storyStatus,
      ...(tagsArray.length > 0 && {
        tags: {
          connectOrCreate: tagsArray.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      })
    },
  });

  if (!story) {
    return { error: "Story creation failed" };
  }

  revalidatePath("/");

  return {
    message: "Story created successfully",
  };
}

// Edit Story Action to be used in api route
export async function editStoryAction2(
  prevState: any,
  data: TcreateStorySchema,
  storyId: string
) {
  const user = await requireUser();

  const submission = createStorySchema.safeParse(data);

  if (!submission.success) {
    return { error: submission.error.issues };
  }

  const {
    title,
    description,
    legendId,
    image,
    content,
    continentName,
    slug,
    status,
    tags,
  } = submission.data;

  const storyStatus = status as StoryStatus;
  const storyContent = JSON.parse(content);
  const tagsArray = convertTagsToArray(tags);

  const story = await prisma.story.update({
    where: { id: storyId },
    data: {
      title,
      description,
      legend: {
        connect: { id: legendId },
      },
      image,
      content: storyContent,
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
      status: storyStatus,
      ...(tagsArray.length > 0 && {
        tags: {
          connectOrCreate: tagsArray.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      })
    },
  });

  if (!story) {
    return { error: "Story update failed" };
  }

  revalidatePath("/dashboard");

  return {
    message: "Story updated successfully",
  };
}

export async function createStoryAction2(
  prevState: any,
  data: TcreateStorySchema
) {
  const user = await requireUser();

  const submission = createStorySchema.safeParse(data);

  if (!submission.success) {
    const zodErrors = submission.error.issues.reduce((acc, issue) => {
      acc[issue.path[0]] = issue.message;
      return acc;
    }, {} as Record<string, string>); // Use Record for type safety

    return { error: zodErrors };
  }

  const {
    title,
    description,
    legendId,
    image,
    content,
    continentName,
    slug,
    status,
    tags,
  } = submission.data;

  const storyStatus = status as StoryStatus;
  const storyContent = JSON.parse(content);
  const tagsArray = convertTagsToArray(tags);

  const story = await prisma.story.create({
    data: {
      title,
      description,
      legend: {
        connect: { id: legendId },
      },
      image,
      content: storyContent,
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
      status: storyStatus,
      ...(tagsArray.length > 0 && {
        tags: {
          connectOrCreate: tagsArray.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      })
    },
  });

  if (!story) {
    return { error: "Story creation failed" };
  }

  revalidatePath("/");

  return {
    message: "Story created successfully",
  };
}

// Edit Story Action with no api route needed
export async function editStoryAction(
  prevState: any,
  data: TcreateStorySchema,
  storyId: string,
  authorId: string
) {
  const user = await requireUser();
  if (user.id !== authorId) {
    return { error: "You are not authorized to edit this story" };
  }

  const submission = createStorySchema.safeParse(data);

  if (!submission.success) {
    const zodErrors = submission.error.issues.reduce((acc, issue) => {  
      acc[issue.path[0]] = issue.message;
      return acc;
    }, {} as Record<string, string>); // Use Record for type safety

    return { error: zodErrors };
  }

  const {
    title,
    description,
    legendId,
    image,
    content,
    continentName,
    slug,
    status,
    tags,
  } = submission.data;

  const storyStatus = status as StoryStatus;
  const storyContent = JSON.parse(content);
  const tagsArray = convertTagsToArray(tags);

  const story = await prisma.story.update({
    where: { id: storyId },
    data: {
      title,
      description,
      legend: {
        connect: { id: legendId },
      },
      image,
      content: storyContent,
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
      status: storyStatus,
      ...(tagsArray.length > 0 && {
        tags: {
          connectOrCreate: tagsArray.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      })
    },
  });

  if (!story) {
    return { error: "Story update failed" };
  }

  revalidatePath("/dashboard");

  return {
    message: "Story updated successfully",
  };
}

export async function deleteStoryAction(formData: FormData) {
    const user = await requireUser();
    const authorId = formData.get("authorId") as string;
    const storyId = formData.get("storyId") as string;

    if (user.id !== authorId) {
        return { error: "You are not authorized to delete this story" };
    }
    try {
        const story = await prisma.story.delete({
            where: { id: storyId },
        });
        revalidatePath("/dashboard");

        return { message: "Story deleted successfully" };

    } catch (error) {
        return { error: "Story deletion failed" };
    }
}

export async function deleteStoryAction2(storyId: string, authorId: string) {
    // #TODO: Add Admin check to permit deletion.
    const user = await requireUser();
    if (user.id !== authorId) {
        return { error: "You are not authorized to delete this story" };
    }
    const story = await prisma.story.delete({
        where: { id: storyId },
    });

    if (!story) {
        return { error: "Story deletion failed" };
    }

    revalidatePath("/dashboard");

    return {
        message: "Story deleted successfully",
    };
}