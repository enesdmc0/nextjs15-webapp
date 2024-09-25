"use client";
import React, { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "./ui/separator";
import { NewQuestion } from "./new-question";
import { Answer, Question } from "@prisma/client";
import { ModeToggle } from "./mode-toggle";
import QuestionCard from "./question-card";

interface Props {
  size: number;
  questions: Question[];
  answers: Answer[];
}

const Questions: FC<Props> = ({ size, questions, answers }) => {

  const customQuestions = questions.map((x) => {
    const answer = answers.find((y) => y.questionId === x.id);
    return {
      answer: answer?.option,
      ...x,
    };
  });

  return (
    <div className="flex flex-col ">
      <ScrollArea className="w-full h-screen pb-4 ">
        <div className="px-4 py-2 flex justify-end gap-5">
          <ModeToggle />
          <NewQuestion />
        </div>

        <Separator />

        {/* questions */}
        <div className="flex flex-col gap-4 px-4 mt-4">
          {customQuestions.map((x, i) => (
            <QuestionCard size={size} {...x} key={i} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Questions;
