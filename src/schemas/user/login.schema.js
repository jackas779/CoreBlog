import z from 'zod'

export const login = z.object({
  username: z.string().min(10).toLowerCase().optional(),
  email: z.string().email().toLowerCase().optional(),
  password : z.string().nonempty().min(8).max(15)
}) 