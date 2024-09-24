"use client";
import React, { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { NewQuestion } from "./new-question";
import { useParams, useRouter } from "next/navigation";
import { Answer, Question } from "@prisma/client";
import { ModeToggle } from "./mode-toggle";

interface Props {
  size: number;
  questions: Question[];
  answers: Answer[];
}

const Questions: FC<Props> = ({ size, questions, answers }) => {
  const router = useRouter();
  const { slug } = useParams();
  const category = slug ? slug[0] : "all";
  const activeQuestion = slug ? slug[1] : null;

  const customQuestions = questions.map((x) => {
    const answer = answers.find((y) => y.questionId === x.id);
    return {
      answer: answer?.option,
      ...x,
    };
  });

  return (
    <div className="flex flex-col">
      <ScrollArea className="w-full h-screen pb-4 ">
        <div className="px-4 py-2 flex justify-end gap-5">
        <ModeToggle />
          <NewQuestion />
        </div>

        <Separator />

        {/* questions */}
        <div className="flex flex-col gap-4 px-4 mt-4">
          {customQuestions.map((x, i) => (
            <div
              onClick={() => router.push(`/${category}/${x.id}`)}
              key={i}
              className={cn(
                "border rounded-md p-4 space-y-4",
                Number(activeQuestion) === x.id && "bg-muted"
              )}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm">{x.text}</p>
                <p className="text-xs">Oct 22, 2023, 9:00:00 AM</p>
              </div>
              <div
                className={cn(
                  "flex gap-4 ml-auto",
                  size < 50 ? "w-full" : "w-1/2"
                )}
              >
                <Button
                  variant={x.answer === 0 ? "destructive" : "default"}
                  className={cn("flex-1 line-clamp-1")}
                >
                  {x.option1}
                </Button>
                <Button
                  variant={x.answer === 1 ? "destructive" : "default"}
                  className={cn("flex-1 line-clamp-1")}
                >
                  {x.option2}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Questions;
