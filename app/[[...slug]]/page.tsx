import { ModeToggle } from "@/components/mode-toggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import * as React from "react";

import Navbar from "@/components/navbar";
import Content from "@/components/content";
import { getComments, getQuestions } from "@/lib/actions";
import { Comment, Question } from "@prisma/client";

interface Props {
  params: {
    slug: string;
  };
}

const Home: React.FC<Props> = async ({ params }) => {
  const user = auth();
  const current = await currentUser();

  const category = params.slug[0] ?? "all";
  const activeQuestion = Number(params.slug[1]) ?? null;

  const questions: Question[] = (await getQuestions(category)) ?? [];
  const comments: Comment[] = (await getComments(activeQuestion)) ?? [];

  return (
    <main className="h-screen flex font-sans">
      <Navbar />
      <Content questions={questions} comments={comments} />
    </main>
  );
};

export default Home;
