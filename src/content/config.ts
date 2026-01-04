import { defineCollection, z } from 'astro:content'
import { docsSchema } from '@astrojs/starlight/schema'

export const collections = {
  docs: defineCollection({
    schema: docsSchema(),
  }),
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
    }),
  }),

  projects: defineCollection({
    schema: z.object({
      title: z.string(),
      category: z.string(),
      image: z.string(),
    }),
  }),
}
