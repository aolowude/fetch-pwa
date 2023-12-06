// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthStatus from "@/components/auth-status";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Fetch";
const description = "Curate your health and wellness";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster />
        <Suspense fallback="Loading...">{/* <AuthStatus /> */}</Suspense>
        {children}
      </body>
    </html>
  );
}
