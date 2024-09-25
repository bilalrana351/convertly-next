"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import updatePasswordHandler from "@/app/actions/server/user/update/route"
import { protect } from "@/lib/protection"

export default function ChangePasswordPage() {

  protect();
  
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setErrorMessage("")

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match.")
      return
    }

    try {
      const result = await updatePasswordHandler(currentPassword, newPassword, confirmNewPassword)
      if (result.message) {
        setErrorMessage(result.message)
      } else {
        // Password updated successfully, redirect to dashboard
        router.push("/dashboard")
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the password.")
    }
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <form onSubmit={handlePasswordUpdate}>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Enter your current password and a new password to update your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                <Input
                  id="confirm-new-password"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
              {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="ml-auto">Update Password</Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}