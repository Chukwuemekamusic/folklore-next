import { getStory } from "@/actions/storyService";
import { StarRate } from "@/components/StarRate";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "@/public/img/default.png";
import { RenderArticle } from "@/components/RenderArticle/RenderArticle";
import { JSONContent } from "novel";
import GoBackButton from "@/components/GobackButton";
import { Button } from "@/components/ui/button";

export default async function StoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const story = await getStory(params.slug);
  const image = story?.image || defaultImage;

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center w-3/5">
        <h1 className="font-bold text-2xl mb-4">Story not found</h1>
        <div  className="flex justify-between items-center">
          <Button asChild>
            <Link
              href="/stories"
              className="flex items-center space-x-2 hover:text-muted-foreground hover:underline"
            >
              <ArrowLeft className="mr-3" />
              Back to Stories
            </Link>
          </Button>

          <Button className="ml-2" variant="outline" asChild>
          <Link
            href="/"
            className="flex items-center space-x-2 hover:text-muted-foreground hover:underline"
          >
            <ArrowLeft className="mr-3" />
            Back Home
          </Link>
          </Button>
        </div>
      </div>
    );
  }

  const tags = story.tags.map((tag) => tag.name).join(", ");

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <GoBackButton addText={true} />
      <div className="flex flex-col items-center">
      <div className="m-auto w-full text-center md:w-10/12 mb-10">

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{story.title}</h1>
        <div className="mb-4">
        <span className="text-sm md:text-base">By {story.author.name}</span>
            <span className="mx-2">|</span>
            <span className="my-5 text-sm font-light text-muted-foreground md:text-base">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
              }).format(story.createdAt)}
            </span>
            <span className="mx-2">|</span>
            <span className="text-sm md:text-base">
              {story.continent.name}: {story.legend.name}
            </span>
            
        </div>
        <p className="m-auto w-10/12 text-muted-foreground line-clamp-3">
          {story.description}
        </p>
      </div>
      </div>

      <div className="relative m-auto mb-10 h-80 w-full max-w-screen-lg overflow-hidden md:mb-20 md:h-[450px] md:w-5/6 md:rounded-2xl lg:w-2/3">
        <Image
          src={image}
          alt={story.title}
          width={1200}
          height={630}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <RenderArticle json={story.content as JSONContent} />


      <div className="text-sm text-muted-foreground">
        {/* <p>Created: {new Date(story.createdAt).toLocaleDateString()}</p>
        <p>Last updated: {new Date(story.updatedAt).toLocaleDateString()}</p> */}
        <div className="flex justify-end m-6">
        <div className="text-primary bg-secondary rounded-full px-2 py-1 mt-4 w-fit ">
          <StarRate value={story.rating} /> {story.rating.toFixed(1)}
        </div>
        </div>
      </div>

      {tags && tags.length > 0 && <div className="text-sm text-muted-foreground">
        <p>Tags: {tags}</p>
      </div>}
    </div>
  );
}
