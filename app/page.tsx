import { ModeToggle } from "@/components/mode-toggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import * as React from "react";

import Navbar from "@/components/navbar";
import Content from "@/components/content";
import { getQuestions } from "@/lib/actions";
const Home = async () => {
  const user = auth();
  const current = await currentUser();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });

  return (
    <main className="h-screen flex font-sans">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Content />
      </HydrationBoundary>
    </main>
  );
};

export default Home;
