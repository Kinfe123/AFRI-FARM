import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { NextApiRequest } from "next";
export async function GET(request : NextApiRequest) {
  console.log("Being fired make sense")
  const { userId, getToken } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const token = await getToken({ template: "supabase" });
  // Fetch data from Supabase and return it.
  const data = { supabaseData: "Hello World" };
  return NextResponse.json({ data });
}
