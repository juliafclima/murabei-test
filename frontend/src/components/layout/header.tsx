"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BookOpenText } from "lucide-react";

import SearchBy from "./searchBy";
import { cn } from "@/lib/utils";

export default function Header() {
   const pathname = usePathname();
   const isNewBookPage = pathname === "/new-book";

   const [isScrolled, setisScrolled] = useState(false);

   useEffect(() => {
      const onScroll = () => {
         setisScrolled(window.scrollY > 0);
      }

      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
   })

   return (
      <header className={cn(
         "w-full z-50 transition-all duration-200 bg-background",
         isScrolled
            ? "fixed top-0 left-0 border-b shadow-sm"
            : "relative"
      )} >
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
