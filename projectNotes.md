# Project Notes

## Pages

- Home
- Stories
- Stories of a continent
- Stories of a legend

## Learnings

### How to use decodeURIComponent

- The `decodeURIComponent` function is used to decode a URL-encoded string.
- It takes a string as input and returns a new string with each encoded URI component decoded.
- In the case of this project, it was used to decode the name of a continent or country that is encoded in the URL. Thus removing the `%20` and replacing it with a space.

```ts
const continentName = decodeURIComponent(params.name);

// another example
decodeURIComponent("search+query%20%28correct%29"); // "search query (correct)"
```

### How to use Pagination

```ts
export async function getStories(
  orderBy: OrderBy = 'rating',
  orderDirection: OrderDirection = 'desc',
  page: number = 1,
  pageSize: number = 10
) {
  const skip = (page - 1) * pageSize;
  const [stories, totalCount] = await prisma.$transaction([
    prisma.story.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        rating: true,
        createdAt: true,
        updatedAt: true,
        continent: true,
        legend: true,
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
      skip,
      take: pageSize,
    }),
    prisma.story.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    stories,
    pagination: {
      currentPage: page,
      totalPages,
      pageSize,
      totalCount,
    },
  };
}
```