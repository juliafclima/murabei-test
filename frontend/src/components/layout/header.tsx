import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Header() {
   return (
      <header className="border-b">
         <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div>
               <Link href="/" className="text-xl font-bold tracking-tight">
                  MyBook
               </Link>
            </div>

            <nav className="flex items-center gap-4">
               <Input
                  type="search"
                  placeholder="Search by title"
                  className="flex-1"
               />
               <Input
                  type="search"
                  placeholder="Search by author"
                  className="flex-1"
               />

               <Button variant="outline" size="sm" className="rounded-full shrink-0">
                  Search
               </Button>
            </nav>
         </div>
      </header>
   );
}
