"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import getUsername from "@/app/actions/server/utils/getUsername"
import deleteUserHandler from "@/app/actions/server/user/delete/route"
import logoutHandler from "@/app/actions/server/user/logout/route"

export function UserCard() {
  const [userName, setUserName] = useState("")
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  useEffect(() => {
    const fetchUsername = async () => {
      const username = await getUsername()
      setUserName(username)
    }
    fetchUsername()
  }, [])

  const handleDeleteUser = async () => {
    try {
      await deleteUserHandler()
      // Redirect to login page or show a success message
      window.location.href = "/login"
    } catch (error) {
      console.error("Error deleting user:", error)
      // Handle error (e.g., show an error message to the user)
    }
  }

  return (
    <>
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
              onClick={() => setShowDeleteConfirmation(true)}
            >
              Delete Account
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button variant="ghost" className="w-full text-left" onClick={() => logoutHandler()}>
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser}>Delete Account</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}