"use client";

// import { useActionState } from 'react'
import { useFormState } from 'react-dom'
import { createStoryAction } from "@/actions/createService";
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
import { Atom, Trash } from "lucide-react";
import { UploadDropzone } from "@/lib/UploadthingComponent";
import Image from "next/image";
import { toast } from "sonner";
import TailwindEditor from "../EditorWrapper";
import { JSONContent } from "novel";

// import { useFormState } from 'react-dom'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { createStorySchema } from '@/lib/zodSchemas'

import { SubmissionResult } from '@conform-to/react';
type ActionResult = SubmissionResult<string[]> | undefined

interface Legend {
    id: string;
    name: string;
  }
  
  interface ContinentWithLegends {
    id: string;
    name: string;
    legends: Legend[];
  }
  
//   interface ContinentsWithLegendsData {
//     continents: ContinentWithLegends[];
//   }

// #TODO CREATE OPTION TO CREATE NEW LEGEND
export default function CreateStoryForm2({
  continentData,
}: {
  continentData: ContinentWithLegends[];
}) {
  const [selectedContinent, setSelectedContinent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<JSONContent | undefined>(undefined)
//   const [lastResult, action] = useActionState(createStoryAction, undefined)
  const [lastResult, action] = useFormState(createStoryAction, undefined)

  const [form, fields] = useForm({
    lastResult: lastResult as ActionResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createStorySchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

//   let {title, description, slug} = fields

  return (
    <form className="flex flex-col gap-6"
    
    >
      <div className="flex flex-col gap-2">
        <Label>Title</Label>
        <Input placeholder="Your story title"
        key={fields.title.value}
        name={fields.title.name}
        defaultValue={fields.title.initialValue}
        value={fields.title.value}
        
        />
        {fields.title.errors?.map((error) => (
            <p key={error} className="text-sm text-destructive">{error}</p>
        ))}
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
            {continentData.map((continent) => (
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
              {continentData
                .find((c) => c.name === selectedContinent)
                ?.legends.map((legend) => (
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
  );
}
