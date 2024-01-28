"use client";

import type { User } from "next-auth";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./DisplayAvatar"
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut , LogIn } from "lucide-react";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";

type Props = {
  user: Pick<User, "name" | "image" | "email">;
};

const UserAccountNav = ({ user }: any) => {


  const currentUser = useUser()

  const clerk = useClerk()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="w-10 h-10"
          user={{
            name: currentUser.user?.fullName || null,
            image: currentUser.user?.imageUrl || null,
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent  align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none z-10">
            <UserButton afterSignOutUrl="/" />
            {currentUser.user?.fullName && <p className="font-medium">{currentUser.user.fullName}</p>}
            {currentUser.user?.emailAddresses[0].emailAddress && (
              <p className="w-[200px] truncate text-sm text-zinc-700">
                {currentUser.user.emailAddresses[0].emailAddress}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem >
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem >
          <Link href="/setting">User Setting</Link>
        </DropdownMenuItem>

        <DropdownMenuItem >
          <Link href="/preference">Preference</Link>
        </DropdownMenuItem>
        <DropdownMenuItem >
          <Link href="/share">Share</Link>
        </DropdownMenuItem>

                
        <DropdownMenuSeparator />
         {/* @ts-ignore */}
        <DropdownMenuItem
          onSelect={async (event: {event:any}) => {
            event.preventDefault();
           await clerk.signOut()
          }}
          className="text-red-600 cursor-pointer"
        >
          Sign out
          <LogOut className="w-4 h-4 ml-2 " />
         </DropdownMenuItem> 
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;