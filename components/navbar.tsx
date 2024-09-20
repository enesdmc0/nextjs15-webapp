"use client";
import { Button } from "@/components/ui/button";
import { categories } from "@/constants";
import { activeCategoryAtom } from "@/lib/atom";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const [activeCategory, setActiveCategory] = useAtom(activeCategoryAtom);

  const diger = {
    anasayfa: "Anasayfa",
    ayarlar: "Ayarlar",
    profil: "Profil",
  };

  return (
    <div
      className={cn(
        "w-60 transition-all duration-400 h-screen sticky left-0 top-0 flex flex-col group border-r "
      )}
    >
      {/* logo */}
      <div className="flex items-center justify-center h-[52px]  ">
        <Image alt="" src="/logo.svg" width={40} height={40} />
      </div>
      <Separator />

      {/* categories */}
      <div className="space-y-1 p-2 mt-10">
        <h2 className=" px-4 text-lg font-semibold tracking-tight">
          Kategoriler
        </h2>
        <Separator />
        {Object.entries(categories).map(([key, value], i) => (
          <Button
            onClick={() => setActiveCategory(key)}
            key={i}
            variant={activeCategory === key ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            {value}
          </Button>
        ))}
      </div>

      {/* diğer */}
      <div className="space-y-1 p-2 mt-10">
      <h2 className=" px-4 text-lg font-semibold tracking-tight">
          Diğer
        </h2>
        <Separator />
        {Object.entries(diger).map(([key, value], i) => (
          <Button
            onClick={() => setActiveCategory(key)}
            key={i}
            variant={activeCategory === key ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            {value}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
