'use client'

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { User, MapPin } from "lucide-react"

const AccountPage = () => {
  const links = [
    {
      href: "/my-account/profile",
      title: "Profile",
      description: "View and update your personal information",
      icon: <User className="w-5 h-5 text-muted-foreground" />,
    },
    {
      href: "/my-account/addresses",
      title: "Addresses",
      description: "Manage your shipping and billing addresses",
      icon: <MapPin className="w-5 h-5 text-muted-foreground" />,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl text-center font-semibold mb-6">Account Center</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition hover:shadow-md rounded-2xl"
          >
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 rounded-md bg-muted">{link.icon}</div>
                <CardTitle className="text-lg">{link.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {link.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AccountPage
