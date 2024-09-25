"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Questions from "@/components/questions";
import QuestionDetail from "@/components/question-detail";
import { Answer, Comment, Question } from "@prisma/client";
import { TotalAnswers } from "@/types";
import { ImperativePanelHandle } from "react-resizable-panels";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  questions: Question[];
  comments: Comment[];
  answers: Answer[];
  totalAnswers: TotalAnswers;
}

const Content: FC<Props> = ({ questions, comments, answers, totalAnswers }) => {
  const [sizes, setSizes] = useState<number[]>([]);
  const ref = useRef<ImperativePanelHandle>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);



  const togglePanel = () => {
    const panel = ref.current;
    if (panel) {
      if (isCollapsed) {
        panel.expand();
      } else {
        panel.collapse();
      }
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleResize = (sizes: number[]) => {
    document.cookie = `resizable=${JSON.stringify(sizes)}`;
    setSizes(sizes);
    // Update the isCollapsed state based on the size of the panel
    if (sizes[0] === 0) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      autoSaveId="persistence"
      onLayout={handleResize}
    >
      <ResizablePanel collapsible minSize={20} ref={ref}>
        <Questions
          questions={questions ?? []}
          answers={answers}
          togglePanel={togglePanel}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel collapsible minSize={35}>
        <QuestionDetail
          questions={questions ?? []}
          answers={answers}
          totalAnswers={totalAnswers}
          comments={comments}
        >
          <Button
            className="mr-auto flex items-center gap-1"
            onClick={togglePanel}
          >
            {!isCollapsed && <ArrowLeft className="size-4" />}
            {isCollapsed ? "Soruları Aç" : "Soruları Kapat"}
            {isCollapsed && <ArrowRight className="size-4" />}
          </Button>
        </QuestionDetail>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Content;
