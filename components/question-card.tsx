import React, { FC } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { CircleCheck } from "lucide-react";

interface Props {
  size: number;
  id: number;
  text: string;
  option1: string;
  option2: string;
  answer: number | undefined;
  createdAt: Date;
}

const QuestionCard: FC<Props> = ({
  size,
  id,
  text,
  option1,
  option2,
  answer,
  createdAt,
}) => {
  const router = useRouter();
  const { slug } = useParams();
  const category = slug ? slug[0] : "all";
  const activeQuestion = slug ? slug[1] : null;

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

  return (
    <div
      onClick={() => router.push(`/${category}/${id}`)}
      className={cn(
        "border rounded-md p-4 space-y-4 cursor-pointer",
        Number(activeQuestion) === id && "bg-muted"
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm">{text}</p>
        <p className="text-xs">{formattedDate}</p>
      </div>
      <div className={cn("flex gap-4 ml-auto", size < 50 ? "w-full" : "w-1/2")}>
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
    </div>
  );
};

export default QuestionCard;
