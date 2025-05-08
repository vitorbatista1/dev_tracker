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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, X } from "lucide-react"

interface Membro {
  id: number
  nome: string
  cargo: string
  email: string
  avatar: string
}

interface ManageTeamDialogProps {
  membrosAtuais: Membro[]
  onSaveTeam: (membros: Membro[]) => void
}

export function ManageTeamDialog({ membrosAtuais, onSaveTeam }: ManageTeamDialogProps) {
  const [open, setOpen] = useState(false)
  const [membros, setMembros] = useState<Membro[]>(membrosAtuais)
  const [searchTerm, setSearchTerm] = useState("")

  // Lista de membros disponíveis para adicionar (simulação)
  const membrosDisponiveis: Membro[] = [
    {
      id: 5,
      nome: "Eduardo Santos",
      cargo: "Desenvolvedor Frontend",
      email: "eduardo@exemplo.com",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 6,
      nome: "Fernanda Lima",
      cargo: "Designer UX",
      email: "fernanda@exemplo.com",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 7,
      nome: "Gabriel Oliveira",
      cargo: "Desenvolvedor Backend",
      email: "gabriel@exemplo.com",
      avatar: "/placeholder-user.jpg",
    },
    { id: 8, nome: "Helena Martins", cargo: "QA Tester", email: "helena@exemplo.com", avatar: "/placeholder-user.jpg" },
  ]

  const membrosFiltrados = membrosDisponiveis.filter(
    (membro) =>
      !membros.some((m) => m.id === membro.id) &&
      (membro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        membro.cargo.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const adicionarMembro = (membro: Membro) => {
    setMembros([...membros, membro])
  }

  const removerMembro = (id: number) => {
    setMembros(membros.filter((membro) => membro.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSaveTeam(membros)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Users className="mr-2 h-4 w-4" />
          Gerenciar Equipe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Gerenciar Equipe do Projeto</DialogTitle>
            <DialogDescription>Adicione ou remova membros da equipe do projeto.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Membros Atuais ({membros.length})</h3>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {membros.map((membro) => (
                  <div key={membro.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={membro.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {membro.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{membro.nome}</div>
                        <div className="text-sm text-gray-500">{membro.cargo}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removerMembro(membro.id)} type="button">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t">
              <h3 className="text-sm font-medium">Adicionar Membros</h3>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou cargo"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {membrosFiltrados.length > 0 ? (
                  membrosFiltrados.map((membro) => (
                    <div key={membro.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={membro.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {membro.nome
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{membro.nome}</div>
                          <div className="text-sm text-gray-500">{membro.cargo}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => adicionarMembro(membro)} type="button">
                        Adicionar
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    {searchTerm ? "Nenhum membro encontrado" : "Todos os membros já foram adicionados"}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
