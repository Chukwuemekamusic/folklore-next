import { getStory } from "@/actions/storyService";
import { StarRate } from "@/components/StarRate";

export default async function StoryPage({ params }: { params: { slug: string } }) {
  const story = await getStory(params.slug);
  if (!story) {
    return <div>Story not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
      <div className="mb-4">
        <span className="text-muted-foreground">By {story.author.name}</span>
        <span className="mx-2">|</span>
        <span className="text-primary bg-secondary rounded-full px-2 py-1"><StarRate value={story.rating} /> {story.rating.toFixed(1)}</span>
      </div>
      <p className="text-lg mb-6">{story.description}</p>
      <div className="mb-4">
        <span className="font-semibold">Continent:</span> {story.continent.name}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Legend:</span> {story.legend.name}
      </div>
      <div className="text-sm text-muted-foreground">
        <p>Created: {new Date(story.createdAt).toLocaleDateString()}</p>
        <p>Last updated: {new Date(story.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}