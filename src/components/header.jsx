import Link from "next/link"
import { FileIcon } from "@radix-ui/react-icons"
export function Header() {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <FileIcon className="h-6 w-6" />
            <span className="sr-only">Document Analysis Service</span>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    Get Started
                </Link>
            </nav>
        </header>
    )
}