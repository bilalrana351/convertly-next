"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import updatePasswordHandler from "@/app/actions/server/user/update/route"
import { protect } from "@/lib/protection"

export default function ChangePasswordPage() {  
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    protect();
  }, []);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match.")
      return
    }

    setLoading(true)

    try {
      const result = await updatePasswordHandler(currentPassword, newPassword, confirmNewPassword)
      if (result.message !== 'success') {
        setErrorMessage(result.message)
      } else {
        setSuccessMessage("Password changed successfully!")
        // Clear the form fields
        setCurrentPassword("")
        setNewPassword("")
        setConfirmNewPassword("")
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the password.")
    } finally {
      setLoading(false)
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
              {errorMessage && <div className="text-red-500 text-sm" role="alert">{errorMessage}</div>}
              {successMessage && <div className="text-green-500 text-sm" role="alert">{successMessage}</div>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="ml-auto" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Update Password"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}