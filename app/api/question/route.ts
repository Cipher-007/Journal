import { qa } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question } = await req.json();
  const user = await getUserByClerkId();

  const entires = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });
  const answer = await qa(question, entires);

  return NextResponse.json({ data: answer });
}
