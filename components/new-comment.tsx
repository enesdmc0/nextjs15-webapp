import React, { useActionState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createComment } from "@/lib/actions";
import { activeQuestionAtom } from "@/lib/atom";
import { useAtomValue } from "jotai";
import { useParams } from "next/navigation";

const NewComment = () => {
  const [data, action, isPending] = useActionState(createComment, null);
  const params = useParams();
  const activeQuestion = Number(params.slug[1]) ?? null;
  return (
    <div className="mt-auto">
      <form action={action}>
        <Textarea name="comment" />
        <input type="text" name="questionId" value={activeQuestion ?? 0} readOnly />
        <Button type="submit" disabled={isPending}>
          Yorum Yap
        </Button>
      </form>
    </div>
  );
};

export default NewComment;
