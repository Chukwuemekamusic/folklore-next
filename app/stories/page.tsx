import { getStories } from "@/actions/storyService";
import { StoryCard } from "@/components/StoryCard";
import StoryCard2 from "@/components/StoryCard2";

export default async function StoriesPage() {
  const stories = await getStories();
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">All Stories</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {stories.map((story) => (
          // <StoryCard key={story.id} story={story} />
          <StoryCard2 key={story.id} story={{...story, image: story.image || undefined}} />
        ))}
      </ul>
    </div>
  );
}