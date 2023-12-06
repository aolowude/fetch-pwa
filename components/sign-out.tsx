"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="text-black hover:text-black transition-all w-full"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
