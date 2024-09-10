import { requireUser } from "@/lib/requireUser";
import { getUniqueImageLinksByUser } from "@/actions/storyService";
import Image from "next/image";
import ImageDisplay from "@/components/Dashboard/ImageDisplay";


export default async function ImagesPage() {
  const user = await requireUser();
  const imagesAll = await getUniqueImageLinksByUser(user.id);
  const images = imagesAll.filter(image => image !== null) as string[];

  if (images.length === 0 || !images) {
    return <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">No images found</h1>
    </div>
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Images you have used</h1>
      <p className="text-sm text-gray-500">These are the images you have used in your stories. You can use them again in your stories.</p>
      {/* <div className="flex flex-wrap gap-4">
      {images.filter(image => image !== null).map((image) => (
        <div key={image} className="flex flex-col items-center justify-center">
          <Image  src={image!} alt="Image" width={100} height={100} className="rounded-md" />
          <p>{image}</p>
        </div>
        ))}
      </div> */}
      <ImageDisplay images={images} />
    </div>
  );
}