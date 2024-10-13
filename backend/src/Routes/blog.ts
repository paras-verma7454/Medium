import { createBlogInput, updateBlogInput } from "@paras_verma/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
        user:string;
    }
}>();


blogRouter.use("/*", async (c,next)=>{

    const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ message: "unauthorized" });
	}
	// const token = jwt.split(' ')[1];
	const user = await verify(jwt, c.env.JWT_SECRET);
	if (!user) {
		c.status(401);
		return c.json({ message: "unauthorized" });
	}
	c.set('userId', String(user.id));
	await next();
})

blogRouter.post("/", async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const {success}= createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
        message:"Incorrect inputs"
        })
    }

    const userId = c.get('userId');
    try{
        const post = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: userId
        }
       
    })
    return c.json({
        id: post.id
    })
    }
    catch (err) {
        return c.json({ message: "error" });
    }
    

    
})

blogRouter.put("/", async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const {success}= updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
        message:"Incorrect inputs"
        })
    }

    const post = await prisma.post.update({
        where:{
            id: body.id,
        },
        data:{
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: post.id
    })
})

blogRouter.get('/id/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const blog = await prisma.post.findUnique({
		where: {
			id
		},
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }
	});

	return c.json({blog});
})

blogRouter.get("/bulk", async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

    return c.json({blog})

})
