"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Não redirecionar durante o carregamento inicial
    if (isLoading) return

    // Verificar se o usuário está autenticado
    if (!isAuthenticated) {
      // Não redirecionar se já estiver em uma rota de autenticação
      if (
        !pathname.startsWith("/login") &&
        !pathname.startsWith("/registro") &&
        !pathname.startsWith("/recuperar-senha")
      ) {
        router.push("/login")
      }
    } else {
      // Se estiver autenticado e tentando acessar uma rota de autenticação, redirecionar para o dashboard
      if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/registro") ||
        pathname.startsWith("/recuperar-senha")
      ) {
        router.push("/")
      }
    }
  }, [isAuthenticated, isLoading, pathname, router])

  // Mostrar nada durante o carregamento ou redirecionamento
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  // Se não estiver autenticado e não estiver em uma rota de autenticação, não renderizar nada
  if (
    !isAuthenticated &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/registro") &&
    !pathname.startsWith("/recuperar-senha")
  ) {
    return null
  }

  return <>{children}</>
}
