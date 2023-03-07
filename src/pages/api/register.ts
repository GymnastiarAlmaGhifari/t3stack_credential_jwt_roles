/**
 * First I not use the trpc because i lazy to make the frontend,
 * if you want use the trpc that is better than this
 *
 * or if you still want use the rest api with trpc no problem
 * you should install trpc-openapi
 *
 *
 *
 * and if you still use the rest api i make you have no problem
 *  * if you use this in frontend use the fetch api from axios or something else and i should you use the axios
 *
 * how to use this api
 * 1. open the postman
 * 2. set the method to POST
 * 3. set the url to http://localhost:3000/api/register
 * 4. set the body to raw and json
 * 5. set the body to
 * {
 * "name": "your name",
 * "email": "your email",
 * "password": "your password",
 * "role": "USER" or "ADMIN"
 * }
 * 6. send the request
 * 7. if you get the 201 status code that mean you success register
 */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password, role } = req.body;
  if (req.method === "POST") {
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: await bcrypt.hash(password, 10),
          role,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      // res error message $`{error}`
      res.status(500).json({ message: "Something went wrong", error });
    }
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
}
