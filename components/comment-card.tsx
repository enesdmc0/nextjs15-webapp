import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface Props {
  text: string;
  createdAt: Date;
}

const CommentCard: FC<Props> = ({ text, createdAt }) => {
  const date = new Date(createdAt);

  const formattedDate = new Intl.DateTimeFormat('tr-TR', {
    // weekday: 'long',
    // year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // second: 'numeric'
  }).format(date);
  
  return (
    <div className={cn("border rounded-md p-3 ")}>
        <div className="flex items-start gap-3">
          <div className="size-8 rounded-full bg-black text-white text-xs flex items-center justify-center">
            ED
          </div>
          <p className="text-sm flex-1">{text}</p>
        </div>
      <p className="text-xs ml-auto w-fit">{formattedDate}</p>

    </div>
  );
};

export default CommentCard;
