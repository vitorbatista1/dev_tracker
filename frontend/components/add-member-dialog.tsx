"use client"

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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus } from "lucide-react"
import { toast } from "sonner"

interface AddMemberDialogProps {
  onAddMember: (member: any) => void
}

export function AddMemberDialog({ onAddMember }: AddMemberDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cargo: "",
    departamento: "",
    dataContratacao: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
  
    try {
      const newMember = {
        ...formData,
        id: Date.now().toString(),
        avatar: "/placeholder-user.jpg",
        projetos: 0,
        tarefasConcluidas: 0,
        status: "Ativo",
        habilidades: [],
      }
  
      const promise = fetch("http://localhost:5000/newUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      })
  
      toast.promise(promise, {
        loading: 'Cadastrando membro...',
        success: (response) => {
          if (!response.ok) {
            throw new Error("Erro ao cadastrar")
          }
          return response.json().then(res => {
            onAddMember(res)
            setFormData({
              nome: "",
              email: "",
              cargo: "",
              departamento: "",
              dataContratacao: "",
            })
            setOpen(false)
            return `${formData.nome} foi cadastrado com sucesso!`
          })
        },
        error: (error) => {
          return error.message || "Falha ao cadastrar membro"
        },
        finally: () => {
          setIsLoading(false)
        }
      })
    } catch (error: any) {
      toast.error(error.message || "Erro inesperado", {
        description: error.message || "Ocorreu um erro inesperado",
      })
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar Membro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Membro</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo membro da equipe.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                required
                placeholder="Digite o nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                placeholder="exemplo@empresa.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Input
                  id="cargo"
                  value={formData.cargo}
                  onChange={(e) => handleChange("cargo", e.target.value)}
                  required
                  placeholder="Cargo/Função"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento</Label>
                <Select
                  value={formData.departamento}
                  onValueChange={(value) => handleChange("departamento", value)}
                  required
                >
                  <SelectTrigger id="departamento">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gestão">Gestão</SelectItem>
                    <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Qualidade">Qualidade</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataContratacao">Data de Contratação</Label>
              <Input
                id="dataContratacao"
                type="date"
                value={formData.dataContratacao}
                onChange={(e) => handleChange("dataContratacao", e.target.value)}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Adicionar Membro"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}