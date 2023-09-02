import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest , res:NextResponse) {
    console.log("The request objec: " , req.body)
    return NextResponse.json({"message": "It is working"})


}