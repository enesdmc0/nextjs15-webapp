"use client";
import { Button } from "@/components/ui/button";
import { categories } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";
import { useRouter, useParams } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomeIcon, LogOutIcon, Music2Icon, SettingsIcon, User2Icon } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const { slug } = useParams();

  const category = slug ? slug[0] : "all";

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
      <ScrollArea className="h-1/2">
        <div className="space-y-1  mt-5">
          <h2 className=" px-4 text-lg font-semibold tracking-tight">
            Kategoriler
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
                <Link href={`/${key}`}>
                  <Music2Icon className="mr-2 h-4 w-4" />
                  {value}
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
            <Link href="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              Anasayfa
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link href="/ayarlar">
              <SettingsIcon className="mr-2 h-4 w-4" />
              Ayarlar
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link href="/profil">
              <User2Icon className="mr-2 h-4 w-4" />
              Profil
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-auto p-2 border-t">
        <SignOutButton>
          <Button className="w-full">
            Çıkış Yap
            <LogOutIcon className="m-2 h-4 w-4" />
          </Button>
        </SignOutButton>
      </div>
    </div>
  );
};

export default Navbar;
