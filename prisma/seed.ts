import { Gender} from "@prisma/client";
import { continents, legends } from "../constants";
import prisma from "../lib/db";


const users = [
  {
    name: "Alice",
    email: "alice@example.com",
    gender: "FEMALE" as Gender,
    isWriter: true,
    isAdmin: true,
  },
  {
    name: "Bob",
    email: "bob@example.com",
    gender: "MALE" as Gender,
    isWriter: false,
    isAdmin: false,
  },
  {
    name: "Charlie",
    email: "charlie@example.com",
    gender: "MALE" as Gender,
    isWriter: true,
    isAdmin: false,
  },
  {
    name: "Diana",
    email: "diana@example.com",
    isWriter: false,
    isAdmin: true,
  },
];

async function main() {
  await prisma.continent.createMany({ data: continents });
  console.log("Continents created");

  await prisma.legend.createMany({ data: legends });
  console.log("Legends created");

  await prisma.user.createMany({ data: users });
  console.log("Users created");
}

main()
  .catch((e) => {
    console.error(e);
    // process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



// const stories = [
//     {
//       title: "The Enchanted Forest",
//       description: "A magical forest full of wonders",
//       image: "forest.jpg",
//       continentId: prisma.continent.findFirst({ where: { name: "Africa" } }).then((continent) => continent?.id) || '',
//       legendId: legendNorse()?.id || '',
//       authorId: prisma.user.findFirst({ where: { name: "Charlie" } }).then((user) => user?.id) || '',
//       views: 100,
//       tags: [{ name: "Fantasy" }, { name: "Adventure" }],
//       comments: [{ comment: "Great story!" }],
//       status: "PUBLISHED" as StoryStatus,
//       homepage: true,
//       homepagePosition: 1,
//       published: true,
//       publishedAt: new Date(),
//     },
    // {
    //   title: "The Lost Kingdom",
    //   description: "An ancient kingdom waiting to be discovered",
    //   image: "kingdom.jpg",
    //   continentId: prisma.continent.findFirst({ where: { name: "Africa" } }).then((continent) => continent?.id || ""),
    //   legendId: prisma.legend.findFirst({ where: { name: "Norse legends" } }).then((legend) => legend?.id || ""),
    //   authorId: prisma.user.findFirst({ where: { name: "Alice" } }).then((user) => user?.id || ""),
    //   views: 50,
    //   tags: [{ name: "History" }, { name: "Exploration" }], 
    //   comments: [{ comment: "Interesting plot!" }],
    //   status: "DRAFT" as StoryStatus,
    //   homepage: false,
    //   published: false,
    //   publishedAt: new Date(),
    // },
  // ];
  
  // await prisma.story.createMany({ data: stories });
  // console.log("Stories created");
