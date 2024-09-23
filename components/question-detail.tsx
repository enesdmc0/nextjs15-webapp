"use client";
import React, { FC, use } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusCircleIcon, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import NewComment from "./new-comment";

import { useParams } from "next/navigation";

interface Props {
  questions: QuestionsType[];
  comments: Comment[];
  size: number;
}

const QuestionDetail: FC<Props> = ({ questions, size, comments }) => {
  const { slug } = useParams();
  const activeQuestion = slug ? slug[1] : null;

  if (!activeQuestion) {
    return (
      <div className="w-full h-screen bg-white border border-gray-200">
        Soru Bulunamadı.
      </div>
    );
  }

  const question = questions.find((x) => x.id === Number(activeQuestion));

  if (!question) {
    return (
      <div className="w-full h-screen bg-white border border-gray-200">
        Soru Bulunamadı.
      </div>
    );
  }

  const { text, option1, option2, category } = question;

  return (
    <ScrollArea className="w-full flex flex-col h-screen ">
      <div className="px-4 py-2 flex justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Move to trash</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button>
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Soru Sor
        </Button>
      </div>
      <Separator />

      <div className="flex flex-col px-4 mt-4">
        <div>{text}</div>
        <div className={cn("flex gap-4 ")}>
          <Button className="flex-1 line-clamp-1">{option1}</Button>
          <Button className="flex-1 line-clamp-1">{option2}</Button>
        </div>
      </div>
      <Separator />
      <div className="px-4 flex flex-col gap-4">
        {comments
          .map((x, i) => (
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
    </ScrollArea>
  );
};

export default QuestionDetail;
