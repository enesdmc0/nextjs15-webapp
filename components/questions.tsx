"use client";
import React, { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { useAtom, useAtomValue } from "jotai";
import { activeCategoryAtom, activeQuestionAtom } from "@/lib/atom";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusCircleIcon, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { QuestionsType } from "@/types";
import { EnvelopeOpenIcon, QuestionMarkIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/lib/actions";

interface Props {
  size: number;
}

const Questions: FC<Props> = ({ size }) => {
  const [activeQuestion, setActiveQuestion] = useAtom(activeQuestionAtom);
  const category = useAtomValue(activeCategoryAtom);
  const { data: questions } = useQuery({
    queryKey: ['questions'],
    queryFn: () => getQuestions(),
  })

  console.log(questions)
  

  // const filteredQuestions = questions?.filter((x) => x.category === category);

  

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
          <Button>
            <PlusCircleIcon className="mr-2 h-4 w-4" /> Soru Sor
          </Button>
        </div>

        <Separator />

        {/* questions */}
        {/* <div className="flex flex-col gap-4 px-4 mt-4">
          {filteredQuestions.map((x, i) => (
            <div
              onClick={() => setActiveQuestion(x.text)}
              key={i}
              className={cn(
                "border rounded-md p-4 space-y-4",
                activeQuestion === x.text && "bg-muted"
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
        </div> */}
      </ScrollArea>
      d
    </div>
  );
};

export default Questions;
