"use client";

import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

export default function UserSessionProvider({ children }: { children: React.ReactNode}) {
  return <SessionProvider>{children}</SessionProvider>;
}
