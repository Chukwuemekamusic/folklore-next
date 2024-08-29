import Image from "next/image";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { legends } from "@/constants";
import Link from "next/link";

export default function PopularCategory() {
  return (
    <section
      className="container mx-auto mt-10"
      suppressHydrationWarning={true}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Popular Stories</h1>
      <div className="header-line mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {legends.map((legend) => (
          <Card
            key={legend.name}
            className="max-w-sm mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 hover:cursor-pointer"
          >
            {/* TODO: Add the link to the legend page href={`/legends/${legend.name}`} */}
            <CardHeader>
              <Link href="#">
                <CardTitle>
                  <Image
                    src={legend.image}
                    alt={legend.name}
                    className="w-full h-48 object-cover"
                    width={100}
                    height={100}
                  />
                  <p className="text-xl font-bold mb-2 text-center">
                    {legend.name}
                  </p>
                </CardTitle>
              </Link>
              <CardDescription
                className="text-gray-700 px-4
            mb-4"
              >
                {legend.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
