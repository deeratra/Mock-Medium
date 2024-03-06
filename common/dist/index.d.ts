import z from "zod";
export declare const userSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export type UserSchema = z.infer<typeof userSchema>;
export declare const createPostSchema: z.ZodObject<{
    tilte: z.ZodString;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tilte: string;
    content: string;
    published?: string | undefined;
}, {
    tilte: string;
    content: string;
    published?: string | undefined;
}>;
export type CreatePostSchema = z.infer<typeof createPostSchema>;
export declare const updatePostSchema: z.ZodObject<{
    id: z.ZodString;
    tilte: z.ZodString;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tilte: string;
    content: string;
    id: string;
    published?: string | undefined;
}, {
    tilte: string;
    content: string;
    id: string;
    published?: string | undefined;
}>;
export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
