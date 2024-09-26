"use client";
import { Button } from "@/components/ui/button";
import { categories } from "@/constants";
import { cn } from "@/lib/utils";
import React from "react";
import { Separator } from "./ui/separator";
import { useParams } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HomeIcon,
  LogOutIcon,
  Music2Icon,
  SettingsIcon,
  TableOfContents,
  TentTree,
  User2Icon,
} from "lucide-react";
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
        open ? "w-60" : "hidden"
      )}
    >
      {/* logo */}
      <div className="flex items-center justify-center h-[52px] font-mono tracking-widest font-semibold text-lg ">
        <TentTree className={cn("", open ? "hidden" : "")} />
        <p className={cn("", open ? "" : "hidden")}>enesdmc</p>
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
            <TableOfContents className="size-5" />
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
                  <Music2Icon className="h-4 w-4" />
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
            <Link href="/" className="space-x-2">
              <HomeIcon className=" h-4 w-4" />
              <p className={cn("", open ? "" : "hidden")}>Anasayfa</p>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link href="/ayarlar" className="space-x-2">
              <SettingsIcon className="h-4 w-4" />
              <p className={cn("", open ? "" : "hidden")}>Anasayfa</p>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link href="/profil" className="space-x-2">
              <User2Icon className="h-4 w-4" />
              <p className={cn("", open ? "" : "hidden")}>Anasayfa</p>
            </Link>
          </Button>
        </div>
      </div>
      <ModeToggle />
      <div className="mt-auto p-2 border-t">
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
