"use client";
import React, { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "./ui/separator";
import { NewQuestion } from "./new-question";
import { Answer, Question } from "@prisma/client";
import { ModeToggle } from "./mode-toggle";
import QuestionCard from "./question-card";
import { Button } from "./ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { navbarOpenAtom } from "@/lib/atom";

interface Props {
  questions: Question[];
  answers: Answer[];

}

const Questions: FC<Props> = ({ questions, answers }) => {
  const [open, setOpen] = useAtom(navbarOpenAtom);
  const customQuestions = questions.map((x) => {
    const answer = answers.find((y) => y.questionId === x.id);
    return {
      answer: answer?.option,
      ...x,
    };
  });

  return (
    <div className="flex flex-col ">
      <div className=" h-screen pb-4 ">
        <div className="px-4 py-2 flex justify-end gap-5">
          <Button
            onClick={() => setOpen((prev) => !prev)}
            variant="outline"
            size="icon"
            className="mr-auto "
          >
            <HamburgerMenuIcon className="h-4 w-4" />
          </Button>
          <ModeToggle />
          <NewQuestion />
        </div>

        <Separator />

        {/* questions */}
        {questions.length === 0 ? (
          <div className="flex items-center justify-center h-40 underline">
            Aradığınız Kategoriye Ait Soru Bulunamadı.
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-4 px-4 mt-4">
            {customQuestions.map((x, i) => (
              <QuestionCard {...x} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
