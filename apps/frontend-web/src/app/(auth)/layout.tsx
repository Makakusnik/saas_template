export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth/auth-client";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session?.data?.user) {
    redirect("/");
  }

  return <>{children}</>;
}
