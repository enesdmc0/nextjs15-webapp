import { categories } from "@/constants";
import React from "react";
import { Button } from "./ui/button";
import { useAtom } from "jotai";
import { activeCategoryAtom } from "@/lib/atom";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator"

const Categories = () => {
  const [activeCategory, setActiveCategory] = useAtom(activeCategoryAtom);
  return (
    <div className="p-4 space-x-2 rounded-md ">
      {Object.entries(categories).map(([key, value]) => (
        <Button onClick={() => setActiveCategory(key)} key={key} className={cn("", activeCategory === key ? "bg-muted" : "" )} variant="ghost">
          {value}
        </Button>
      ))}
    </div>
  );
};

export default Categories;
