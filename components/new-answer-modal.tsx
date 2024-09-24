import React, { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PlusCircleIcon } from "lucide-react";
import { createAnswer } from "@/lib/actions";

const NewAnswerModal = () => {
  const [data, action, isPending] = useActionState(createAnswer, null);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Soru Sor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bu Cevap için Emin Misin ?</DialogTitle>
          <DialogDescription>Test Desc</DialogDescription>
        </DialogHeader>
        <Button>Evet</Button>
        <Button>Hayır</Button>

        <DialogFooter>enes demirci</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewAnswerModal;
