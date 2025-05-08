"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Mail, Phone, User } from "lucide-react"

interface MemberDetailsDialogProps {
  member: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MemberDetailsDialog({ member, open, onOpenChange }: MemberDetailsDialogProps) {
  if (!member) return null

  // Dados de exemplo para projetos do membro
  const projetosMembro = [
    { id: 1, nome: "Redesenho do Website", status: "Em andamento", funcao: "Desenvolvedor Frontend" },
    { id: 2, nome: "Aplicativo Mobile", status: "Em andamento", funcao: "Desenvolvedor Frontend" },
    { id: 3, nome: "Migração de Dados", status: "Concluído", funcao: "Desenvolvedor Frontend" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Membro</DialogTitle>
          <DialogDescription>Informações completas sobre o membro da equipe.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 py-4">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.nome} />
              <AvatarFallback>
                {member.nome
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-xl font-bold">{member.nome}</h2>
              <p className="text-gray-500">{member.cargo}</p>
              <Badge>{member.status}</Badge>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span>Departamento: {member.departamento}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Contratado em: {member.dataContratacao}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>Projetos: {member.projetos}</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {member.habilidades.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="projetos" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projetos">Projetos</TabsTrigger>
            <TabsTrigger value="atividades">Atividades Recentes</TabsTrigger>
          </TabsList>

          <TabsContent value="projetos" className="mt-4 border rounded-md p-4">
            <h3 className="font-medium mb-3">Projetos Atribuídos</h3>
            <div className="space-y-3">
              {projetosMembro.length > 0 ? (
                projetosMembro.map((projeto) => (
                  <div key={projeto.id} className="flex justify-between items-center p-2 border-b">
                    <div>
                      <div className="font-medium">{projeto.nome}</div>
                      <div className="text-sm text-gray-500">Função: {projeto.funcao}</div>
                    </div>
                    <Badge
                      className={
                        projeto.status === "Concluído" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }
                    >
                      {projeto.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">Nenhum projeto atribuído.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="atividades" className="mt-4 border rounded-md p-4">
            <h3 className="font-medium mb-3">Atividades Recentes</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-green-500 pl-3 py-1">
                <div className="text-sm font-medium">Tarefa concluída</div>
                <div className="text-xs text-gray-500">Concluiu "Desenvolvimento do header e footer"</div>
                <div className="text-xs text-gray-500">Hoje, 10:23</div>
              </div>
              <div className="border-l-2 border-blue-500 pl-3 py-1">
                <div className="text-sm font-medium">Comentário adicionado</div>
                <div className="text-xs text-gray-500">Adicionou um comentário no projeto "Redesenho do Website"</div>
                <div className="text-xs text-gray-500">Ontem, 15:45</div>
              </div>
              <div className="border-l-2 border-purple-500 pl-3 py-1">
                <div className="text-sm font-medium">Projeto atribuído</div>
                <div className="text-xs text-gray-500">Foi adicionado ao projeto "Aplicativo Mobile"</div>
                <div className="text-xs text-gray-500">15/04/2025, 09:12</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2">
          <Button variant="outline">Editar Perfil</Button>
          <Button>Enviar Mensagem</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
