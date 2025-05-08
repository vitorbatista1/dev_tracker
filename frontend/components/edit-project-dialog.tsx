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
import { Edit, Save } from "lucide-react"

interface Projeto {
  id: number
  titulo: string
  descricao: string
  dataInicio: string
  prazo: string
  responsavel: string
  prioridade: string
  status: string
}

interface EditProjectDialogProps {
  projeto: Projeto
  onSave: (projeto: Projeto) => void
}

export function EditProjectDialog({ projeto, onSave }: EditProjectDialogProps) {
  const [formData, setFormData] = useState<Projeto>({ ...projeto })
  const [open, setOpen] = useState(false)

  const handleChange = (field: keyof Projeto, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Projeto</DialogTitle>
            <DialogDescription>Faça alterações nos detalhes do projeto.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="titulo" className="text-sm font-medium">
                Título do Projeto
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
                rows={4}
                value={formData.descricao}
                onChange={(e) => handleChange("descricao", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="dataInicio" className="text-sm font-medium">
                  Data de Início
                </label>
                <DatePicker
                  id="dataInicio"
                  initialDate={formData.dataInicio}
                  onChange={(date) => handleChange("dataInicio", date)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="prazo" className="text-sm font-medium">
                  Prazo
                </label>
                <DatePicker id="prazo" initialDate={formData.prazo} onChange={(date) => handleChange("prazo", date)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="responsavel" className="text-sm font-medium">
                  Responsável
                </label>
                <Select value={formData.responsavel} onValueChange={(value) => handleChange("responsavel", value)}>
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
                <label htmlFor="prioridade" className="text-sm font-medium">
                  Prioridade
                </label>
                <Select value={formData.prioridade} onValueChange={(value) => handleChange("prioridade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
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
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Atrasado">Atrasado</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
