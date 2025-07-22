import API from "@/API"
import { AdminSidebar } from "@/components/admin-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { cookies } from "next/headers"
import { BlockUser } from "./BlockUser"

export default async function AdminLayout({children} : {children: React.ReactNode}) {
  const userCookies = await cookies()
  const userData = await API.getuser(userCookies)
  if (!userData.user?.isAdmin) {
    return (
      <BlockUser />
    )
  }
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AdminSidebar />
          <SidebarInset>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
