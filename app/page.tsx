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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Questions from "@/components/questions";
import QuestionDetail from "@/components/question-detail";
export default async function Home() {
  const user = auth();
  const current = await currentUser();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["matches"],
    queryFn: () => {},
  });

  return (
    <main className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={30}>
          <Questions />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel minSize={30}>
          <QuestionDetail />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
