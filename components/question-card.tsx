import React, { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

interface Props {
  id: number;
  text: string;
  option1: string;
  option2: string;
  answer: number | undefined;
  createdAt: Date;
  togglePanel: () => void;
}

const QuestionCard: FC<Props> = ({
  id,
  text,
  option1,
  option2,
  answer,
  createdAt,
  togglePanel,
}) => {
  const { slug } = useParams();
  const category = slug ? slug[0] : "all";
  const activeQuestion = slug ? slug[1] : null;

  const date = new Date(createdAt);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };

    if (typeof window !== "undefined") {
      checkIsMobile();

      window.addEventListener("resize", checkIsMobile);

      return () => {
        window.removeEventListener("resize", checkIsMobile);
      };
    }
  }, []);
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
    if (isMobile) {
      togglePanel();
    }
  };

  return (
    <Link
      href={`/${category}/${id}`}
      onClick={handleClick}
      className={cn(
        "border rounded-md p-4 space-y-4 cursor-pointer",
        Number(activeQuestion) === id && "bg-muted"
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm">{text}</p>
        <p className="text-xs">{formattedDate}</p>
      </div>
      <div className={cn("flex gap-4 ml-auto w-full")}>
        <Button className={cn("flex-1 flex items-center justify-center")}>
          <p className="flex-1">{option1}</p>
          <CircleCheck
            className={cn(
              "size-5 ml-auto",
              answer === 0 ? "opacity-100" : "opacity-0"
            )}
          />
        </Button>
        <Button className={cn("flex-1 flex items-center justify-center")}>
          <p className="flex-1">{option2}</p>
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
