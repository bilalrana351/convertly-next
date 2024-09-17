import Link from "next/link"

export function Footer() {
    return (<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <div className="flex justify-center w-full">
          <p className="text-xs text-muted-foreground">&copy; 2024 Document Analysis Service. All rights reserved.</p>
      </div>
  </footer>)
}