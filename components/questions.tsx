import React, { FC } from "react";
import { Separator } from "./ui/separator";
import { NewQuestion } from "./new-question";
import { Answer, Question } from "@prisma/client";
import QuestionCard from "./question-card";
import { Button } from "./ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { aAtom, bAtom, navbarOpenAtom } from "@/lib/atom";
import useWindowWidth from "@/lib/use-window";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

interface Props {
  questions: Question[];
  answers: Answer[];
}

const Questions: FC<Props> = ({ questions, answers }) => {
  const { slug } = useParams();
  const windowWidth = useWindowWidth();

  const [open, setOpen] = useAtom(navbarOpenAtom);

  const [aOpen, setAOpen] = useAtom(aAtom);
  const [bOpen, setBOpen] = useAtom(bAtom);

  const activeQuestion = slug ? slug[1] : null;

  const customQuestions = questions.map((x) => {
    const answer = answers.find((y) => y.questionId === x.id);
    return {
      answer: answer?.option,
      ...x,
    };
  });

  const handleB = () => {
    if (windowWidth < 768) {
      if (!activeQuestion) return;
      if (setAOpen) {
        setAOpen(false);
        setBOpen(true);
      } else {
        setBOpen((prev) => !prev);
      }
    } else {
      if (!aOpen) return;
      setBOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col ">
      <div className=" h-screen pb-4 ">
        <div className="px-4 py-2 flex justify-end gap-3">
          <Button
            onClick={() => setOpen((prev) => !prev)}
            variant="outline"
            size="icon"
            className="mr-auto md:hidden"
          >
            <HamburgerMenuIcon className="h-4 w-4" />
          </Button>

          <NewQuestion />

          <Button
            onClick={handleB}
            disabled={!activeQuestion}
            variant="outline"
            size="icon"
          >
            <ChevronLeft className={cn("size-5", bOpen ? "hidden" : "")} />
            <ChevronRight className={cn("size-5", bOpen ? "" : "hidden")} />
          </Button>
        </div>

        <Separator />

        {/* questions */}
        {questions.length === 0 ? (
          <div className="flex items-center justify-center h-40 underline">
            Aradığınız Kategoriye Ait Soru Bulunamadı.
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-4 px-4 mt-4">
            {customQuestions.map((x, i) => (
              <QuestionCard {...x} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
