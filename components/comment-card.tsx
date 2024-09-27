import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  text: string;
  createdAt: Date;
  user: {
    name: string;
    image: string;
  };
}

const CommentCard: FC<Props> = ({ text, createdAt, user }) => {
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
    <div className={cn("border rounded-md p-2 ")}>
      <div className="flex items-start gap-2">
        <div className="relative size-8 rounded-full overflow-hidden text-xs flex items-center justify-center">
          <Image src={user.image} fill className="object-cover" alt="" />
        </div>
        <div className="flex flex-col w-full ">
          <div className="flex items-center justify-between ">
            <p className="text-xs underline">{user.name}</p>
            <p className="text-xs ">{formattedDate}</p>
          </div>
          <p className="text-sm flex-1">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
