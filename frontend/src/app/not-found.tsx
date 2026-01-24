import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function NotFound() {
   return (
      <div className="flex flex-col items-center justify-center gap-4">
         <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
               404
            </h1>
            <h2 className="text-xl font-semibold">Page not found</h2>
            <p className="text-muted-foreground max-w-[400px]">
               Sorry, we couldn&apos;t find the page you&apos;re looking for.
               <br />It may have been moved or removed.
            </p>
         </div>

         <div className="flex gap-2">
            <Button asChild variant="default">
               <Link href="/">
                  <ChevronLeft className="h-4 w-4" /> Back
               </Link>
            </Button>
         </div>
      </div>
   );
}