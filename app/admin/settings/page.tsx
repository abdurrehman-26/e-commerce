// app/(admin)/settings/page.tsx

import React from "react";
import { Globe, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const SETTINGS_LINKS = [
    {
        title: "Site Metadata",
        description: "Manage site title, description, favicon, and SEO settings.",
        icon: <Globe className="w-6 h-6 text-primary" />,
        link: "/admin/settings/site-meta",
    },
    {
        title: "Homepage Settings",
        description: "Configure banners, featured products, and homepage sections.",
        icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
        link: "/admin/settings/homepage",
    },
]

const page = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Admin</Link>
            </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title */}
      <h1 className="text-2xl font-bold">Admin Settings</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SETTINGS_LINKS.map((LINK) => {
            return (
              <Link key={LINK.title} href={LINK.link}>
                <Card className="flex flex-col h-full cursor-pointer">
                    <CardHeader className="flex flex-row items-center gap-4">
                    <Globe className="w-6 h-6 text-primary" />
                    <CardTitle>{LINK.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground mb-auto line-clamp-3">
                    {LINK.description}
                    </CardContent>
                </Card>
              </Link>
            )
        })}
      </div>
    </div>
  );
};

export default page;
