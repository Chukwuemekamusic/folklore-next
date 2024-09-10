"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardFooter, CardHeader, CardContent } from "@/components/ui/card";

interface ImageDisplayProps {
    images: string[];
}

export default function ImageDisplay({ images }: ImageDisplayProps) {

    const copyToClipboard = async (image: string) => {
        console.log("Copying image URL:", image);
        await navigator.clipboard.writeText(image).then(() => {
            toast.success('Image URL copied to clipboard');
        }).catch((error) => {
            console.error('Failed to copy image URL:', error);
            toast.error(`Failed to copy image URL: ${error.message}`);
        });
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {images.map((image) => (
                <Card key={image} className="items-center justify-center">
                    <CardHeader>
                        <Image src={image} alt="Image" width={300} height={100} className="w-full  object-cover rounded-t-lg h-[150px]" />
                    </CardHeader>
                    <CardFooter>
                        <Button 
                        onClick={() => copyToClipboard(image)}
                        aria-label="Copy Image URL"
                        className="w-fit"
                        variant="secondary"
                    >
                        Copy Image URL
                    </Button>
                </CardFooter>
                </Card>
            ))}
        </div>
    );
}