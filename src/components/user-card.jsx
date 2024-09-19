"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import getUsername from "@/app/actions/server/utils/getUsername"
import deleteUserHandler from "@/app/actions/server/user/delete/route"
import logoutHandler from "@/app/actions/server/user/logout/route"

export function UserCard() {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const fetchUsername = async () => {
      const username = await getUsername()
      setUserName(username)
    }
    fetchUsername()
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Options
          </Link>
        </nav>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex justify-center gap-2 p-2">
          <div className="font-semibold">{userName}</div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/change-password" className="w-full text-left">
            <Button variant="ghost" className="w-full text-left">
              Change Password
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="w-full text-left"
            onClick={() => {
              deleteUserHandler();
            }}
          >
            Delete Account
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button variant="ghost" className="w-full text-left" onClick={() => {
            logoutHandler();
          }
        }>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}