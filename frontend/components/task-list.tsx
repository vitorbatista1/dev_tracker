"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "lucide-react"

interface Tarefa {
  id: number
  titulo: string
  status: string
  responsavel: string
  prazo: string
}

interface TaskListProps {
  tarefas: Tarefa[]
}

export function TaskList({ tarefas }: TaskListProps) {
  const [tasks, setTasks] = useState(tarefas)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em andamento":
        return "bg-blue-100 text-blue-800"
      case "Concluído":
        return "bg-green-100 text-green-800"
      case "Pendente":
        return "bg-gray-100 text-gray-800"
      case "Atrasado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const toggleTaskStatus = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: task.status === "Concluído" ? "Em andamento" : "Concluído" } : task,
      ),
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((tarefa) => (
        <div key={tarefa.id} className="flex items-center p-3 border rounded-lg">
          <Checkbox
            id={`task-${tarefa.id}`}
            checked={tarefa.status === "Concluído"}
            onCheckedChange={() => toggleTaskStatus(tarefa.id)}
            className="mr-3"
          />
          <div className="flex-1">
            <label
              htmlFor={`task-${tarefa.id}`}
              className={`font-medium ${tarefa.status === "Concluído" ? "line-through text-gray-500" : ""}`}
            >
              {tarefa.titulo}
            </label>
            <div className="flex items-center gap-4 mt-1 text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>{tarefa.prazo}</span>
              </div>
              <Badge className={getStatusColor(tarefa.status)}>{tarefa.status}</Badge>
            </div>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>
              {tarefa.responsavel
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  )
}
