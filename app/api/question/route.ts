import { qa } from "@/utils/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question, entires } = await req.json();
  const answer = await qa(question, entires);

  if (answer) {
    return NextResponse.json({ data: answer });
  }

  return NextResponse.json({ error: "No answer found" }, { status: 500 });
}

export const runtime = "edge";
