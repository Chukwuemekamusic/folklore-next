import { getStories } from "@/actions/storyService";
import { StoryCard } from "@/components/StoryCard";

export default async function StoriesPage() {
  const stories = await getStories();
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">All Stories</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </ul>
    </div>
  );
}