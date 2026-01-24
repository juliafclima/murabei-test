"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import { BookOpenText } from "lucide-react";

import SearchBy from "./searchBy";

export default function Header() {
   const pathname = usePathname();
   const isNewBookPage = pathname === "/new-book";

   return (
      <header className="border-b">
         <div className="container mx-auto flex flex-col gap-4 px-4 py-4 md:h-16 md:flex-row md:items-center md:justify-between md:gap-0">
            <Link href="/" className="flex  items-center gap-2 text-xl font-bold tracking-tight">
               <BookOpenText className="h-8 w-8" />  MyBook
            </Link>

            {
               !isNewBookPage && (
                  <SearchBy />

               )
            }
         </div>
      </header>
   );
}
