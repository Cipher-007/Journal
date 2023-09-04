import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import Link from "next/link";

async function getEntries() {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      createdAt: true,
      analysis: {
        select: {
          summary: true,
          mood: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return entries;
}

export default async function JournalPage() {
  const entries = await getEntries();

  return (
    <div className='p-10 bg-zinc-400/10 h-full'>
      <h2 className='text-3xl mb-8'>Journal</h2>
      <div className='my-8'>
        <Question />
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard
              entry={{
                id: entry.id,
                createdAt: entry.createdAt,
                analysis: {
                  summary: entry.analysis!.summary,
                  mood: entry.analysis!.mood,
                },
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
