// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Define your collection(s)
const projectCollection = defineCollection({
    schema: z.object({
        draft: z.boolean(),
        title: z.string(),
        snippet: z.string(),
        image: z.object({
            src: z.string(),
            alt: z.string(),
        }),
        publishDate: z.string().transform((str) => new Date(str)),
        author: z.string().default("Chance Software LLC"),
        category: z.string(),
        tags: z.array(z.string()),
        homepage: z.string().default("/"),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
    projects: projectCollection,
};
