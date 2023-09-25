"use client";

import { cn } from "@/lib/utils";
import { createNewEntry } from "@/utils/api";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

export default function NewEntry({ className }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function clickHandler() {
    setLoading(true);
    const data = await createNewEntry();
    if (data.entry) {
      router.push(`/journal/${data.entry.id}`);
    } else if (data.error) {
      console.error(data.error);
    }
    setLoading(false);
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-105",
        className
      )}
    >
      <Button onClick={clickHandler} className='bg-blue-600' disabled={loading}>
        <Plus className='pl-1 h-5 w-5' />
        New Entry
      </Button>
    </div>
  );
}
