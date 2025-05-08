"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react"

export function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  // Não mostrar o cabeçalho nas páginas de autenticação
  if (pathname.startsWith("/login") || pathname.startsWith("/registro") || pathname.startsWith("/recuperar-senha")) {
    return null
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">ProjetoGest</span>
          </Link>
          <nav className="ml-10 hidden space-x-4 md:flex">
            <Link
              href="/"
              className={`text-sm ${pathname === "/" ? "font-medium text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
            >
              Dashboard
            </Link>
            <Link
              href="/projetos"
              className={`text-sm ${pathname.startsWith("/projetos") ? "font-medium text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
            >
              Projetos
            </Link>
            <Link
              href="/equipe"
              className={`text-sm ${pathname.startsWith("/equipe") ? "font-medium text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
            >
              Equipe
            </Link>
            <Link
              href="/relatorios"
              className={`text-sm ${pathname.startsWith("/relatorios") ? "font-medium text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
            >
              Relatórios
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-500"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} alt={user?.nome || "Avatar"} />
                  <AvatarFallback>
                    {user?.nome
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium">{user?.nome || "Usuário"}</p>
                  <p className="text-xs text-gray-500">{user?.cargo || "Cargo"}</p>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
