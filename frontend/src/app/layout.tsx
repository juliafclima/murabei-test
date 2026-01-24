import { Metadata } from "next";

import "./globals.css";

import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { BookProvider } from "./context/bookContext";

export const metadata: Metadata = {
  title: 'MyBook',
  description: 'Book manager',
  icons: {
    icon: '/favicon.png'
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-background font-sans antialiased")}>
        <Toaster />
        <div className="flex min-h-screen flex-col">
          <BookProvider>
            <Header />

            <main className="container mx-auto flex-1 px-4 py-6">
              {children}
            </main>
          </BookProvider>
        </div>

        <Footer />
      </body>
    </html>
  );
}
