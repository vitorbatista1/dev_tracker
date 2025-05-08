"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddMemberDialog } from "@/components/add-member-dialog"
import { MemberDetailsDialog } from "@/components/member-details-dialog"
import { MoreHorizontal, Search } from "lucide-react"

interface Membro {
  _id: string
  nome: string
  email: string
  cargo: string
  departamento: string
  avatar?: string
  projetos?: number
  tarefasConcluidas?: number
  dataContratacao?: string
  status?: string
  habilidades?: string[]
}

export default function EquipePage() {
  const [membrosEquipe, setMembrosEquipe] = useState<Membro[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("todos")
  const [selectedMember, setSelectedMember] = useState<Membro | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Verificação de se estamos no client
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    async function fetchMembros() {
      try {
        const res = await fetch("http://localhost:5000/users")
        if (!res.ok) throw new Error("Erro ao buscar membros")
        const data = await res.json()
        const membrosComCamposExtras = data.map((m: any) => ({
          ...m,
          avatar: "/placeholder-user.jpg",
          projetos: Math.floor(Math.random() * 5) + 1,
          tarefasConcluidas: Math.floor(Math.random() * 50) + 10,
          dataContratacao: "01/01/2023",
          status: "Ativo",
          habilidades: [],
          id: m._id, // necessário para usar como key
        }))
        setMembrosEquipe(membrosComCamposExtras)
      } catch (err) {
        console.error("Erro ao carregar membros:", err)
      }
    }

    fetchMembros()
  }, [])

  // Verificar se o valor existe antes de chamar toLowerCase
  const membrosFiltrados = membrosEquipe.filter((membro) => {
    if (!membro?.nome || !membro?.cargo || !membro?.email) return false
    const search = searchTerm.toLowerCase()
    const matchesSearch =
      membro.nome.toLowerCase().includes(search) ||
      membro.cargo.toLowerCase().includes(search) ||
      membro.email.toLowerCase().includes(search)
    const matchesDepartment = departmentFilter === "todos" || membro.departamento === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const handleAddMember = (newMember: Membro) => {
    const membrosComCamposExtras = {
      ...newMember,
      avatar: "/placeholder-user.jpg",
      projetos: Math.floor(Math.random() * 5) + 1,
      tarefasConcluidas: Math.floor(Math.random() * 50) + 10,
      dataContratacao: "01/01/2023",
      status: "Ativo",
      habilidades: [],
      id: newMember._id, 
    }
    setMembrosEquipe((prev) => [...prev, membrosComCamposExtras])
  }

  const openMemberDetails = (membro: Membro) => {
    setSelectedMember(membro)
    setIsDetailsOpen(true)
  }

  const membrosPorDepartamento: Record<string, Membro[]> = {}
  membrosEquipe.forEach((membro) => {
    if (!membrosPorDepartamento[membro.departamento]) {
      membrosPorDepartamento[membro.departamento] = []
    }
    membrosPorDepartamento[membro.departamento].push(membro)
  })

  if (!isClient) return null // Não renderiza no SSR, só no client

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Equipe</h1>
          <p className="text-gray-500 mt-1">Gerencie os membros da sua equipe</p>
        </div>
        <AddMemberDialog onAddMember={handleAddMember} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, cargo ou email"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os departamentos</SelectItem>
              <SelectItem value="Gestão">Gestão</SelectItem>
              <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Qualidade">Qualidade</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="lista">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Membros da Equipe</CardTitle>
              <CardDescription>
                {membrosFiltrados.length} {membrosFiltrados.length === 1 ? "membro" : "membros"} encontrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-3 font-medium">
                  <div className="col-span-5 sm:col-span-3">Nome</div>
                  <div className="col-span-4 sm:col-span-3 hidden sm:block">Email</div>
                  <div className="col-span-3 sm:col-span-2">Cargo</div>
                  <div className="col-span-2 hidden sm:block">Departamento</div>
                  <div className="col-span-4 sm:col-span-2 text-right">Ações</div>
                </div>
                <div className="divide-y">
                  {membrosFiltrados.map((membro) => (
                    <div key={membro.id} className="grid grid-cols-12 gap-2 p-3 items-center">
                      <div className="col-span-5 sm:col-span-3 flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={membro.avatar} alt={membro.nome} />
                          <AvatarFallback>
                            {membro.nome.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium truncate">{membro.nome}</span>
                      </div>
                      <div className="col-span-4 sm:col-span-3 hidden sm:block text-gray-500 truncate">
                        {membro.email}
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-gray-500 truncate">{membro.cargo}</div>
                      <div className="col-span-2 hidden sm:block text-gray-500">{membro.departamento}</div>
                      <div className="col-span-4 sm:col-span-2 text-right">
                        <Button variant="ghost" size="sm" onClick={() => openMemberDetails(membro)}>
                          Detalhes
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Desativar</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                  {membrosFiltrados.length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                      Nenhum membro encontrado com os filtros atuais.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="mt-6">
          <div className="grid gap-6">
            {Object.entries(membrosPorDepartamento).map(([departamento, membros]) => (
              <Card key={departamento}>
                <CardHeader>
                  <CardTitle>{departamento}</CardTitle>
                  <CardDescription>{membros.length} membros</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {membros
                      .filter(
                        (membro) =>
                          searchTerm === "" ||
                          membro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          membro.cargo.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((membro) => (
                        <div
                          key={membro.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => openMemberDetails(membro)}
                        >
                          <div className="flex flex-col items-center text-center">
                            <Avatar className="h-16 w-16 mb-3">
                              <AvatarImage src={membro.avatar} alt={membro.nome} />
                              <AvatarFallback>
                                {membro.nome.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <h3 className="font-medium">{membro.nome}</h3>
                            <p className="text-sm text-gray-500">{membro.cargo}</p>
                            <div className="mt-2 flex flex-wrap justify-center gap-1">
                              <Badge variant="outline" className="text-xs">
                                {membro.projetos} projetos
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Member Details Dialog */}
      {isDetailsOpen && selectedMember && (
        <MemberDetailsDialog
          member={selectedMember}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </div>
  )
}
