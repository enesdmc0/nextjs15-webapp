"use client";
import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Questions from "@/components/questions";
import QuestionDetail from "@/components/question-detail";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/lib/actions";
import { QuestionsType } from "@/types";
import { NewQuestion } from "./new-question";
const Content = () => {
  const [sizes, setSizes] = useState<number[]>([]);

  const { data: questions } = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });

  return (
    <ResizablePanelGroup
      direction="horizontal"
      autoSaveId="persistence"
      onLayout={(sizes: number[]) => {
        document.cookie = `resizable=${JSON.stringify(sizes)}`;
        setSizes(sizes);
      }}
    >
      <ResizablePanel minSize={40}>
        <Questions size={sizes[0]} questions={questions ?? []} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel minSize={30}>
        <QuestionDetail questions={questions ?? []} size={sizes[0]} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Content;
