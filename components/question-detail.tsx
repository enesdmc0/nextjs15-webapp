"use client";
import React, { FC, useActionState, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import NewComment from "./new-comment";

import { useParams } from "next/navigation";
import { Answer, Comment, Question } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createAnswer } from "@/lib/actions";
interface Props {
  questions: Question[];
  comments: Comment[];
  answers: Answer[];
  size: number;
}

const QuestionDetail: FC<Props> = ({ questions, size, comments, answers }) => {
  const [data, action, isPending] = useActionState(createAnswer, null);
  const [activeAnswer, setActiveAnswer] = useState<0 | 1>(0);
  const { slug } = useParams();
  const activeQuestion = slug ? slug[1] : null;
  const [open, setOpen] = useState(false);
  if (!activeQuestion) {
    return (
      <div className="w-full h-screen bg-white border border-gray-200">
        Soru Bulunamadı.
      </div>
    );
  }
  const customQuestions = questions.map((x) => {
    const answer = answers.find((y) => y.questionId === x.id);
    return {
      answer: answer?.option,
      ...x,
    };
  });

  
  const question = customQuestions.find((x) => x.id === Number(activeQuestion));
  if (!question) {
    return (
      <div className="w-full h-screen border border-gray-200">
        Soru Bulunamadı.
      </div>
    );
  }

  const { text, option1, option2, category } = question;

  const handleActive = (index: 0 | 1) => {
    setActiveAnswer(index);
    setOpen((prev) => !prev);
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col h-screen pb-4 ">
        <div className="px-4 py-2 flex justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="default" size="icon">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Sil</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Sil</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Separator />

        <div className="flex flex-col px-4 my-4">
          <p className="font-semibold text-xl">{text}</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          {question.answer === undefined ? (
            <DialogTrigger asChild>
              <div className={cn("flex gap-4 px-4 ")}>
                <Button
                  onClick={() => handleActive(0)}
                  className="flex-1 line-clamp-1"
                >
                  {option1}
                </Button>
                <Button
                  onClick={() => handleActive(1)}
                  className="flex-1 line-clamp-1"
                >
                  {option2}
                </Button>
              </div>
            </DialogTrigger>
          ) : (
            <div className={cn("flex gap-4 px-4")}>
              <Button
                variant={question.answer === 0 ? "destructive" : "default"}
                className="flex-1 line-clamp-1"
              >
                {option1}
              </Button>
              <Button
                variant={question.answer === 1 ? "destructive" : "default"}
                className="flex-1 line-clamp-1"
              >
                {option2}
              </Button>
            </div>
          )}
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Bu Cevap için Emin Misin ?</DialogTitle>
              {/* <DialogDescription>Test Desc</DialogDescription> */}
            </DialogHeader>
            <form action={action}>
              <Button type="submit" variant="default" disabled={isPending}>
                Onayla
              </Button>
              <Button type="button" variant="ghost" onClick={() => setOpen((prev) => !prev)}>
                Vazgeç
              </Button>
              <input
                type="text"
                name="option"
                value={activeAnswer}
                readOnly
                className="hidden"
              />
              <input
                type="text"
                name="questionId"
                value={activeQuestion}
                readOnly
                className="hidden"
              />
            </form>
            {/* <DialogFooter>enes demirci</DialogFooter> */}
          </DialogContent>
        </Dialog>

        <Separator className="mt-4" />

        <div className="px-4 flex flex-col gap-4 my-4">
          {comments?.map((x, i) => (
            <div key={i} className={cn("border rounded-md p-4 space-y-4")}>
              <div className="flex items-center justify-between">
                <p className="text-sm">{x.text}</p>
                <p className="text-xs">Oct 22, 2023, 9:00:00 AM</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />
        
        <NewComment />
      </div>
    </ScrollArea>
  );
};

export default QuestionDetail;
