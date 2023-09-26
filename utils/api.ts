import { JournalEntryWithAnalysis } from "@/types";
import type { JournalEntry } from "@prisma/client";

function createURL(path: string) {
  return window.location.origin + path;
}
export async function createNewEntry() {
  const res = await fetch(createURL("/api/journal"), {
    method: "POST",
    body: JSON.stringify({
      content: "Write about your day...",
    }),
  });

  if (res.ok) {
    const entry: JournalEntry = await res.json();

    return { entry: entry };
  } else {
    return { error: res.statusText };
  }
}

export async function updateEntry(id: string, content: string) {
  const res = await fetch(createURL(`/api/journal/${id}`), {
    method: "PATCH",
    body: JSON.stringify({
      content,
    }),
  });

  if (res.ok) {
    const data: { data: JournalEntryWithAnalysis } = await res.json();

    return { updatedEntry: data.data };
  } else {
    return { error: res.statusText };
  }
}

export async function askQuestion(
  question: string,
  entires: JournalEntryWithAnalysis[]
) {
  const res = await fetch(createURL("/api/question"), {
    method: "POST",
    body: JSON.stringify({
      question,
      entires,
    }),
  });

  if (res.ok) {
    const data = await res.json();

    return data.data;
  } else {
    return { error: res.statusText };
  }
}
