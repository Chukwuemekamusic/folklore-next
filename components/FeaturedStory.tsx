import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardTitle, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getStories } from '@/actions/storyService'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Eye, Edit, Trash2 } from 'lucide-react'


// getHomePageStories is a server action that returns an array of stories from the database
// const homepageStories = [
//     {
//         id: 1,
//         title: 'The Library',
//         image: '/img/library_black&white.jpg',
//         description: 'The Library is a story of a library that is in the middle of the night and the library is in the middle of the night.'
//     },
//     {
//         id: 2,
//         title: 'The Library',
//         image: '/img/library_black&white.jpg',
//         description: 'The Library is a story of a library that is in the middle of the night and the library is in the middle of the night.'
//     },
//     {
//         id: 3,
//         title: 'The Library',
//         image: '/img/library_black&white.jpg',
//         description: 'The Library is a story of a library that is in the middle of the night and the library is in the middle of the night.'
//     }

// ]



const FeaturedStory = async () => {
  const stories = await getStories();
  const homepageStories = stories.filter((story) => story.image).slice(0, 3);
  return (
    <section className="container mx-auto">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4">Featured Story</h1>
        {/* <div className="header-line mb-4"></div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">   
        {homepageStories.map((story, index) => (
            <Card key={story.id}>
              <Image
                src={story.image || '/img/library_black&white.jpg'}
                alt={story.title}
                width={400}
                height={200}
                className="w-full  object-cover rounded-t-lg h-[200px]"
              />
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge
                    variant={
                      index % 2 === 0 ? "default" : "secondary"
                    }
                  >
                    {story.legend.name}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(story.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
                <CardTitle className="truncate">{story.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {story.description.length > 100 
                    ? `${story.description.slice(0, 100)}...` 
                    : story.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col space-y-2">
                {/* <p>Rating: {story.rating}</p> */}
                <div className="flex w-full space-x-2 ">
                <Button asChild className="w-full mr-2" variant="secondary">
                  <Link href={`/stories/${story.id}`}><Eye className="mr-2 size-4" /> Read Story</Link>
                </Button>
                
                </div>
               
               
              </CardFooter>
            </Card>
          ))}
        </div>
    </section>
  )
}

export default FeaturedStory