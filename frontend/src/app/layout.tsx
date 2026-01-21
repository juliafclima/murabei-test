import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <div className="flex min-h-screen flex-col">
          <Header />

          <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
