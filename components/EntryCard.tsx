import { Analysis } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type EntryCardProps = {
  id: string;
  createdAt: Date;
  analysis: Partial<Analysis> | null;
};

export default function EntryCard({ entry }: { entry: EntryCardProps }) {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <Card className='transition-all duration-200 ease-in-out hover:scale-105'>
      <CardHeader>
        <CardTitle className='uppercase text-xl'>
          {entry.analysis!.subject}
        </CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>{entry.analysis!.summary}</CardContent>
    </Card>
  );
}
