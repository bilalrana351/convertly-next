'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FilePenIcon } from "lucide-react"
import { TrashIcon } from "@radix-ui/react-icons"
import deleteDocumentHandler from "@/app/actions/server/document/delete/route";
import Link from "next/link"
export default function DashboardCard({ name, description, fetchDocuments }) {
  return (<Card>
    <CardHeader>
      <CardTitle>{name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
    </CardContent>
    <CardFooter className="flex items-center justify-between">
      <Link href={{
        pathname: "/document",
        query: {
          name: name
        }
      }}>
        <Button variant="ghost" size="icon">
          <FilePenIcon className="h-5 w-5" />
          <span className="sr-only">Edit</span>
        </Button>
      </Link>
      <Button variant="ghost" size="icon" onClick={
        async () => {
          await deleteDocumentHandler(name);
          fetchDocuments();
        }
      }>
        <TrashIcon className="h-5 w-5" />
        <span className="sr-only">Delete</span>
      </Button>
    </CardFooter>
  </Card>)
}