"use client"

import { LayoutDashboard, KanbanSquare, Settings, Users, Bell } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Board", href: "/", icon: KanbanSquare, current: true },
  { name: "Team", href: "#", icon: Users },
  { name: "Notifications", href: "#", icon: Bell },
  { name: "Settings", href: "#", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:flex-col w-64 border-r border-border bg-card/50">
      <div className="flex items-center h-16 px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <KanbanSquare className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">TaskFlow</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || item.current
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-sm font-semibold">
            K
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">kashish</p>
            <p className="text-xs text-muted-foreground truncate">kashishsurana16@mail.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
