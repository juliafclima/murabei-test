import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

import { deleteBookAction } from "@/app/actions/deleteBook";
import { useBooks } from "@/app/context/bookContext";
import { BookDelete } from "@/app/types/book";

export default function ModalDeleteBook({ id, title }: BookDelete) {
   const { setBooks } = useBooks();

   const handleDelete = async () => {
      try {
         await deleteBookAction(id);

         setBooks((prev) => prev.filter((b) => b.id !== id));

         toast.success("Deleted successfully");
      } catch {
         toast.error("Error deleting");
      }
   };

   return (
      <div className="flex justify-end pr-4">
         <AlertDialog>
            <AlertDialogTrigger>
               <>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                           <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>Delete book</p>
                     </TooltipContent>
                  </Tooltip>
               </>
            </AlertDialogTrigger>

            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                     This action cannot be undone. This will permanently delete the
                     book <strong>{title}</strong> from the database.
                  </AlertDialogDescription>
               </AlertDialogHeader>

               <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                     onClick={handleDelete}
                     className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white"
                  >
                     Confirm Exclusion
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </div>
   );
}
