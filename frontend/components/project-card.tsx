import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, User, CheckSquare } from "lucide-react"

interface Projeto {
  id: number
  titulo: string
  descricao: string
  progresso: number
  prazo: string
  responsavel: string
  status: string
  tarefas: {
    total: number
    concluidas: number
  }
}

interface ProjectCardProps {
  projeto: Projeto
}

export function ProjectCard({ projeto }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em andamento":
        return "bg-blue-100 text-blue-800"
      case "Concluído":
        return "bg-green-100 text-green-800"
      case "Atrasado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Link href={`/projetos/${projeto.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{projeto.titulo}</CardTitle>
            <Badge className={getStatusColor(projeto.status)}>{projeto.status}</Badge>
          </div>
          <CardDescription>{projeto.descricao}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span>{projeto.progresso}%</span>
            </div>
            <Progress value={projeto.progresso} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gray-500" />
              <span>{projeto.prazo}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span>{projeto.responsavel}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckSquare className="h-4 w-4" />
            <span>
              {projeto.tarefas.concluidas} de {projeto.tarefas.total} tarefas concluídas
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
