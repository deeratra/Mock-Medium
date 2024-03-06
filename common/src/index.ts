import z from "zod"

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
})

export type UserSchema = z.infer<typeof userSchema>


export const createPostSchema = z.object({
    tilte: z.string(),
    content: z.string(),
    published: z.string().optional()
})

export type CreatePostSchema = z.infer<typeof createPostSchema>


export const updatePostSchema = z.object({
    id: z.string(),
    tilte: z.string(),
    content: z.string(),
    published: z.string().optional()
})

export type UpdatePostSchema = z.infer<typeof updatePostSchema>