import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {getAllContinentsWithLegends} from "@/actions/storyService"
import CreateStoryForm from "@/components/Dashboard/Create/CreateForm";


//   export async function checkLegends() {
//     const legends = await prisma.legend.findMany({
//       include: {
//         continent: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },
//       },
//     });
//     console.log('All legends:', JSON.stringify(legends, null, 2));
//     return legends;
//   }


export default async function CreateStoryPage() {
    const continents = await getAllContinentsWithLegends();
  
    // console.log('relations',continents[3].legends)

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
          {/* <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input placeholder="Your story title" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Textarea placeholder="short description of your story to be displayed in the story list" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Slug</Label>
              <Input placeholder="The slug is used to generate the URL of your story and must be unique." />
              <Button className="w-fit" variant='secondary' type="button">
                <Atom className="size-4 mr-2 " /> Generate slug</Button>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Continent</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a continent" />
                </SelectTrigger>
                <SelectContent>
                  {continents.map((continent) => (
                    <SelectItem key={continent.name} value={continent.name}>
                      {continent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex flex-col gap-2">
                <Label>Cover Image</Label>
                <UploadDropzone endpoint="imageUploader" />
              </div>
            </div>
          </form> */}
          <CreateStoryForm continentData={continents} />
        </CardContent>
      </Card>
    </>
  );
}