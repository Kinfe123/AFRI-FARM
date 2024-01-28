import { prisma } from "@/lib/db";
import { RequiredKeys } from "@prisma/client/runtime/library";
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
    const { title, description, date, authorId, time, endTime, completed } =
      body;

    console.log("THe body is:", body);

    const schedule = await prisma.schedule.create({
      data: {
        authorId: authorId,
        date: date,
        time: time,
        endTime: endTime,
        description: description,
        title: title,
        completed: completed,
      },
    });

    console.log("tHE SCHIDULED one: ", schedule);

    return new Response(JSON.stringify(schedule));
  } catch (err) {
    console.log("Error has occured while scheduling... ,", err);
    return new Response("Error has occured", { status: 404 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id, status } = body;

    
    const res = await prisma.schedule.update({
      where: {
        id: id,
      },
      data: {
        completed: !status,
      },
    });

    return new Response(JSON.stringify(res));
  } catch (err) {
    return new Response("Error has occured while patching the request", {
      status: 404,
    });
  }
}
