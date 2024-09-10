import { StoryStatus } from "@prisma/client";

export const legends = [
    {
      name: "Greek Myths",
      description: "Explore the world of Greek gods, heroes, and monsters through these captivating tales from ancient mythology.",
      image: "/img/Zeus.jpg",
    },
    {
      name: "Norse legends",
      description: "Discover the stories of the mighty gods, fierce warriors, and fantastical creatures of Norse mythology.",
      image: "/img/norse.jpg",
    },
    {
      name: "African Folklore",
      description: "Journey through the rich cultural heritage of Africa with these vibrant tales passed down from generation to generation.",
      image: "/img/atahualpa.jpg",
    },
    {
      name: "South American Myths",
      description: "Delve into the mystical world of South American mythology, featuring powerful deities, legendary heroes, and magical creatures.",
      image: "/img/atahualpa.jpg",
    },
    {
      name: "Asian Ghost Stories",
      description: "Experience the spine-chilling thrill of Asian ghost stories, filled with vengeful spirits, haunted places, and ancient curses.",
      image: "/img/asian.png",
    },
    {
      name: "Roman Mythology",
      description: "Discover the captivating tales of Roman mythology, filled with powerful gods and goddesses, epic battles, and thrilling adventures that will transport you to ancient times.",
      image: "/img/rome.jpg",
    },
  ];



  export const continents = [
    {
        name: "Africa",
        description: "Known as the cradle of civilization, Africa is a continent steeped in ancient myths and legends. From the powerful deities of Egyptian mythology to the shape-shifting spirits of West African folklore, Africa’s tales are as diverse as its people.",
        population: 1216000, // Example population
        area: 30370 // Example area in square kilometers
    },
    {
        name: "Antarctica",
        description: "A land of ice and mystery, Antarctica is a continent like no other. With its starkly beautiful landscapes and harsh climate, it is a place where only the most intrepid explorers dare to venture. But beneath the surface of this frozen world, there are secrets waiting to be uncovered - stories of lost civilizations, hidden treasures, and ancient legends that have yet to be fully discovered.",
        population: 1000, // Example population (scientific research stations)
        area: 14000000 // Example area in square kilometers
    },
    {
        name: "Australia",
        description: "A land of natural wonders and ancient tales, Australia is a continent of diverse landscapes and vibrant cultures. From the dreamtime stories of the indigenous peoples to the modern tales of adventure and discovery, Australia is a place where myths and legends come to life.",
        population: 25600, // Example population
        area: 7692 // Example area in square kilometers
    },
    {
        name: "Asia",
        description: "From the majestic mountains of the Himalayas to the bustling cities of Tokyo and Mumbai, Asia is a continent of contrasts. It is also home to some of the world’s most enduring myths and legends, such as the ancient Chinese tale of the Monkey King and the Hindu epic, the Ramayana.",
        population: 4600000, // Example population
        area: 44579 // Example area in square kilometers
    },
    {
        name: "Europe",
        description: "The birthplace of Western civilization, Europe has a rich history of myth and legend. From the heroic exploits of Greek gods and heroes to the mystical legends of Arthurian England, Europe’s myths and legends have inspired artists and storytellers for centuries.",
        population: 747000, // Example population
        area: 10180 // Example area in square kilometers
    },
    {
        name: "North America",
        description: "From the thundering waterfalls of Niagara to the barren deserts of the Southwest, North America is a land of diverse landscapes and cultures. It is also home to a rich tradition of myths and legends, from the shape-shifting tricksters of Native American folklore to the chilling ghost stories of colonial New England.",
        population: 579000, // Example population
        area: 24709 // Example area in square kilometers
    },
    {
        name: "South America",
        description: "From the ancient ruins of Machu Picchu to the vibrant streets of Rio de Janeiro, South America is a continent of incredible diversity and beauty. Its myths and legends reflect this diversity, ranging from the shape-shifting spirits of the Amazon rainforest to the epic tales of the Inca Empire.",
        population: 430000, // Example population
        area: 17840 // Example area in square kilometers
    }
];
// enum StoryStatus {
//   DRAFT
//   PUBLISHED
//   UNLISTED
// }
export const storyStatusTyped: Array<{ name: StoryStatus; description: string }> = [
    {
        name: StoryStatus.DRAFT,
        description: "Draft",
    },
    {
        name: StoryStatus.PUBLISHED,
        description: "Published",
    },
    {
        name: StoryStatus.UNLISTED,
        description: "Unlisted",
    },
]

export const storyStatus = [
  {
      name: "DRAFT", 
      description: "Draft",
  },
  {
      name: "PUBLISHED", 
      description: "Published",
  },
  {
      name: "UNLISTED", 
      description: "Unlisted",
  },
] as const;

