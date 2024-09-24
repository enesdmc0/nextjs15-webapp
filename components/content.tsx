"use client";
import React, { FC, Suspense, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Questions from "@/components/questions";
import QuestionDetail from "@/components/question-detail";
import { Answer, Comment, Question } from "@prisma/client";

interface Props {
  questions: Question[];
  comments: Comment[];
  answers: Answer[];
}

const Content: FC<Props> = ({ questions, comments, answers }) => {
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
        <Questions
          size={sizes[0]}
          questions={questions ?? []}
          answers={answers}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel minSize={30}>
        <Suspense fallback={<p className="bg-red-400">Loading feed...</p>}>
          <QuestionDetail
            questions={questions ?? []}
            answers={answers}
            comments={comments}
            size={sizes[0]}
          />
        </Suspense>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Content;
