import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    author:      z.string(),
    authorRole:  z.string().optional(),
    date:        z.string(),           // ISO date string
    category:    z.string(),
    readTime:    z.number(),           // minutes
    featured:    z.boolean().default(false),
    cover:       z.string().optional(), // path like /images/blog/cover-xyz.jpg
  }),
});

export const collections = { blog };
