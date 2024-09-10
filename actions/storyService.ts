'use server'
import prisma from "@/lib/db";
import { StoryStatus } from "@prisma/client";

// TODO: Add pagination, WHERE status = PUBLISHED | DRAFT, ORDER BY rating DESC
type OrderBy = 'rating' | 'createdAt' | 'updatedAt';
type OrderDirection = 'asc' | 'desc';

type GetStoriesParams = {
  orderBy?: OrderBy;
  orderDirection?: OrderDirection;
  status?: StoryStatus
  userId?: string
}

export async function getStories({orderBy = 'rating', orderDirection = 'desc', status = 'PUBLISHED'}: GetStoriesParams = {}) {
  const stories = await prisma.story.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      rating: true,
      createdAt: true,
      updatedAt: true,
      continent: true,
      legend: {
        select: {
          name: true,
        },
      },
      image: true,
      status: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      [orderBy]: orderDirection,
    },
  });
  return stories;
}
export async function getStoriesByUser({userId, orderBy = 'createdAt', orderDirection = 'desc'}: GetStoriesParams) {
  const stories = await prisma.story.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      rating: true,
      createdAt: true,
      updatedAt: true,
      continent: {
        select: {
          id: true,
          name: true,
        },
      },
      legend: {
        select: {
          name: true,
        },
      },
      status: true,
      image: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      [orderBy]: orderDirection,
    },
  });
  return stories;
}

export async function getStory(id: string) {
  const story = await prisma.story.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      content: true,
      image: true,
      slug: true,
      views: true,
      rating: true,
      status: true,
      continent: {
        select: {
          id: true,
          name: true,
        },
      },
      legend: {
        select: {
          id: true,
          name: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },  
    author: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!story) {
    return null;
  }
  return story;
}

export async function getStoriesOfContinent(name: string, orderBy: OrderBy = 'rating', orderDirection: OrderDirection = 'desc') {
  const stories = await prisma.story.findMany({
    where: {
      continent: {
        name: name,
      },
      status: "PUBLISHED" as StoryStatus,
    },
    select: {
      id: true,
      title: true,
      description: true,
      rating: true,
      createdAt: true,
      updatedAt: true,
      continent: {
        select: {
          id: true,
          name: true,
        },
      },
      legend: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      [orderBy]: orderDirection,
    },
  });
  return stories;
}

export async function getAllContinentsWithStoryCount() {
  const continents = await prisma.continent.findMany({
    include: {
      _count: {
        select: {
          stories: true,
        },
      },
    },
  });
  return continents;
}

export async function getAllContinentsWithLegends() {
  const continents = await prisma.continent.findMany({
    select: {
      id: true,
      name: true,
      legends: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return continents;
}

export async function getContinentsOfAvailableStories() {
  const continents = await prisma.continent.findMany({
    include: {
      _count: {
        select: {
          stories: true,
        },
      },
    },
  });
  return continents.filter((continent) => continent._count.stories > 0);
}

export async function getLegendsOfAvailableStories() {
  const legends = await prisma.legend.findMany({
    include: {
      _count: {
        select: {
          stories: true,
        },
      },
    },
  });
  return legends.filter((legend) => legend._count.stories > 0);
}

export async function getUniqueImageLinksByUser(userId: string) {
  const uniqueImages = await prisma.story.findMany({
    where: {
      authorId: userId,
      image: {
        not: null,
      },
    },
    select: {
      image: true,
    },
    distinct: ['image'],
  });

  return uniqueImages.map(story => story.image);
}
