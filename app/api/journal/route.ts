import { analyze } from "@/utils/ai";
import { getUserByClerkId, keyfetch } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: data.content,
    },
  });
  const key = await keyfetch();
  process.env.OPENAI_API_KEY = key;
  const analysis = await analyze(entry.content);

  if (analysis) {
    await prisma.analysis.create({
      data: {
        userId: user.id,
        entryId: entry.id,
        color: analysis.color,
        mood: analysis.mood,
        negative: analysis.negative,
        subject: analysis.subject,
        summary: analysis.summary,
        sentimentScore: analysis.sentimentScore,
      },
    });
  }

  revalidatePath("/journal");
  return NextResponse.json({ data: entry });
}
