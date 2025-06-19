"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"

export function TopNav() {
  const router = useRouter()
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  const handleProfile = () => {
    router.push("/profil")
  }

  const handleLogout = () => {
  localStorage.clear(); // ou removeItem("userEmail") si tu préfères
  window.location.href = '/'; // redirige vers la page publique
  };


  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Search courses, projects..." className="w-64 pl-10 bg-slate-50 border-slate-200" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8 bg-indigo-100 text-indigo-700 ring-2 ring-indigo-300">
                <AvatarFallback className="text-xl font-bold">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || "Utilisateur"}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email || "email@exemple.com"}</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfile}>Profil</DropdownMenuItem>
            <DropdownMenuItem>Paramètres</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
