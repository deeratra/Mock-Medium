import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt";
// import { postSchema, userSchema } from "@deer21/medium-common"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
    }
}>()

userRouter.post('/signup', async (c) => {
    const body = await c.req.json()
    // const { success } = userSchema.safeParse(body)
    // if (!success) {
    //     c.status(411)
    //     return c.json({
    //         message: "Incorrect Inputs"
    //     })
    // }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // const body = await c.req.json()
    const user = await prisma.user.create({
        data: {
            email: body.email,
            password: body.password,
        }
    })
    const token = await sign({
        id: user.id
    }, "secret")
    return await c.json({
        jwt: token
    })
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password,
        }
    })

    if (!user) {
        c.status(403)
        return c.json({ error: "User not Found" })
    }

    const jwt = await sign({ id: user.id }, 'secret');
    return c.json({ jwt });
})