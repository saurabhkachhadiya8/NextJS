"use client"

import {
  LayoutDashboard,
  ShoppingBasket,
  User,
  ChevronUp,
  LayoutList,
  Users,
  Settings,
  ListPlus,
  SquareChartGantt,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type SubItem = {
  title: string
  url: string
}

type MenuItem = {
  title: string
  url?: string
  icon?: React.ReactNode
  children?: SubItem[]
}

type SidebarGroupItem = {
  type: "group"
  label: string
  items: MenuItem[]
}

type SidebarItem = SidebarGroupItem

const sidebarItems: SidebarItem[] = [
  {
    type: "group",
    label: "Application",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: <LayoutDashboard />,
      },
      {
        title: "Customer",
        icon: <LayoutList />,
        url: "/customer",
        children: [
          { title: "Customer List", url: "/customerlist" },
          { title: "Add Customer", url: "/addcustomer" },
          { title: "Reminder", url: "/reminder" },
        ],
      },
      {
        title: "Product",
        url: "/product",
        icon: <ShoppingBasket />,
      },
      {
        title: "User Profile",
        url: "/profile",
        icon: <User />,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: <Settings />,
      },
    ],
  },
  {
    type: "group",
    label: "Super Admin",
    items: [
      {
        title: "Members",
        icon: <Users />,
        url: "/members",
        children: [
          { title: "Requested", url: "/requested" },
          { title: "Approved", url: "/approved" },
        ],
      },
      {
        title: "Plan",
        url: "/plan",
        icon: <SquareChartGantt />,
      },
    ],
  },
  {
    type: "group",
    label: "Admin",
    items: [
      {
        title: "Custom Fields",
        url: "/custom-fields",
        icon: <ListPlus />,
      },
      {
        title: "Partner/Team",
        icon: <Users />,
        url: "/partner-team",
        children: [
          { title: "Team", url: "/team" },
          { title: "Partner", url: "/partner" },
        ],
      },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const refs = useRef<Record<string, HTMLDivElement | null>>({})

  const toggle = (key: string) => {
    setOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  useEffect(() => {
    // Auto-open sidebar group if current pathname matches a nested link
    sidebarItems.forEach((group) => {
      group.items.forEach((item) => {
        if (item.children?.some((sub) => pathname === item.url + sub.url)) {
          setOpen((prev) => ({ ...prev, [item.title]: true }))
        }
      })
    })
  }, [pathname])

  return (
    <Sidebar>
      <SidebarContent>
        <Link href="/" className="text-center p-4 font-bold text-lg hover:underline">
          Admin
        </Link>

        {sidebarItems.map((group, groupIdx) => (
          <SidebarGroup key={groupIdx}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const hasChildren = item.children && item.children.length > 0
                  const isOpen = open[item.title]

                  if (hasChildren && item.url) {
                    const refKey = item.title

                    return (
                      <SidebarMenuItem key={item.title}>
                        <div className="w-full">
                          <button
                            className={`w-full flex items-center justify-between px-2 py-1 rounded hover:bg-muted transition cursor-pointer`}
                            onClick={() => toggle(refKey)}
                          >
                            <div className={`flex items-center gap-2`}>
                              {item.icon && (
                                <span className="w-4 h-4 flex items-center justify-center">
                                  {item.icon}
                                </span>
                              )}
                              <span>{item.title}</span>
                            </div>
                            <span
                              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                            >
                              <ChevronUp className="h-4 w-4" />
                            </span>
                          </button>

                          {/* Animated Submenu */}
                          <div
                            ref={(el) => { refs.current[refKey] = el }}
                            style={{
                              height: isOpen
                                ? refs.current[refKey]?.scrollHeight
                                : 0,
                            }}
                            className="overflow-hidden transition-all duration-300 ease-in-out"
                          >
                            <SidebarMenu className="ml-4 border-l pl-3 mt-1 space-y-1">
                              {item.children?.map((sub) => {
                                const fullPath = item.url + sub.url;
                                return (
                                  <SidebarMenuItem key={sub.title}>
                                    <SidebarMenuButton
                                      asChild
                                      isActive={pathname === fullPath}
                                    >
                                      <Link href={fullPath}>
                                        <span>{sub.title}</span>
                                      </Link>
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                )
                              })}
                            </SidebarMenu>
                          </div>
                        </div>
                      </SidebarMenuItem>
                    )
                  }

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                      >
                        <Link href={item.url || "#"}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
