import prisma from "@/lib/db";
import { StoryStatus } from "@prisma/client";

// TODO: Add pagination, WHERE status = PUBLISHED | DRAFT, ORDER BY rating DESC
type OrderBy = 'rating' | 'createdAt' | 'updatedAt';
type OrderDirection = 'asc' | 'desc';

export async function getStories(orderBy: OrderBy = 'rating', orderDirection: OrderDirection = 'desc') {
  const stories = await prisma.story.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      rating: true,
      createdAt: true,
      updatedAt: true,
      continent: true,
      legend: true,
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
export async function getStoriesByUser(userId: string, orderBy: OrderBy = 'createdAt', orderDirection: OrderDirection = 'desc') {
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
      continent: true,
      legend: true,
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
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
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
    },
  });
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

// async function rateStory(userId: string, storyId: string, newRating: number) {
//     const existingRating = await prisma.storyRating.findUnique({
//         where: {
//             userId_storyId: {
//                 userId: userId,
//                 storyId: storyId,
//             },
//         },
//     });
  
//     if (existingRating) {
//         // Update the existing rating
//         return await prisma.storyRating.update({
//             where: { id: existingRating.id },
//             data: { rating: newRating },
//         });
//     } else {
//         // Create a new rating
//         return await prisma.storyRating.create({
//             data: {
//                 rating: newRating,
//                 storyId: storyId,
//                 userId: userId,
//             },
//         });
//     }
//   }



// async function calculateAverageRating(storyId) {
//     const ratings = await prisma.storyRating.findMany({
//         where: { storyId: storyId },
//         select: { rating: true }
//     });

//     if (ratings.length === 0) {
//         return 2.5; // Return default rating if no ratings exist
//     }

//     const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
//     const average = total / ratings.length;

//     return average;
// }


// async function addRating(storyId, userId, ratingValue) {
//     // Add the new rating
//     await prisma.storyRating.create({
//         data: {
//             storyId: storyId,
//             userId: userId,
//             rating: ratingValue
//         }
//     });

//     // Recalculate the average rating
//     const averageRating = await calculateAverageRating(storyId);

//     // Update the story's average rating
//     await prisma.story.update({
//         where: { id: storyId },
//         data: { rating: averageRating }
//     });
// }
