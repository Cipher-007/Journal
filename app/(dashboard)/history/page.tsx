import HistoryChart from "@/components/HistoryChart";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import Link from "next/link";

async function getData() {
  const user = await getUserByClerkId();
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    select: {
      sentimentScore: true,
      createdAt: true,
      mood: true,
      color: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const sum = analysis.reduce(
    (all, current) => all + current.sentimentScore,
    0
  );

  const avg = Math.round(sum / analysis.length);

  return { analysis, avg };
}

export default async function History() {
  const { analysis, avg } = await getData();

  return (
    <>
      {analysis.length === 0 ? (
        <div className='flex-1 w-full items-center justify-center flex h-full'>
          <div className='border-l-4 border-yellow-400 bg-yellow-50 p-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-yellow-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <p className='text-lg text-yellow-700'>
                  You have no Entries.
                  <Link
                    href='/journal'
                    className='font-medium text-yellow-700 underline hover:text-yellow-600 pl-1'
                  >
                    Create new entries.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='py-2 font-medium text-lg pl-5'>{`Avg, Sentiment:  ${avg}`}</div>
          <HistoryChart data={analysis} />
        </>
      )}
    </>
  );
}
