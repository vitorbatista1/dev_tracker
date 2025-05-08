"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/date-picker"
import { Plus } from "lucide-react"

interface Tarefa {
  id: number
  titulo: string
  descricao?: string
  status: string
  responsavel: string
  prazo: string
}

interface AddTaskDialogProps {
  onAddTask: (tarefa: Omit<Tarefa, "id">) => void
  projetoId: number
}

export function AddTaskDialog({ onAddTask, projetoId }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Omit<Tarefa, "id">>({
    titulo: "",
    descricao: "",
    status: "Pendente",
    responsavel: "",
    prazo: "",
  })

  const handleChange = (field: keyof Omit<Tarefa, "id">, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTask(formData)
    setFormData({
      titulo: "",
      descricao: "",
      status: "Pendente",
      responsavel: "",
      prazo: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nova Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
            <DialogDescription>Crie uma nova tarefa para o projeto.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="titulo" className="text-sm font-medium">
                Título da Tarefa
              </label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => handleChange("titulo", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="descricao" className="text-sm font-medium">
                Descrição
              </label>
              <Textarea
                id="descricao"
                rows={3}
                value={formData.descricao}
                onChange={(e) => handleChange("descricao", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="responsavel" className="text-sm font-medium">
                  Responsável
                </label>
                <Select
                  value={formData.responsavel}
                  onValueChange={(value) => handleChange("responsavel", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ana Silva">Ana Silva</SelectItem>
                    <SelectItem value="Bruno Costa">Bruno Costa</SelectItem>
                    <SelectItem value="Carla Dias">Carla Dias</SelectItem>
                    <SelectItem value="Daniel Rocha">Daniel Rocha</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="prazo" className="text-sm font-medium">
                  Prazo
                </label>
                <DatePicker id="prazo" onChange={(date) => handleChange("prazo", date)} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Adicionar Tarefa</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
