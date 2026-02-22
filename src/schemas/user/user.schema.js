import * as z from 'zod'

// 1. Define el esquema base con todas las validaciones.
// Este será el esquema para la creación, donde todos los campos son requeridos.
export const user = z.object({
  username: z.string().toLowerCase().min(3),
  age: z.number().int().min(18),
  email: z.string().email().toLowerCase(),
  first_name: z.string().nonempty().toLowerCase(),
  last_name: z.string().nonempty().toLowerCase(),
  password: z.string().nonempty().min(8).max(15)
})

// 2. Crea el esquema de actualización usando .partial().
// Esto toma el esquema `user` y hace que todos sus campos sean opcionales.
export const userUpdate = user.partial()