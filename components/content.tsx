"use client";
import React, { FC, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Questions from "@/components/questions";
import QuestionDetail from "@/components/question-detail";
import { Comment, Question } from "@prisma/client";

interface Props {
  questions: Question[] ;
  comments: Comment[];
}

const Content: FC<Props> = ({ questions, comments }) => {
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
        <Questions size={sizes[0]} questions={questions ?? []} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel minSize={30}>
        <QuestionDetail questions={questions ?? []} comments={comments} size={sizes[0]} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Content;
