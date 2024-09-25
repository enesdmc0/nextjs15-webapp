"use client";
import React, { FC, useActionState, useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleCheck, Trash2 } from "lucide-react";

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
import CommentCard from "./comment-card";
import { toast } from "sonner";
import { TotalAnswers } from "@/types";
interface Props {
  questions: Question[];
  comments: Comment[];
  answers: Answer[];
  totalAnswers: TotalAnswers;
  size: number;
}

const QuestionDetail: FC<Props> = ({ questions, size, comments, answers, totalAnswers }) => {
  const [data, action, isPending] = useActionState(createAnswer, null);
  const [error, setError] = useState<boolean>(false);
  const [activeAnswer, setActiveAnswer] = useState<0 | 1>(0);
  const { slug } = useParams();
  const activeQuestion = slug ? slug[1] : null;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!data) return;
    console.log("[NEW_ANSWER_MODAL_RENDER]");
    if (data?.status === "success") {
      setOpen(false);
      toast.success("Cevabınız başarıyla kaydedildi.");
    }
  }, [data]);


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

  const { text, option1, option2, category, createdAt } = question;

  const date = new Date(createdAt);

  const formattedDate = new Intl.DateTimeFormat("tr-TR", {
    // weekday: 'long',
    // year: 'numeric',
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: 'numeric'
  }).format(date);

  const handleActive = (index: 0 | 1) => {
    setActiveAnswer(index);
    setOpen((prev) => !prev);
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col h-screen">
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
            <>
              <div className={cn("flex gap-4 px-4")}>
                <Button
                  className={cn("flex-1 flex items-center justify-center")}
                >
                  <p className="flex-1">{option1}</p>
                  <CircleCheck
                    className={cn(
                      "size-5 ml-auto",
                      question.answer === 0 ? "opacity-100" : "opacity-0"
                    )}
                  />
                </Button>
                <Button
                  className={cn("flex-1 flex items-center justify-center")}
                >
                  <p className="flex-1">{option2}</p>
                  <CircleCheck
                    className={cn(
                      "size-5 ml-auto",
                      question.answer === 1 ? "opacity-100" : "opacity-0"
                    )}
                  />
                </Button>
              </div>
              <p className="text-red-500 text-xs px-4 pt-2 text-center">
                Bu Soru için Daha Önce Oy Kullandınız.
              </p>
            </>
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
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen((prev) => !prev)}
              >
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

        <div className="m-4 gap-4 grid grid-cols-2">
          <Button
            variant="outline"
            className="flex items-center justify-between"
          >
            <p>Toplam Oy Sayısı:</p> <p>{totalAnswers?.length}</p>
          </Button>
          <Button
            variant="outline"
            className="col-span-1 text-xs flex justify-between"
          >
            <p>
              {totalAnswers.option1Length} Oy
            </p>
            <Separator orientation="vertical" />
            <p>
            {totalAnswers.option2Length} Oy
            </p>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-between"
          >
            <p>Oluşturulma Tarihi:</p> <p>{formattedDate}</p>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-between"
          >
            <p>Categori</p> <p className="capitalize">{category}</p>
          </Button>
        </div>

        <Separator />
        <div className="p-4 flex items-center justify-between">
          <h2 className="underline">Yorumlar</h2>
          <Button size="sm" variant="outline">
            {comments?.length}
          </Button>
        </div>
        <div className="px-4 flex flex-col flex-1 gap-4 mb-4">
          {comments?.map((x, i) => (
            <CommentCard key={i} {...x} />
          ))}
        </div>

        <Separator className="mb-4" />

        <NewComment />
      </div>
    </ScrollArea>
  );
};

export default QuestionDetail;
