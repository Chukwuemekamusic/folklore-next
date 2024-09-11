import { z } from "zod";

export const createStorySchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(200),
  legendId: z.string().min(1).max(100),
  image: z.string().optional(),
  content: z.string().min(1),
  continentName: z.string().min(1),
  slug: z.string().min(1).max(100),
  status: z.string().min(1).max(100).optional(),
  tags: z.string().refine(
    (value) => value.split(",").length <= 5, {
    message: "You can add up to 5 tags only.",
  })
});

export type TcreateStorySchema = z.infer<typeof createStorySchema>;