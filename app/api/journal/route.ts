import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const defaultAnalysis = {
  color: "#00ff00",
  summary: "Productive and enjoyable day with friends and family.",
  subject: "My Day",
  mood: "happy",
  negative: false,
  sentimentScore: 8.5,
} as const;

export async function POST(req: Request) {
  const { content }: { content: string } = await req.json();
  const { id } = await getUserByClerkId();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: id,
      content: content,
      analysis: {
        create: {
          ...defaultAnalysis,
          userId: id,
        },
      },
    },
  });

  revalidatePath("/journal");
  return NextResponse.json(entry);
}
