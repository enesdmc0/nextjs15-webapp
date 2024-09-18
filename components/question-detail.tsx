"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useAtom } from "jotai";
import { ScrollArea } from "@/components/ui/scroll-area";
import { activeQuestionAtom } from "@/lib/atom";


const QuestionDetail = () => {
    const [activeQuestion, setActiveQuestion] = useAtom(activeQuestionAtom)
  return (
    <TooltipProvider>
    <ScrollArea className="w-full flex flex-col h-screen  p-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Move to trash</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move to trash</TooltipContent>
        </Tooltip>
      <div>{activeQuestion}</div>
      <div className="mt-auto">dwe</div>
    </ScrollArea>
  </TooltipProvider>
  )
}

export default QuestionDetail