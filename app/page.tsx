import Image from "next/image"; 
import CarouselImage from "@/components/CarouselImage";
import FeaturedStory from "@/components/FeaturedStory";
import PopularCategory from "@/components/PopularCategory";

export default function Home() {
  return (
    <div >

      <CarouselImage />
      <FeaturedStory />
      <PopularCategory />
    </div>
  );
}
