import Image from 'next/image'; // Import Next.js Image component
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselContent,
} from "@/components/ui/carousel" // Adjust import based on your actual path

import { Card, CardContent } from "@/components/ui/card"

const carouselImages = [
  {
    src: '/img/library_black&white.jpg',
    alt: 'Black and white library'
  },
  {
    src: '/img/library2.jpg',
    alt: 'Second library image'
  },
  {
    src: '/img/Temple-of-Artemis-Ephesus-POI-7-wonders-ancient.png',
    alt: 'Temple of Artemis at Ephesus'
  },
  {
    src: '/img/library.jpg',
    alt: 'Third library image'
  }
];


export default function CarouselImage() {
  return (
    <section className="container mx-auto">
    <div className="carousel-wrapper"> {/* Added wrapper for styling */}
    <Carousel className="w-full h-full">
      <CarouselContent>
        {carouselImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-64 overflow-hidden"> {/* Set height and overflow */}
              <Image src={image.src} alt={image.alt} fill className="object-cover"/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 z-10" />
      <CarouselNext className="absolute right-0 z-10" />
    </Carousel>

    </div>

    <div className="text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 bg-custom d-none d-lg-block py-3 px-0 mb-7">
            <h1 className="text-2xl font-bold">Explore the World's Myth and Legends</h1>
            <div className="border-t border-primary w-full max-w-md mx-auto  mt-2"></div>
            <p className="leading-tight">Discover stories from different cultures and traditions</p>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}