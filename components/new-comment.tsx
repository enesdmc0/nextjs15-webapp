import React, { useActionState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createComment } from "@/lib/actions";
import { useParams } from "next/navigation";

const NewComment = () => {
  const [data, action, isPending] = useActionState(createComment, null);
  const params = useParams();
  const activeQuestion = Number(params.slug[1]) ?? null;
  return (
    <div className="px-4 mt-auto">
      <form action={action} className="grid gap-4">
        <Textarea name="comment" placeholder="Yorum Yap..." />
        <input
          type="text"
          name="questionId"
          className="hidden"
          value={activeQuestion ?? 0}
          readOnly
        />
        <Button type="submit" className="ml-auto" disabled={isPending}>
          Yorum Yap
        </Button>
      </form>
    </div>
  );
};

export default NewComment;
