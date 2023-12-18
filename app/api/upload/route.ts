import { getServerSession } from "next-auth/next";
import * as z from "zod";

import { prisma } from "@/lib/db";
import { receiveMessageOnPort } from "worker_threads";

const resumeCreateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  resumeLink: z.string(),
  portfolioLink: z.string(),
  jobType: z.string(),
  jobId: z.number(),
  referredFrom: z.string(),
  resumeUrl: z.string(),
});

export async function POST(req: Request) {
  try {
    // if(!session) {
    //     return new Response("Unauthorized" , {status:403})
    // const {user} = session
    const body = await req.json();
    console.log('THe body is : ' , body)

    if (!body) {
      return new Response("No body provided!", { status: 400 });
    }
    const upload = await prisma.resource.create({
      data: {
        authorId: body.authorId,
        FirstName: body.firstName,
        LastName: body.lastName,
        Email: body.email,
        type: body.type,
        description: body.description,
        resourceUrl: body.resourceUrl,
        Title: body.title,
        gradeLevel: body.grade,
        

      },
    });

    return new Response(JSON.stringify(upload));
  } catch (err) {
    console.log("The error has occurred again!", err);
  }
}

export async function GET(req: Request) {
  try {
    const res = await prisma.resource.findMany({});

    return new Response(JSON.stringify(res));
  } catch (err) {
    console.log("The error has occurred");
  }
}

