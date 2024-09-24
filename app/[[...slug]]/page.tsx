import * as React from "react";
import Navbar from "@/components/navbar";
import Content from "@/components/content";
import { getAnswers, getComments, getQuestions } from "@/lib/actions";
import { Answer, Comment, Question } from "@prisma/client";

interface Props {
  params: {
    slug: string;
  };
}

const Home: React.FC<Props> = async ({ params }) => {
  const category = params?.slug?.[0] ?? "all";
  const activeQuestion = Number(params.slug?.[1]) ?? null;

  const GET_QUESTIONS: Promise<Question[]> = getQuestions(category);
  const GET_COMMENTS: Promise<Comment[]> = getComments(activeQuestion);
  const GET_ANSWERS: Promise<Answer[]> = getAnswers();

  const [questions, comments, answers]: [Question[], Comment[], Answer[]] =
    await Promise.all([GET_QUESTIONS, GET_COMMENTS, GET_ANSWERS]);

  return (
    <main className="h-screen flex font-sans">
      <Navbar />
      <Content questions={questions} comments={comments} answers={answers} />
    </main>
  );
};

export default Home;
