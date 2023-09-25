import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { content }: { content: string } = await req.json();

  const { id } = await getUserByClerkId();

  const analysis = await analyze(content);

  if (analysis) {
    const updatedEntry = await prisma.journalEntry.update({
      where: {
        userId_id: {
          userId: id,
          id: params.id,
        },
      },
      data: {
        content: content,
        analysis: {
          update: {
            ...analysis,
          },
        },
      },
      include: {
        analysis: true,
      },
    });

    return NextResponse.json({
      data: { ...updatedEntry },
    });
  }

  return NextResponse.json({ error: "Updating entry failed" }, { status: 500 });
}
