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
import { useActionState } from "react";
import { createQuestion } from "@/lib/actions";

export function NewQuestion() {
    const [data, action, isPending] = useActionState(createQuestion, null)

    console.log(data)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Soru Sor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yeni Soru Oluştur</DialogTitle>
          <DialogDescription>Test Desc</DialogDescription>
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
                  {Object.entries(categories).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
  
        <DialogFooter>
          <Button type="submit" disabled={isPending}>Oluştur</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
