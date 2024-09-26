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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categories } from "@/constants";
import { PlusCircleIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { createQuestion } from "@/lib/actions";
import { toast } from "sonner";

export function NewQuestion() {
  const [data, action, isPending] = useActionState(createQuestion, null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!data) return;
    // console.log("[NEW_QUESTION_MODAL_RENDER]");
    if (data?.status === "success") {
      setOpen(false);
      toast.success("Soru başarıyla oluşturuldu.");
    }
  }, [data]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircleIcon className=" h-4 w-4" />
          <p className="hidden md:block">Soru Sor</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yeni Soru Oluştur</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form action={action} className="grid gap-4 py-4">
          <div>
            <Label htmlFor="question">Soru</Label>
            <Input id="question" name="question" />
          </div>
          <div>
            <Label htmlFor="option1">Seçenek 1</Label>
            <Input id="option1" name="option1" />
          </div>
          <div>
            <Label htmlFor="option2">Seçenek 2</Label>
            <Input id="option2" name="option2" />
          </div>
          <div>
            <Label htmlFor="category">Kategori</Label>
            <Select name="category">
              <SelectTrigger>
                <SelectValue placeholder="Kategori Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  {Object.entries(categories)
                    .slice(1)
                    .map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Oluşturuluyor..." : "Oluştur"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
