import ChatBubble from "@/components/ChatBubble";
import EntryCard from "@/components/EntryCard";
import NewEntry from "@/components/NewEntry";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import clsx from "clsx";
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
          subject: true,
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
    <div className='bg-slate-200 h-[93%]'>
      <div className='bg-indigo-600 pb-96' />
      <main className='-mt-80'>
        <div className='px-8 pb-8'>
          <div className='p-6 shadow rounded-md bg-white'>
            <div
              className={clsx(
                "max-h-[44rem] overflow-y-auto border-dashed border rounded p-2 h-[44rem]",
                entries.length === 0 ? null : "bg-custom"
              )}
            >
              {entries.length === 0 ? (
                <div className='grid content-center grid-cols-1 h-full'>
                  <div className='text-center w-fit mx-auto'>
                    <svg
                      className='w-32 h-32 mx-auto text-gray-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        vectorEffect='non-scaling-stroke'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
                      ></path>
                    </svg>
                    <h3 className='text-black font-semibold pt-2 text-xl'>
                      No entries
                    </h3>
                    <p className='pt-1 text-sm'>
                      Get started by creating a new project
                    </p>
                    <div className='pt-6'>
                      <NewEntry />
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex grow flex-wrap'>
                  {entries.map((entry) => (
                    <div key={entry.id} className='w-1/4 p-2'>
                      <Link href={`/journal/${entry.id}`}>
                        <EntryCard entry={entry} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {entries.length === 0 ? null : (
              <NewEntry className='relative top-3' />
            )}
          </div>
        </div>
      </main>
      <div className='right-12 absolute bottom-8'>
        <ChatBubble />
      </div>
    </div>
  );
}
