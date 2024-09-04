import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "@/public/img/default.png"
import { StarRate } from "./StarRate";
import { LucideArrowRight } from "lucide-react";

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    description: string;
    rating: number;
    image?: string;
  };
}

export default function StoryCard2({ story }: StoryCardProps) {
  return (
    <Card key={story.id}>
      <CardHeader>
        {/* <Image src={story.image || defaultImage} alt={story.title} width={400} height={200} className="w-full  object-cover rounded-t-lg h-[200px]" /> */}
        <CardTitle>{story.title}</CardTitle>
        <CardDescription>{story.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end  ">
      <StarRate value={story.rating} disabled={true} />
      </CardContent>
      <CardFooter>
        {/* <p>Rating: {story.rating}</p> */}
        <Button asChild className="w-full" variant="secondary">
        <Link href={`/stories/${story.id}`} className="flex items-center justify-center">
            Read Story <LucideArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        

      </CardFooter>
    </Card>
  );
}
