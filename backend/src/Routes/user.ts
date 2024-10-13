import { signinInput, signupInput } from "@paras_verma/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


userRouter.post('/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const body = await c.req.json();

  const {success}=signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"Incorrect inputs"
    })
  }

  const email = body.email.toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
        email: email,
    },
  });

  if (existingUser) {
    c.status(400);
    return c.json({ message: "Email already taken" });
  }
  
  const user = await prisma.user.create({
    data: {
      email: email,
      name: body.name,
      password: body.password,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  
  return c.json({
    jwt: token
  })

})
  
userRouter.post('/signin', async (c) => {

  const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL	,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const {success}=signinInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"Incorrect inputs"
    })
  }

  const email = body.email.toLowerCase();

  const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: body.password
      }
  });

  if (!user) {
      c.status(403);
      return c.json({ message: "user not found / Incorrect Creds" });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt:token });

})