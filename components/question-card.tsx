import React, { FC } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { useAtom } from "jotai";
import { aAtom, bAtom } from "@/lib/atom";
import useWindowWidth from "@/lib/use-window";

interface Props {
  id: number;
  text: string;
  option1: string;
  option2: string;
  answer: number | undefined;
  createdAt: Date;
}

const QuestionCard: FC<Props> = ({
  id,
  text,
  option1,
  option2,
  answer,
  createdAt,
}) => {
  const { slug } = useParams();
  const category = slug ? slug[0] : "all";
  const activeQuestion = slug ? slug[1] : null;
  const [aOpen, setAOpen] = useAtom(aAtom);
  const [bOpen, setBOpen] = useAtom(bAtom);
  const windowWidth = useWindowWidth();
  const date = new Date(createdAt);

  const formattedDate = new Intl.DateTimeFormat("tr-TR", {
    // weekday: 'long',
    // year: 'numeric',
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: 'numeric'
  }).format(date);

  const handleClick = () => {
    // If the window width is less than 768px
    if (windowWidth < 768) {
      // If aOpen is true, close it and open bOpen
      if (aOpen) {
        setAOpen(false);
        setBOpen(true);
        return;
      }
    } else {
      // For larger screens, just open bOpen
      setBOpen(true);
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={`/${category}/${id}`}
      className={cn(
        "border rounded-md p-3 space-y-4 cursor-pointer ",
        Number(activeQuestion) === id && "bg-muted"
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm">{text}</p>
        <p className="text-xs">{formattedDate}</p>
      </div>
      <div className={cn("grid grid-cols-2 gap-4 ml-auto w-full 2xl:w-1/2")}>
        <Button disabled={answer !== undefined} className={cn("flex-1 flex items-center justify-center")} size="sm">
          <p className="flex-1 truncate">{option1}</p>
          <CircleCheck
            className={cn(
              "size-5 ml-auto",
              answer === 0 ? "opacity-100" : "opacity-0"
            )}
          />
        </Button>
        <Button disabled={answer !== undefined} className={cn("flex-1 flex items-center justify-center")} size="sm">
          <p className="flex-1 truncate">{option2}</p>
          <CircleCheck
            className={cn(
              "size-5 ml-auto",
              answer === 1 ? "opacity-100" : "opacity-0"
            )}
          />
        </Button>
      </div>
    </Link>
  );
};

export default QuestionCard;
