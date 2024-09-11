"use client";

// import { useActionState } from 'react'
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Atom, Loader2, Trash } from "lucide-react";
import { UploadDropzone } from "@/lib/UploadthingComponent";
import Image from "next/image";
import { toast } from "sonner";
import TailwindEditor from "../EditorWrapper";
import { JSONContent } from "novel";

// import { useFormState } from 'react-dom'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { parseWithZod } from '@conform-to/zod'
import { createStorySchema, TcreateStorySchema } from "@/lib/zodSchemas";
import axios from "axios";
import slugify from "react-slugify";
import { useRouter } from "next/navigation";
import { storyStatus } from "@/constants";

interface Legend {
  id: string;
  name: string;
}

interface ContinentWithLegends {
  id: string;
  name: string;
  legends: Legend[];
}

// Define the Story interface
interface StoryType {
    id: string;
    title: string;
    description: string;
    content: any;
    image: string | null;
    slug: string | null;
    views: number;
    rating: number;
    status: string;
    continent: {
      id: string;
      name: string;
    };
    legend: {
      id: string;
      name: string;
    };
    tags: {
      id: string;
      name: string;
    }[];
    author: {
      id: string;
      name: string | null;
      email: string;
    };
    createdAt: Date;
    updatedAt: Date;
  }
  

interface EditArticleFormProps {    
  continentData: ContinentWithLegends[];
  story: StoryType;
}


export default function EditArticleForm2({
  story,
  continentData,
}: EditArticleFormProps
) {
  const [selectedContinent, setSelectedContinent] = useState(story.continent.name);
  const [selectedLegend, setSelectedLegend] = useState(story.legend.id);
  const [imageUrl, setImageUrl] = useState<string | null | undefined>(story.image);
  const [contentValue, setContentValue] = useState<JSONContent | undefined>(story.content);
  const [title, setTitle] = useState<string | undefined>(story.title);
  const [slug, setSlug] = useState<string |null | undefined>(story.slug);
  const [slugStatusLoading, setSlugStatusLoading] = useState<boolean>(false);
  const router = useRouter();
  const tags = story.tags.map((tag) => tag.name).join(', ');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setError,
    setValue,

  } = useForm({
    resolver: zodResolver(createStorySchema),
    defaultValues: {
      title: story.title,
      description: story.description,
      slug: story.slug || "",
      continentName: story.continent.name,
      legendId: story.legend.id,
      content: JSON.stringify(story.content),
      image: story.image || "",
      status: story.status,
      tags: tags,
    },
  });

  const checkSlugUniqueness = async (initialSlug: string) => {
    let slug = initialSlug;
    let isUnique = false;
    let counter = 1;

    while (!isUnique) {
      try {
        const response = await axios.get(`/api/checkSlug?slug=${slug}`);
        if (response.data.exists) {
          // If the slug exists, modify it
          slug = `${initialSlug}-${counter}`;
          counter++;
        } else {
          isUnique = true; // Slug is unique
        }
      } catch (error) {
        console.error("Error checking slug uniqueness:", error);
        throw new Error("Error checking slug uniqueness");
      }
    }

    return slug;
  };



  const onSubmit = async (data: TcreateStorySchema) => {
    console.log('entered onSubmit')
    if (imageUrl) {
      data.image = imageUrl;
    }
    data.content = JSON.stringify(contentValue);
    console.log("data", data);

    data.slug = await checkSlugUniqueness(data.slug);

    try {
      const response = await axios.put(`/api/editStory/${story.id}?authorId=${story.author.id}`, data);
      toast.success(response.data.message);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      // Check if the error is an Axios error
      if (axios.isAxiosError(error) && error.response) {
        const errors = error.response.data.error || {};
        if (error.response.status === 403) {
            toast.error("You are not authorized to edit this story");
          } else {
        Object.keys(errors).forEach((key) => {
          setError(key as keyof TcreateStorySchema, { message: errors[key] });
          });
        }
      } else {
        toast.error("Error creating story");
      }
    }
  };

  const generateSlug = async () => {
    if (
      !title ||
      title.length === 0 ||
      title.trim() === "" ||
      title === undefined
    ) {
      return toast.error("Please enter a title");
    }
    setSlugStatusLoading(true);
    let slug = slugify(title);
    let isUnique = false;
    let counter = 1;

    // Check for uniqueness
    while (!isUnique) {
      try {
        const response = await axios.get(`/api/checkSlug?slug=${slug}`);
        if (response.data.exists) {
          // If the slug exists, modify it
          slug = `${slug}-${counter}`;
          counter++;
        } else {
          isUnique = true; // Slug is unique
        }
      } catch (error) {
        console.error("Error checking slug uniqueness:", error);
        setSlugStatusLoading(false);
        return toast.error("Error checking slug uniqueness");
      }
    }

    setSlug(slug);
    setValue("slug", slug);
    setSlugStatusLoading(false);
    return toast.success("Slug generated successfully");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <Label>Title</Label>
        <Input
          placeholder="Your story title"
          {...register("title")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>
      {/* Description */}
      <div className="flex flex-col gap-2">
        <Label>Description</Label>
        <Textarea
          placeholder="short description of your story to be displayed in the story list"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>
      {/* Slug */}
      <div className="flex flex-col gap-2">
        <Label>Slug</Label>
        <Input
          placeholder="The slug is used to generate the URL of your story and must be unique."
          {...register("slug")}
          value={slug || ""}
          onChange={(e) => setSlug(e.target.value)}
          readOnly
        />
        <Button
          disabled={slugStatusLoading}
          onClick={generateSlug}
          className="w-fit"
          variant="secondary"
          type="button"
        >
          <Atom className="size-4 mr-2 " /> Generate slug
        </Button>
        {errors.slug && (
          <p className="text-sm text-destructive">{errors.slug.message}</p>
        )}
      </div>
      {/* Continent */}
      <div className="flex flex-col gap-2">
        <Label>Continent</Label>
        <Controller
          control={control}
          name="continentName"
          render={({ field }) => (
            <Select
                value={field.value}
              onValueChange={(value) => {
                setSelectedContinent(value);
                field.onChange(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a continent" />
              </SelectTrigger>
              <SelectContent>
                {continentData.map((continent) => (
                  <SelectItem key={continent.name} value={continent.name}>
                    {continent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.continentName && (
          <p className="text-sm text-destructive">
            {errors.continentName.message}
          </p>
        )}
      </div>
      {/* Legend */}
      {selectedContinent && (
        <div className="flex flex-col gap-2">
          <Label>Legend</Label>
          <Controller
            control={control}
            name="legendId"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  setSelectedLegend(value);
                  field.onChange(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a legend" />
                </SelectTrigger>
                <SelectContent>
                  {continentData
                    .find((c) => c.name === selectedContinent)
                    ?.legends.map((legend) => (
                      <SelectItem key={legend.id} value={legend.id}>
                        {legend.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.legendId && (
            <p className="text-sm text-destructive">
              {errors.legendId.message}
            </p>
          )}
        </div>
      )}
      {/* Cover Image */}
      <div className="flex flex-col gap-2 mb-2">
        <Label>Cover Image</Label>
        {/* {imageUrl && <Image src={imageUrl} alt="Cover Image" />} */}
        {imageUrl ? (
          <div className="relative w-full h-40 mb-2">
            <Image
              src={imageUrl}
              alt="Cover Image"
              className="object-contain w-[200px] h-[200px]"
              width={200}
              height={200}
            />
            <Button
              className="absolute top-0 right-0"
              variant="destructive"
              size="icon"
              onClick={() => setImageUrl(undefined)}
            >
              <Trash className="size-4" />
            </Button>
          </div>
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              toast.success("Image uploaded successfully");
            }}
            onUploadError={(error) => {
              console.log(error);
              toast.error("Error uploading image..");
            }}
          />
        )}
        {errors.image && (
          <p className="text-sm text-destructive">{errors.image.message}</p>
        )}
      </div>
      {/* Story Content */}
      <div className="flex flex-col gap-2">
        <Label>Story Content</Label>
        <p className="text-sm text-muted-foreground">
          Use the editor to write your story. Type / to see available commands.
        </p>
        {/* TODO: fix controller and register('content) */}
        <input
          type="hidden"
          value={JSON.stringify(contentValue)}
          {...register("content")}
        />
        <TailwindEditor initialValue={contentValue} onChange={setContentValue} />
      </div>
      {/* Story Status */}
      <div className="flex flex-col gap-2">
        <Label>Story Status</Label>
        <p className="text-sm text-muted-foreground">
          Select if you want to publish your story or save it as a draft.
        </p>
        <Controller
          control={control}
          name="status" // Register the status field
          render={({ field }) => (
            <Select
              onValueChange={field.onChange} // Update form state on change
              value={field.value} // Set the current value
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {storyStatus.map((status) => (
                  <SelectItem key={status.name} value={status.name}>
                    {status.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <p className="text-sm text-destructive">{errors.status.message}</p>
        )}
      </div>
      {/* Tags */}
      <div className="flex flex-col gap-2">
        <Label>Tags</Label>
        <Input
          placeholder="Enter tags separated by commas"
          {...register("tags")}
        />
        {errors.tags && (
          <p className="text-sm text-destructive">{errors.tags.message}</p>
        )}
      </div>
      {/* Submit Button */}
      {isSubmitting ? (
        <Button type="submit"  className="w-fit"><Loader2 className="size-4 mr-2 animate-spin" />Update Story</Button>
      ) : (
        <Button type="submit"  className="w-fit">Update Story</Button>
      )}
    </form>
  );
}
