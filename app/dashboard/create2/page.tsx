"use client"

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {getAllContinentsWithLegends} from "@/actions/storyService"
import CreateStoryForm from "@/components/Dashboard/Create/CreateForm";
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
import { UploadDropzone } from "@/lib/UploadthingComponent";
import { toast } from "sonner";
import { Atom, Trash } from "lucide-react";
import Image from "next/image";
import TailwindEditor from "@/components/Dashboard/EditorWrapper";
import { JSONContent } from "novel";
import { useState } from "react";
import { createStoryAction } from "@/actions/createService";
import { useSearchParams } from "next/navigation";



interface Legend {
    id: string;
    name: string;
  }
  
  interface ContinentWithLegends {
    id: string;
    name: string;
    legends: Legend[];
  }

export default function CreateStoryPage2() {
    const searchParams = useSearchParams();
    const continentsParam = searchParams.get('continents');
    const continents = continentsParam ? JSON.parse(decodeURIComponent(continentsParam)) : [];

    const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [value, setValue] = useState<JSONContent | undefined>(undefined)
    const [lastResult, action] = useActionState(createStoryAction, undefined)
    // console.log('relations',continents[3].legends)

    if (!continents || continents.length === 0) {
        return <div>Loading...</div>
    }

  return (
    <>
      <div className="flex items-center mt-5">
        <Button variant="ghost" size="icon">
          <Link href="/dashboard">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Create Story</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Story Details</CardTitle>
          <CardDescription>Add a title, description, and choose a continent and legend for your story.</CardDescription>
        </CardHeader>
        <CardContent>
          
        <form className="flex flex-col gap-6"
    // id={form.id}
    // onSubmit={form.onSubmit}
    // action={action}
    >
      <div className="flex flex-col gap-2">
        <Label>Title</Label>
        <Input placeholder="Your story title"
        // key={fields.title.value}
        // name={fields.title.name}
        // defaultValue={fields.title.initialValue}
        // value={fields.title.value}
        
        />
        {/* {fields.title.errors?.map((error) => (
            <p className="text-sm text-de">{error}</p>
        ))} */}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Description</Label>
        <Textarea placeholder="short description of your story to be displayed in the story list" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Slug</Label>
        <Input placeholder="The slug is used to generate the URL of your story and must be unique." />
        <Button className="w-fit" variant="secondary" type="button">
          <Atom className="size-4 mr-2 " /> Generate slug
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Continent</Label>
        <Select onValueChange={(value) => setSelectedContinent(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a continent" />
          </SelectTrigger>
          <SelectContent>
            {continents.map((continent: ContinentWithLegends) => (
              <SelectItem key={continent.name} value={continent.name}>
                {continent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedContinent && (
        <div className="flex flex-col gap-2">
          <Label>Legend</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a legend" />
            </SelectTrigger>
            <SelectContent>
              {continents
                .find((c: ContinentWithLegends) => c.name === selectedContinent)
                ?.legends.map((legend: Legend) => (
                  <SelectItem key={legend.id} value={legend.id}>
                    {legend.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}


      <div className="flex flex-col gap-2 mb-2">
        <Label>Cover Image</Label>
        {/* {imageUrl && <Image src={imageUrl} alt="Cover Image" />} */}
        {imageUrl ? (
          <div className="relative w-full h-40 mb-2">
            <Image src={imageUrl} alt="Cover Image" className="object-contain w-[200px] h-[200px]" width={200} height={200} />
            <Button className="absolute top-0 right-0" variant="destructive" size="icon" onClick={() => setImageUrl(undefined)}><Trash className="size-4" /></Button>
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
      </div>
      <div className="flex flex-col gap-2">
        <Label>Story Content</Label>
        <p className="text-sm text-muted-foreground">Use the editor to write your story. Type / to see available commands.</p>
        <TailwindEditor initialValue={value} onChange={setValue} />
      </div>
      <Button type="submit">Create Story</Button>
    </form>   
        </CardContent>
      </Card>
    </>
  );
}