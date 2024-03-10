import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify } from "hono/jwt"

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
    },
    Variables: {
        userId: string
    }
}>()

postRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("Authorization") || ""
    try {
        const user = await verify(authHeader.split(" ")[1], 'secret')
        if (user) {
            c.set("userId", user.id)
            await next()
        }
        else {
            c.status(403);
            return c.json({ message: "You are not Logged in" })
        }
    }
    catch (exception) {
        c.status(403)
        return c.json({
            message: "You are not logged in"
        })
    }

})

postRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const authorId = c.get("userId");
    const newPost = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: c.get("userId")
        }
    })
    return c.json({
        id: newPost.id
    })
})

postRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()

    const updatedPost = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: updatedPost.id
    })
})

postRouter.get('/bulk', async (c) => {
    console.log("g")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return c.json(posts)
})

postRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: c.req.param("id")
            },
            select: {
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if (post != null)
            return c.json({
                post
            })
    }
    catch (exception) {
        c.status(411)
        return c.json({
            message: "Error while fetching blog post"
        })
    }
})

