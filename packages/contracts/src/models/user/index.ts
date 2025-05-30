//==========================================================
// Schema
//==========================================================

import z from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  role: z.enum(["admin", "moderator", "user"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

//==========================================================
// Create, Update DTOs
//==========================================================

export const createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  role: true,
});

export const updateUserSchema = userSchema.partial();
