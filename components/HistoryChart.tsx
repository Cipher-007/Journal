"use client";

import type { Analysis } from "@prisma/client";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  let analysis;
  if (active) {
    if (payload) {
      analysis = payload[0].payload;
    }
    return (
      <div className='p-8 bg-slate-300/75 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative'>
        <div
          className='absolute left-2 top-2 w-2 h-2 rounded-full'
          style={{ background: analysis.color }}
        ></div>
        <p className='label text-sm text-black/30'>{label}</p>
        <p className='intro text-xl uppercase'>{analysis.mood}</p>
      </div>
    );
  }
}

export default function HistoryChart({ data }: { data: Partial<Analysis>[] }) {
  const d = data.map((d) => ({
    ...d,
    createdAt: new Date(d.createdAt!).toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
    }),
  }));
  return (
    <ResponsiveContainer width={"100%"} height={"88%"}>
      <LineChart width={300} height={100} data={d}>
        <Line
          dataKey='sentimentScore'
          type='monotone'
          stroke='#8884d8'
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey='createdAt' />
        <YAxis dataKey='sentimentScore' />
        <Tooltip content={CustomTooltip} />
      </LineChart>
    </ResponsiveContainer>
  );
}
