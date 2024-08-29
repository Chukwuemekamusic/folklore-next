import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardTitle, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'


// getHomePageStories is a server action that returns an array of stories from the database
const homepageStories = [
    {
        id: 1,
        title: 'The Library',
        image: '/img/library_black&white.jpg',
        description: 'The Library is a story of a library that is in the middle of the night and the library is in the middle of the night.'
    },
    {
        id: 2,
        title: 'The Library',
        image: '/img/library_black&white.jpg',
        description: 'The Library is a story of a library that is in the middle of the night and the library is in the middle of the night.'
    },
    {
        id: 3,
        title: 'The Library',
        image: '/img/library_black&white.jpg',
        description: 'The Library is a story of a library that is in the middle of the night and the library is in the middle of the night.'
    }

]

const FeaturedStory = () => {
  return (
    <section className="container mx-auto">
        <h1 className="text-2xl md:text-3xlxl font-bold text-center mb-4">Featured Story</h1>
        {/* <div className="border-t border-primary w-full max-w-md mx-auto mb-4 mt-2"></div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">   
        {homepageStories.map((story) => (
            <Card key={story.id} className="max-w-sm mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300"> {/* Using Shadcn Card component */}
            <CardHeader>
                <CardTitle>
                    <Image src={story.image} alt={story.title} className="w-full h-48 object-cover" width={100} height={100} /> 
                    <p className="text-xl font-bold mb-2 text-center mt-4">{story.title}</p>
                </CardTitle>
                <CardDescription className="text-gray-700 px-4">
                    {story.description}
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center mt-4">
                <Link href={`/stories/${story.id}`}>
                    <Button>Read More</Button>
                </Link>
            </CardFooter>
            </Card>
        ))}
        </div>
    </section>
  )
}

export default FeaturedStory