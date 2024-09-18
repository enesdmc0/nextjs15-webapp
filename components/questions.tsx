"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { useAtom } from "jotai";
import { activeQuestionAtom } from "@/lib/atom";
import { cn } from "@/lib/utils";
import Categories from "./categories";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
const Questions = () => {
  const [activeQuestion, setActiveQuestion] = useAtom(activeQuestionAtom);
  return (
    <div className="flex flex-col">
      <ScrollArea className="w-full h-screen pb-4">
        <div className="px-4 py-2">
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
        </div>
        <Separator />
        <Categories />
        <div className="flex flex-col gap-4 px-4">
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <div
                onClick={() => setActiveQuestion(i)}
                key={i}
                className={cn(
                  "border rounded-md p-4 space-y-4",
                  activeQuestion === i && "bg-muted"
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    2024-2025 Sezonunda Şampiyon Kim Olur ?
                  </p>
                  <p className="text-xs">Oct 22, 2023, 9:00:00 AM</p>
                </div>
                <div className="flex justify-end gap-4">
                  <Button>Fenerbahce</Button>
                  <Button>Besiktas</Button>
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
