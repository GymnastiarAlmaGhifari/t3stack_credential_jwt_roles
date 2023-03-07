# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## Installation
this make t3stack project by installing next-auth yourself, this is used to avoid errors

- npm create t3-app@latest without next-auth
- cd "your project"
- npm i --save-dev @types/bcryptjs
- npm i next-auth
- npm install next-auth @prisma/client @next-auth/prisma-adapter
- before you push database, change schema prisma like my mine
- "npx prisma db push" in your project
- add in .env 
    # NEXTAUTH_URL=http://localhost:3000
    #NEXTAUTH_SECRET= command in your pc "openssl rand -base64 32" and take in here
- change your env.mjs like mine
- make folder inside api = auth/[...nextauth].ts  and change like my mine
- add folder middleware to control token user whos loggin role
- if you want to add the user open your postman
  1. change your file to json
  2. http://localhost:3000/api/register
  3.{
    "email" : "admin@gmail.com",
    "name": "admin",
    "password": "123123",
    "role" : "ADMIN"
    }
  4. post
- you can login with many roles you want to add
- end
