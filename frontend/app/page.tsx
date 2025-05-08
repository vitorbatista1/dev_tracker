"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, BarChart3, Users, CheckCircle, Clock } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { StatCard } from "@/components/stat-card"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const { user } = useAuth()

  // Dados de exemplo para projetos
  const projetos = [
    {
      id: 1,
      titulo: "Redesenho do Website",
      descricao: "Atualização completa do site corporativo",
      progresso: 75,
      prazo: "15/08/2025",
      responsavel: "Ana Silva",
      status: "Em andamento",
      tarefas: { total: 12, concluidas: 9 },
    },
    {
      id: 2,
      titulo: "Aplicativo Mobile",
      descricao: "Desenvolvimento do app para iOS e Android",
      progresso: 30,
      prazo: "22/10/2025",
      responsavel: "Carlos Mendes",
      status: "Em andamento",
      tarefas: { total: 20, concluidas: 6 },
    },
    {
      id: 3,
      titulo: "Migração de Dados",
      descricao: "Transferência para o novo sistema",
      progresso: 100,
      prazo: "05/05/2025",
      responsavel: "Mariana Costa",
      status: "Concluído",
      tarefas: { total: 8, concluidas: 8 },
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col space-y-6 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-500 mt-1">Bem-vindo, {user?.nome || "Usuário"}!</p>
          </div>
          <Link href="/projetos/novo">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Projeto
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            titulo="Total de Projetos"
            valor="12"
            descricao="3 adicionados este mês"
            icone={<BarChart3 className="h-8 w-8 text-blue-500" />}
          />
          <StatCard
            titulo="Projetos Ativos"
            valor="8"
            descricao="5 com alta prioridade"
            icone={<Clock className="h-8 w-8 text-amber-500" />}
          />
          <StatCard
            titulo="Concluídos"
            valor="4"
            descricao="2 concluídos este mês"
            icone={<CheckCircle className="h-8 w-8 text-green-500" />}
          />
          <StatCard
            titulo="Membros da Equipe"
            valor="16"
            descricao="4 gerentes, 12 colaboradores"
            icone={<Users className="h-8 w-8 text-purple-500" />}
          />
        </div>

        <h2 className="text-2xl font-semibold mt-6">Projetos Recentes</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projetos.map((projeto) => (
            <ProjectCard key={projeto.id} projeto={projeto} />
          ))}
        </div>
      </div>
    </main>
  )
}
