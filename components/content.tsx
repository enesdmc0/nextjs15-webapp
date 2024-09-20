"use client";
import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Questions from "@/components/questions";
import QuestionDetail from "@/components/question-detail";
import { QUESTIONS_MOCK_DATA } from "@/constants";
const Content = () => {
  const [sizes, setSizes] = useState<number[]>([]);

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
        
        <Questions size={sizes[0]} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel minSize={30}>
        <QuestionDetail questions={QUESTIONS_MOCK_DATA} size={sizes[0]} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Content;
