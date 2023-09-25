import { cn } from "@/lib/utils";
import type { Analysis } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function AnalysisCard({
  analysis,
  className,
}: {
  analysis: Partial<Analysis>;
  className?: string;
}) {
  const { mood, summary, color, subject, negative } = analysis;
  const textColor = color === "#000000" ? "white" : "black";
  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
  ];
  return (
    <Card
      className={cn("border-2 rounded border-black shadow-md h-fit", className)}
    >
      <CardHeader className='px-6 py-10' style={{ backgroundColor: color }}>
        <CardTitle className='text-2xl' style={{ color: textColor }}>
          Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <ul>
          {analysisData.map((item) => (
            <li
              key={item.name}
              className='flex justify-between px-2 py-4 border border-solid border-black/10'
            >
              <span className='text-lg font-semibold pr-2'>{item.name}</span>
              <span className='text-right capitalize'>{item.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
