"use client";

// import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import SplashScreen from "./components/SplashScreen";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import React, {useEffect, useState} from "react";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["800"],
});

// export const metadata: Metadata = {
//   title: "Lab Biomedis",
//   description: "Created by Sendi and Velicia",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathName = usePathname()
  const isHome = pathName === "/"
  const [isLoading, setIsLoading] = useState(isHome)

  useEffect(() => {
    if (isLoading) return
  },[isLoading])

  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased bg-[#FF4E05] bg-fixed bg-no-repeat`}>
        {isLoading && isHome ? (
          <SplashScreen finishLoading={() => setIsLoading(false)}/>
        ) : (
        <ClientLayout>
          {children}
        </ClientLayout>
        )}
      </body>
    </html>
  );
}
