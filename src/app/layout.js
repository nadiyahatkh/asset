import { Inter as FontSans } from "next/font/google";
import "./globals.css"; 
import { cn } from "@/lib/utils"
import Navbar from "./navbar";
import NextAuth from "@/lib/next-auth/NextAuth";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Asset",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  console.log(children)
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <NextAuth>

            <Navbar />
            {children}
          </NextAuth>
          </body>
    </html>
  );
}
