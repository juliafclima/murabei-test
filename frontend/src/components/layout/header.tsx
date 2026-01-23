"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";

import SearchBy from "./searchBy";

export default function Header() {
   const pathname = usePathname();
   const isNewBookPage = pathname === "/new-book";

   return (
      <header className="border-b">
         <div className="container mx-auto flex flex-col gap-4 px-4 py-4 md:h-16 md:flex-row md:items-center md:justify-between md:gap-0">
            <Link href="/" className="text-xl font-bold tracking-tight">
               MyBook
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
