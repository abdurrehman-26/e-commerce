"use client"

import * as React from "react"
import {
  Package,
  Settings,
  ShoppingBasketIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Products",
      url: "/admin/products",
      icon: Package,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingBasketIcon,
    },
  ],
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Button
                variant="ghost"
                className="justify-start cursor-pointer"
                asChild
              >
                <Link href="/admin/settings">
                  <Settings className="w-5 h-5" />
                  <span className="text-sm font-medium">Settings</span>
                </Link>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
