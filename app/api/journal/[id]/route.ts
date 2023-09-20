import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { content } = await req.json();
  const user = await getUserByClerkId();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content: content,
    },
  });
  const analysis = await analyze(updatedEntry.content);
  let updatedAnalysis;
  if (analysis) {
    updatedAnalysis = await prisma.analysis.upsert({
      where: {
        entryId: updatedEntry.id,
      },
      create: {
        userId: user.id,
        entryId: updatedEntry.id,
        color: analysis.color,
        mood: analysis.mood,
        negative: analysis.negative,
        subject: analysis.subject,
        summary: analysis.summary,
        sentimentScore: analysis.sentimentScore,
      },
      update: analysis,
    });
  }

  return NextResponse.json({
    data: { ...updatedEntry, analysis: updatedAnalysis },
  });
}
