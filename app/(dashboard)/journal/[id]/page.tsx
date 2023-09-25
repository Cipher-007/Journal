import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

async function getEntry(id: string) {
  const user = await getUserByClerkId();

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
    select: {
      id: true,
      content: true,
      analysis: true,
    },
  });
  return entry;
}

export default async function EntryPage({
  params,
}: {
  params: { id: string };
}) {
  const entry = await getEntry(params.id);
  if (entry !== null) {
    return (
      <div className='h-[90%] w-full'>
        <Editor
          entry={{
            id: entry.id,
            content: entry.content,
            analysis: entry.analysis!,
          }}
        />
      </div>
    );
  }
}
