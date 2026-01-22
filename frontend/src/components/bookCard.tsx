import { BookResponse } from "@/app/types/book";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import ModalDeleteBook from "./modalDeleteBook";

export default function BookCard({ book }: { book: BookResponse }) {
   return (
      <Card className="h-auto border-none shadow-none bg-stone-100">
         {<ModalDeleteBook id={book.id} title={book.title} />}
         <CardHeader
            className={cn(
               "text-center",
               book.biography ? "space-y-4" : "space-y-2 pb-2",
            )}
         >
            <h2 className="text-4xl font-serif font-bold tracking-tight">
               {book.title}
            </h2>

            <div className="flex flex-col items-center gap-2">
               <span className="text-sm uppercase tracking-[0.2em] text-stone-500">
                  Written by
               </span>
               <p className="text-xl font-medium font-serif">{book.author}</p>
            </div>
         </CardHeader>

         {book.biography && (
            <CardContent className="prose prose-stone prose-p:my-3 mx-auto px-4 pb-5 pt-0">
               <div className="flex justify-center py-2">
                  <Separator className="w-16 bg-stone-300" />
               </div>

               <span className="text-sm uppercase tracking-[0.2em] text-stone-500">
                  Biography
               </span>

               <div
                  className="book-biography leading-relaxed text-lg italic text-stone-700 text-justify"
                  dangerouslySetInnerHTML={{ __html: book.biography }}
               />
            </CardContent>
         )}
      </Card>
   );
}
