import * as z from 'zod'

export const postSchema = z.object({
  title : z.string().min(5).toUpperCase(),
  content: z.string().min(10),
  author: z.string().min(10),
  status : z.number().min(1)
})

export const updatePostSchema = postSchema.partial()