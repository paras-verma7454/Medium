# Medium Clone Project

This is a clone of Medium, a blogging platform, built using modern web technologies such as React, Hono, JSON Web Token (JWT), Cloudflare Workers, Serverless backend, and TypeScript. The project allows users to sign up, log in, write, publish, and read blogs. The application is designed to be scalable and fast, leveraging serverless architecture.

## Features

- **Authentication**: Users can sign up and log in using JWT-based authentication.
- **Publish Blogs**: Authenticated users can publish their blogs.
- **Read Blogs**: Anyone can browse and read published blogs.
- **Blog Details**: Each blog is assigned a unique UUID for easy reference.
- **Serverless Architecture**: The backend is serverless, built using Cloudflare Workers for efficient and scalable deployment.
- **Custom NPM Library**: A custom NPM library for shared validation logic using Zod.

## Project Structure

The repository is divided into three main folders:

### 1. **Backend**
   - Contains the server-side code that handles blog fetching, user authentication, blog publishing, PostgreSQL,Prisma ORM and other backend logic.
   - Powered by [Hono](https://hono.dev/), a fast and lightweight web framework for Cloudflare Workers.
   - Uses JWT for secure authentication.

### 2. **Frontend**
   - Built using React for dynamic rendering and responsive user interfaces.
   - Provides pages for reading blogs, publishing blogs, signing in, and signing up.
   - Connects to the backend for CRUD operations related to blogs and authentication.

### 3. **Common**
   - Shared code between the frontend and backend, including the Zod validation schemas.
   - The validation schemas ensure the data consistency across the client and server.

## Pages

### 1. **Sign Up**
   - Users can create a new account.

     
     ![image](https://github.com/user-attachments/assets/0442572b-75f0-43f2-94eb-742ef1622272)


### 2. **Sign In**
   - Users can log in to their existing account .

     
     ![image](https://github.com/user-attachments/assets/0ad56f54-096f-4d29-b197-0432dec43cc4)


### 3. **Blogs Page**
   - Displays a list of all published blogs.
   - Each blog is identified by a unique UUID.

     ![image](https://github.com/user-attachments/assets/c2851ed6-f436-4847-a3d6-1d2f2638c515)


### 4. **Publish Page**
   - Authenticated users can create and publish new blogs.

     ![image](https://github.com/user-attachments/assets/15506549-bdba-450f-9329-7a818e5ce367)


### 5. **Blog Detail Page**
   - Displays the full content of a specific blog post.

     ![image](https://github.com/user-attachments/assets/3ce6ff82-a676-40e0-94c8-1d578189e527)


## Technologies Used

- **Frontend**: React, TypeScript
- **Backend**: Hono (for Cloudflare Workers), TypeScript, JSON Web Tokens (JWT)
- **Serverless**: Cloudflare Workers
- **Database**: PostgreSQL
- **ORM**: Prisma ORM
- **Validation**: Zod (used in both frontend and backend)
- **Custom NPM Library**: Created for Zod validation logic

## NPM Package

The project includes a custom [NPM package](https://www.npmjs.com/package/@paras_verma/medium-common) that contains Zod validation logic shared between the frontend and backend. This ensures that both sides of the application enforce the same validation rules, reducing duplication and maintaining consistency.
