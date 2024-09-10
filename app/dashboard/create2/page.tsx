import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {getAllContinentsWithLegends} from "@/actions/storyService"
import CreateStoryForm2 from "@/components/Dashboard/Create/CreateForm2";


export default async function CreateStoryPage2() {
    const continents = await getAllContinentsWithLegends();

  return (
    <>
      <div className="flex items-center mt-5">
        <Button variant="outline" size="icon" asChild>
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
          <CreateStoryForm2 continentData={continents} />
        </CardContent>
      </Card>
    </>
  );
}