import Link from "next/link";

export default function Footer() {
   return (
      <footer className="fixed bottom-0 left-0 w-full border-t bg-background z-50">
         <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
            © MyBook. All rights reserved. Developed by{" "}
            <Link
               href="https://www.linkedin.com/in/juliafclima/"
               target="_blank"
               rel="noopener noreferrer"
               className="font-medium underline-offset-4 hover:underline text-foreground transition-colors"
            >
               Juliafclima
            </Link>
         </div>
      </footer>
   );
}
