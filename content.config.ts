import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
    collections: {
        projects: defineCollection({
            type: 'page',
            source: 'projects/*.md',
            schema: z.object({
                title: z.string(),
                description: z.string().optional(),
                feature: z.number().optional(),
                tech: z.array(z.string()).default([]),
                links: z.record(z.string(), z.string()).default({}),
                images: z
                    .array(
                        z.object({
                            src: z.string(),
                            desc: z.string(),
                        }),
                    )
                    .optional(),
            }),
        }),
    },
});
