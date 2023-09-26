import type { Analysis } from "@prisma/client";

export type EntryCardProps = {
  id: string;
  createdAt: Date;
  analysis: Partial<Analysis> | null;
};

export type ChatProps = {
  id: string;
  user: string;
  ai: string;
}[];

export type JournalEntryWithAnalysis = {
  id: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  analysis: Partial<Analysis> | null;
};
