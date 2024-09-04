import { StarRate } from "@/components/StarRate";
import Link from "next/link";
import { Button } from "./ui/button";
import { LucideArrowRight } from "lucide-react";

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    description: string;
    rating: number;
    // image?: string;
  };
}
 {/* TODO: change .id to .slug */}
 export function StoryCard({ story }: StoryCardProps) {
    return (
      <li className="flex flex-col h-full border border-primary-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="p-5 flex-grow">
          <h2 className="text-xl font-bold text-primary-800 mb-2 line-clamp-2">{story.title}</h2>
          <p className="text-sm text-primary-600 mb-4 line-clamp-3">{story.description}</p>
          <div className="flex items-center justify-between bg-muted p-2 rounded-lg w-fit">
            <StarRate value={story.rating} disabled={true}/>
            <span className="text-sm text-primary-600">{story.rating}</span>
          </div>
        </div>
        <Button variant="link" className="w-full mt-auto p-3 text-primary-700 hover:text-primary-800 hover:bg-primary-50 transition-colors duration-300">
          <Link href={`/stories/${story.id}`} className="flex items-center justify-center w-full">
            Read more <LucideArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </li>
    );
}