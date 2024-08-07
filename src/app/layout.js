"use client"
import { Inter as FontSans } from "next/font/google";
import "./globals.css"; 
import { cn } from "@/lib/utils"
import Navbar from "./navbar";
import NextAuth from "@/lib/next-auth/NextAuth";
import { usePathname } from "next/navigation";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const disabledNavbar = ["/sign-in"]



export default function RootLayout({ children }) {
  const pathname = usePathname()
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <NextAuth>

            {!disabledNavbar.includes(pathname) && <Navbar /> }
            {children}
          </NextAuth>
          </body>
    </html>
  );
}
