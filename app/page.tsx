import { ModeToggle } from "@/components/mode-toggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from '@clerk/nextjs'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import * as React from "react";
export default async function Home() {
  const user = auth();
  const current = await currentUser();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["matches"],
    queryFn: () => {},
  });

  return (
    <main className="font-sans">
      <ModeToggle />
      <p className="bg-red-400 dark:bg-blue-500">enes</p>
      <SignOutButton />

    </main>
  );
}
