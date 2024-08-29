import { getStoriesOfContinent } from "@/actions/storyService";
import { StoryCard } from "@/components/StoryCard";



export default async function StoriesOfContinentPage({ params }: { params: { name: string } }) {
  const decodedName = decodeURIComponent(params.name);
    const continentStories = await getStoriesOfContinent(decodedName);
  return (
    <div className="container mx-auto">
      {continentStories.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mt-11 mb-2">No stories available for <span className="text-gray-950">{decodedName.toUpperCase()}</span></h1>
          <p className="text-sm text-gray-500">
            There are no stories from this continent yet.
          </p>
        </div>
      ) : (
        <div>
      <h1 className="text-2xl font-bold mb-2">Stories from {continentStories[0].continent.name}</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {continentStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </ul>
      </div>
      )}
    </div>
  );
}