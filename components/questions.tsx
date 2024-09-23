"use client";
import React, { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { NewQuestion } from "./new-question";
import { useParams, useRouter } from "next/navigation";
import { Question } from "@prisma/client";

interface Props {
  size: number;
  questions: Question[];
}

const Questions: FC<Props> = ({ size, questions }) => {
  const router = useRouter();
  const { slug } = useParams();
  const category = slug ? slug[0] : "all";
  const activeQuestion = slug ? slug[1] : null;
  return (
    <div className="flex flex-col">
      <ScrollArea className="w-full h-screen pb-4 ">
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
          <NewQuestion />
        </div>

        <Separator />

        {/* questions */}
        <div className="flex flex-col gap-4 px-4 mt-4">
          {questions.map((x, i) => (
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
                <Button className="flex-1 line-clamp-1">{x.option1}</Button>
                <Button className="flex-1 line-clamp-1">{x.option2}</Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      d
    </div>
  );
};

export default Questions;
