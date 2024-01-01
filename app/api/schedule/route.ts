import { prisma } from "@/lib/db";
import { title } from "process";
import * as z from "zod";

const scheduleSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  authorId: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return new Response("No body provided", { status: 404 });
    }
    const { title, description, date, authorId, time } = body;

    const schedule = await prisma.schedule.create({
      data: {
        authorId: authorId,
        date: date,
        time: time,
        description: description,
        title: title

      },
    });

    return new Response(JSON.stringify(schedule));
  } catch (err) {
    console.log("Error has occured while scheduling...");
    return new Response("Error has occured", { status: 404 });
  }
}
