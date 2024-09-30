"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function loadingpage() {
  return (
    (<div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <main className="flex-1 flex flex-col gap-8 p-6 md:p-10">
        <div
          className="bg-card rounded-lg shadow-md p-6 md:p-10 flex items-center justify-center">
          <Skeleton className="h-12 w-12 rounded-full animate-pulse" />
          <span className="ml-4 text-lg font-medium">Loading...</span>
        </div>
      </main>
    </div>)
  );
}
