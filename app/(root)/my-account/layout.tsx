import API from "@/API";
import { cookies } from "next/headers";
import BlockUnauthUser from "./BlockUnauthUser";

// app/(no-layout)/order-confirmation/layout.tsx
export default async function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userCookies = await cookies()
  const userLoginRes = await API.checkLogin({userCookies: userCookies})
  if (!userLoginRes.login) {
    return (
      <BlockUnauthUser />
    )
  }
  return (
  <section className="flex min-h-screen justify-center py-2 px-4">
    {children}
  </section>
  ); // no layout wrapper at all
}
