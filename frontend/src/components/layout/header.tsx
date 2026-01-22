import Link from "next/link";

import SearchBy from "./searchBy";

export default function Header() {

   return (
      <header className="border-b">
         <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div>
               <Link href="/" className="text-xl font-bold tracking-tight">
                  MyBook
               </Link>
            </div>

            <SearchBy />
         </div>
      </header>
   );
}
