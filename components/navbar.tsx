"use client";
import { Button } from "@/components/ui/button";
import { categories } from "@/constants";
import { cn } from "@/lib/utils";
import React from "react";
import { Separator } from "./ui/separator";
import { useParams } from "next/navigation";
import { SignOutButton, UserButton, UserProfile } from "@clerk/nextjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useAtom } from "jotai";
import { navbarOpenAtom } from "@/lib/atom";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const { slug } = useParams();
  const [open, setOpen] = useAtom(navbarOpenAtom);

  const category = slug ? slug[0] : "all";

  return (
    <div
      className={cn(
        " transition-all duration-400 h-screen sticky left-0 top-0 flex flex-col group border-r ",
        open ? "w-52" : "hidden"
      )}
    >
      {/* logo */}
      <div className="flex items-center justify-center h-[52px] font-mono tracking-widest font-semibold text-lg ">
        <p className={cn("", open ? "" : "hidden")}>enesdmc</p>
        {/* <UserButton/> */}
      </div>
      <Separator />

      {/* categories */}
      <ScrollArea className="h-1/2">
        <div className="space-y-1  mt-5">
          <h2
            className={cn(
              " px-4 text-lg font-semibold tracking-tight flex items-center  gap-2",
              open ? "justify-start" : "justify-center"
            )}
          >
            <p className={cn("", open ? "" : "hidden")}>Kategoriler</p>
          </h2>
          <Separator />
          <div className="p-2">
            {Object.entries(categories).map(([key, value], i) => (
              <Button
                asChild
                key={i}
                variant={category === key ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Link href={`/${key}`} className="space-x-2">
                  <p className={cn("", open ? "" : "hidden")}>{value}</p>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* diğer */}
      <div className="space-y-1 mt-5">
        <Separator />
        <div className="p-2">
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link href="/">Ayarlar</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link href="/">Profil</Link>
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center"></div>
      <div className="mt-auto p-2 border-t space-y-2">
        <ModeToggle />
        <SignOutButton>
          <Button className="w-full">
            <p className={cn("mr-2", open ? "" : "hidden")}>Çıkış Yap</p>
            <LogOutIcon className=" h-4 w-4" />
          </Button>
        </SignOutButton>
      </div>
    </div>
  );
};

export default Navbar;
