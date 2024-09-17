// Client page file 
'use client'

import { useState } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import signupHandler from '@/app/actions/server/user/signup/route'  // Adjust this import path as needed

export default function Component() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handlesignup = async (e) => {
    e.preventDefault()
    setError("")
    console.log(confirmPassword)
    try {
      const result = await signupHandler(username, password, confirmPassword)
      
      if (result && result.message) {
        // If there's a message, it means there was an error
        setError(result.message)
      }
      // If successful, the server action will handle the redirect
    } catch (error) {
      console.error('Error during signup:', error)
      setError("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <form onSubmit={handlesignup}>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>Sign Up to access the Document Analysis Service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Enter your username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline" prefetch={false}>
                  Login
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="ml-auto">Signup</Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}