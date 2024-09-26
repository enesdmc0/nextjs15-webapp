"use client";
import React, { FC, useEffect } from "react";
import Questions from "@/components/questions";
import QuestionDetail from "@/components/question-detail";
import { Answer, Comment, Question } from "@prisma/client";
import { TotalAnswers } from "@/types";
import { useParams } from "next/navigation";
import { useAtom } from "jotai";
import { aAtom, bAtom } from "@/lib/atom";
import { cn } from "@/lib/utils";
import useWindowWidth from "@/lib/useWindow";
import useMounted from "@/lib/use-mounted";

interface Props {
  questions: Question[];
  comments: Comment[];
  answers: Answer[];
  totalAnswers: TotalAnswers;
}

const Content: FC<Props> = ({ questions, comments, answers, totalAnswers }) => {
  const mounted = useMounted();
  const { slug } = useParams();
  const activeQuestion = slug ? slug[1] : null;
  const windowWidth = useWindowWidth();

  const [aOpen, setAOpen] = useAtom(aAtom);
  const [bOpen, setBOpen] = useAtom(bAtom);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "grid w-full",
        windowWidth < 768
          ? "grid-cols-1"
          : !activeQuestion
          ? "grid-cols-1"
          : !aOpen || !bOpen
          ? "grid-cols-1"
          : "grid-cols-2"
      )}
    >
      <div
        className={cn(
          "col-span-1 overflow-y-auto h-full ",
          aOpen ? "" : "hidden"
        )}
      >
        <Questions questions={questions ?? []} answers={answers}></Questions>
      </div>

      <div
        className={cn(
          "col-span-1 overflow-y-auto h-full",
          !activeQuestion ? "hidden" : bOpen ? "" : "hidden"
        )}
      >
        <QuestionDetail
          questions={questions ?? []}
          answers={answers}
          totalAnswers={totalAnswers}
          comments={comments}
        ></QuestionDetail>
      </div>
    </div>
  );
};

export default Content;
