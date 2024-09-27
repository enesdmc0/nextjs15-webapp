import * as React from "react";
import Navbar from "@/components/navbar";
import Content from "@/components/content";
import {
  getAnswers,
  getComments,
  getQuestions,
  getTotalAnswerForQuestion,
} from "@/lib/actions";
import { Answer, Question } from "@prisma/client";
import { CommentWithUser, TotalAnswers } from "@/types";

interface Props {
  params: {
    slug: string;
  };
}

const Home: React.FC<Props> = async ({ params }) => {
  const category = params?.slug?.[0] ?? "spor";
  const activeQuestion = Number(params.slug?.[1]) ?? null;

  const GET_QUESTIONS: Promise<Question[]> = getQuestions(category);
  const GET_COMMENTS: Promise<CommentWithUser[]> = getComments(activeQuestion);
  const GET_ANSWERS: Promise<Answer[]> = getAnswers();
  const GET_TOTAL_ANSWERS: Promise<Answer[]> =
    getTotalAnswerForQuestion(activeQuestion);

  const [questions, comments, answers, totalAnswers]: [
    Question[],
    CommentWithUser[],
    Answer[],
    Answer[]
  ] = await Promise.all([
    GET_QUESTIONS,
    GET_COMMENTS,
    GET_ANSWERS,
    GET_TOTAL_ANSWERS,
  ]);

  const customTotalAnswers = (): TotalAnswers => {
    const totalLength = totalAnswers?.length;
    const a = totalAnswers?.filter((y) => y.option === 1).length;
    const b = totalAnswers?.filter((y) => y.option === 2).length;
    return {
      length: totalLength,
      option1Length: a,
      option2Length: b,
    };
  };

  const result = customTotalAnswers();

  return (
    <main className="h-screen flex font-sans">
      <Navbar />
      <Content
        questions={questions}
        comments={comments}
        answers={answers}
        totalAnswers={result}
      />
    </main>
  );
};

export default Home;
