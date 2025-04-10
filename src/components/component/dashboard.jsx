/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/I9mjN9EFwiU
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { IBM_Plex_Sans } from 'next/font/google'
import { Rubik } from 'next/font/google'

ibm_plex_sans({
  subsets: ['latin'],
  display: 'swap',
})

rubik({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export function Dashboard() {
  return (
    (<div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <FileIcon className="h-6 w-6" />
          <span className="sr-only">Document Analysis Service</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}>
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}>
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}>
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}>
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col gap-8 p-6 md:p-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your Documents</h1>
          <Button>Add New Document</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Annual Report 2023</CardTitle>
              <CardDescription>Last updated 2 days ago</CardDescription>
            </CardHeader>
            <CardContent>
              <p>A detailed analysis of the company's financial performance in 2023.</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Button variant="ghost" size="icon">
                <FilePenIcon className="h-5 w-5" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon">
                <TrashIcon className="h-5 w-5" />
                <span className="sr-only">Delete</span>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Marketing Strategy 2024</CardTitle>
              <CardDescription>Last updated 1 week ago</CardDescription>
            </CardHeader>
            <CardContent>
              <p>A comprehensive plan to drive growth and reach new customers in the coming year.</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Button variant="ghost" size="icon">
                <FilePenIcon className="h-5 w-5" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon">
                <TrashIcon className="h-5 w-5" />
                <span className="sr-only">Delete</span>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Roadmap Q4 2023</CardTitle>
              <CardDescription>Last updated 3 days ago</CardDescription>
            </CardHeader>
            <CardContent>
              <p>A detailed plan for the development and release of new product features.</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Button variant="ghost" size="icon">
                <FilePenIcon className="h-5 w-5" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon">
                <TrashIcon className="h-5 w-5" />
                <span className="sr-only">Delete</span>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>HR Policies Update</CardTitle>
              <CardDescription>Last updated 1 month ago</CardDescription>
            </CardHeader>
            <CardContent>
              <p>A comprehensive review and update of the company's HR policies and procedures.</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Button variant="ghost" size="icon">
                <FilePenIcon className="h-5 w-5" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon">
                <TrashIcon className="h-5 w-5" />
                <span className="sr-only">Delete</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Document Analysis Service. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}>
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}>
            Terms of Service
          </Link>
        </nav>
      </footer>
    </div>)
  );
}

function FileIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>)
  );
}


function FilePenIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>)
  );
}


function TrashIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>)
  );
}
