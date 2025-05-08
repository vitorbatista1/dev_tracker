"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Calendar, Clock, FileText, User } from "lucide-react"
import { TaskList } from "@/components/task-list"
import { EditProjectDialog } from "@/components/edit-project-dialog"
import { AddTaskDialog } from "@/components/add-task-dialog"
import { UploadDocumentDialog } from "@/components/upload-document-dialog"
import { ManageTeamDialog } from "@/components/manage-team-dialog"
import { AddCommentDialog } from "@/components/add-comment-dialog"

export default function ProjetoDetalhes() {
  const params = useParams()
  const id = params.id

  // Dados de exemplo para o projeto
  const projeto = {
    id: Number(id),
    titulo: id === "1" ? "Redesenho do Website" : id === "2" ? "Aplicativo Mobile" : "Migração de Dados",
    descricao:
      id === "1"
        ? "Atualização completa do site corporativo com novo design, melhor UX e otimização para dispositivos móveis."
        : id === "2"
          ? "Desenvolvimento do app para iOS e Android com funcionalidades de e-commerce e notificações push."
          : "Transferência de dados do sistema legado para a nova plataforma com validação e limpeza.",
    progresso: id === "1" ? 75 : id === "2" ? 30 : 100,
    dataInicio: id === "1" ? "01/05/2025" : id === "2" ? "15/06/2025" : "10/03/2025",
    prazo: id === "1" ? "15/08/2025" : id === "2" ? "22/10/2025" : "05/05/2025",
    responsavel: id === "1" ? "Ana Silva" : id === "2" ? "Carlos Mendes" : "Mariana Costa",
    status: id === "1" ? "Em andamento" : id === "2" ? "Em andamento" : "Concluído",
    prioridade: id === "1" ? "Alta" : id === "2" ? "Média" : "Alta",
    equipe: [
      { nome: "Ana Silva", cargo: "Gerente de Projeto", avatar: "/placeholder-user.jpg" },
      { nome: "Bruno Costa", cargo: "Desenvolvedor Frontend", avatar: "/placeholder-user.jpg" },
      { nome: "Carla Dias", cargo: "Designer UX/UI", avatar: "/placeholder-user.jpg" },
      { nome: "Daniel Rocha", cargo: "Desenvolvedor Backend", avatar: "/placeholder-user.jpg" },
    ],
    tarefas: [
      {
        id: 1,
        titulo: "Wireframes da página inicial",
        status: "Concluído",
        responsavel: "Carla Dias",
        prazo: "10/05/2025",
      },
      {
        id: 2,
        titulo: "Desenvolvimento do header e footer",
        status: "Concluído",
        responsavel: "Bruno Costa",
        prazo: "20/05/2025",
      },
      {
        id: 3,
        titulo: "Implementação da API de produtos",
        status: "Em andamento",
        responsavel: "Daniel Rocha",
        prazo: "05/06/2025",
      },
      { id: 4, titulo: "Testes de usabilidade", status: "Pendente", responsavel: "Carla Dias", prazo: "15/07/2025" },
      { id: 5, titulo: "Otimização de SEO", status: "Pendente", responsavel: "Bruno Costa", prazo: "01/08/2025" },
    ],
  }

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

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "Alta":
        return "bg-red-100 text-red-800"
      case "Média":
        return "bg-amber-100 text-amber-800"
      case "Baixa":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSaveProject = (projetoAtualizado: any) => {
    console.log("Projeto atualizado:", projetoAtualizado)
    // Aqui você implementaria a lógica para salvar as alterações do projeto
  }

  const handleAddTask = (novaTarefa: any) => {
    console.log("Nova tarefa:", novaTarefa)
    // Aqui você implementaria a lógica para adicionar a tarefa
  }

  const handleUploadDocument = (documento: any) => {
    console.log("Documento enviado:", documento)
    // Aqui você implementaria a lógica para salvar o documento
  }

  const handleSaveTeam = (equipeAtualizada: any) => {
    console.log("Equipe atualizada:", equipeAtualizada)
    // Aqui você implementaria a lógica para salvar a equipe
  }

  const handleAddComment = (comentario: string) => {
    console.log("Novo comentário:", comentario)
    // Aqui você implementaria a lógica para adicionar o comentário
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{projeto.titulo}</h1>
        <div className="ml-auto flex gap-2">
          <EditProjectDialog projeto={projeto} onSave={handleSaveProject} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Projeto</CardTitle>
              <CardDescription>{projeto.descricao}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>{projeto.progresso}%</span>
                </div>
                <Progress value={projeto.progresso} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Status</div>
                  <Badge className={getStatusColor(projeto.status)}>{projeto.status}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Prioridade</div>
                  <Badge className={getPrioridadeColor(projeto.prioridade)}>{projeto.prioridade}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Data de Início
                  </div>
                  <div>{projeto.dataInicio}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Prazo
                  </div>
                  <div>{projeto.prazo}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <User className="h-3 w-3" /> Responsável
                  </div>
                  <div>{projeto.responsavel}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="tarefas">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tarefas">Tarefas</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
              <TabsTrigger value="comentarios">Comentários</TabsTrigger>
            </TabsList>
            <TabsContent value="tarefas" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Tarefas</CardTitle>
                  <AddTaskDialog onAddTask={handleAddTask} projetoId={projeto.id} />
                </CardHeader>
                <CardContent>
                  <TaskList tarefas={projeto.tarefas} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="documentos" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Documentos</CardTitle>
                  <CardDescription>Arquivos e documentos relacionados ao projeto</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 border rounded-lg">
                      <FileText className="h-8 w-8 text-blue-500 mr-3" />
                      <div>
                        <div className="font-medium">Especificação do Projeto.pdf</div>
                        <div className="text-sm text-gray-500">Adicionado em 01/05/2025</div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Baixar
                      </Button>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg">
                      <FileText className="h-8 w-8 text-green-500 mr-3" />
                      <div>
                        <div className="font-medium">Cronograma.xlsx</div>
                        <div className="text-sm text-gray-500">Adicionado em 05/05/2025</div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Baixar
                      </Button>
                    </div>
                    <UploadDocumentDialog onUpload={handleUploadDocument} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comentarios" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Comentários</CardTitle>
                  <CardDescription>Discussões sobre o projeto</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>AS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Ana Silva</span>
                          <span className="text-sm text-gray-500">há 2 dias</span>
                        </div>
                        <p className="mt-1">
                          Precisamos agendar uma reunião para discutir os próximos passos do projeto.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>BC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Bruno Costa</span>
                          <span className="text-sm text-gray-500">há 1 dia</span>
                        </div>
                        <p className="mt-1">
                          Concordo. Também precisamos revisar o cronograma devido às alterações solicitadas pelo
                          cliente.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>EU</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <AddCommentDialog onAddComment={handleAddComment} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Equipe do Projeto</CardTitle>
              <CardDescription>Membros atribuídos a este projeto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projeto.equipe.map((membro, index) => (
                  <div key={index} className="flex items-center gap-3">
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
                ))}
                <ManageTeamDialog membrosAtuais={projeto.equipe} onSaveTeam={handleSaveTeam} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo de Tarefas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Concluídas</span>
                  </div>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Em andamento</span>
                  </div>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span>Pendentes</span>
                  </div>
                  <span className="font-medium">2</span>
                </div>
                <div className="pt-2">
                  <Progress
                    value={40}
                    className="h-2"
                    indicatorClassName="bg-gradient-to-r from-green-500 via-blue-500 to-gray-300"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-green-500 pl-3 py-1">
                  <div className="text-sm font-medium">Tarefa concluída</div>
                  <div className="text-xs text-gray-500">Bruno concluiu "Desenvolvimento do header e footer"</div>
                  <div className="text-xs text-gray-500">Hoje, 10:23</div>
                </div>
                <div className="border-l-2 border-blue-500 pl-3 py-1">
                  <div className="text-sm font-medium">Comentário adicionado</div>
                  <div className="text-xs text-gray-500">Ana adicionou um comentário</div>
                  <div className="text-xs text-gray-500">Ontem, 15:45</div>
                </div>
                <div className="border-l-2 border-purple-500 pl-3 py-1">
                  <div className="text-sm font-medium">Documento adicionado</div>
                  <div className="text-xs text-gray-500">Daniel adicionou "Especificação do Projeto.pdf"</div>
                  <div className="text-xs text-gray-500">01/05/2025, 09:12</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
