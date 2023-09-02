import HistoryChart from "@/components/HistoryChart";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

async function getData() {
  const user = await getUserByClerkId();
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id,
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
    <div className='w-full h-full'>
      <div>{`Avg, Sentiment ${avg}`}</div>
      <div className='h-full w-full'>
        <HistoryChart data={analysis} />
      </div>
    </div>
  );
}
