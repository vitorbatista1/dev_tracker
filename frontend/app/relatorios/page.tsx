"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"
import { ProjectProgressChart } from "@/components/project-progress-chart"
import { TaskCompletionChart } from "@/components/task-completion-chart"
import { TeamPerformanceChart } from "@/components/team-performance-chart"
import { DepartmentDistributionChart } from "@/components/department-distribution-chart"
import { Download, FileText } from "lucide-react"

export default function RelatoriosPage() {
  const [periodoFiltro, setPeriodoFiltro] = useState("mes")
  const [departamentoFiltro, setDepartamentoFiltro] = useState("todos")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  })

  // Dados de exemplo para os relatórios
  const projetosData = [
    { nome: "Redesenho do Website", progresso: 75, prazo: "15/08/2025" },
    { nome: "Aplicativo Mobile", progresso: 30, prazo: "22/10/2025" },
    { nome: "Migração de Dados", progresso: 100, prazo: "05/05/2025" },
    { nome: "Sistema de CRM", progresso: 60, prazo: "30/09/2025" },
    { nome: "Portal de Clientes", progresso: 45, prazo: "10/11/2025" },
  ]

  const tarefasData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    concluidas: [12, 19, 15, 22, 18, 24],
    pendentes: [8, 5, 10, 7, 12, 6],
  }

  const desempenhoEquipeData = {
    labels: ["Desenvolvimento", "Design", "Gestão", "Qualidade", "Marketing"],
    valores: [85, 78, 92, 88, 76],
  }

  const distribuicaoDepartamentoData = {
    labels: ["Desenvolvimento", "Design", "Gestão", "Qualidade", "Marketing"],
    valores: [42, 23, 15, 12, 8],
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-gray-500 mt-1">Visualize o desempenho dos projetos e da equipe</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Gerar PDF
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Dados
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="w-full sm:w-auto">
          <Select value={periodoFiltro} onValueChange={setPeriodoFiltro}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semana">Última Semana</SelectItem>
              <SelectItem value="mes">Último Mês</SelectItem>
              <SelectItem value="trimestre">Último Trimestre</SelectItem>
              <SelectItem value="ano">Último Ano</SelectItem>
              <SelectItem value="personalizado">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {periodoFiltro === "personalizado" && (
          <div className="w-full sm:w-auto">
            <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
          </div>
        )}

        <div className="w-full sm:w-auto">
          <Select value={departamentoFiltro} onValueChange={setDepartamentoFiltro}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os departamentos</SelectItem>
              <SelectItem value="desenvolvimento">Desenvolvimento</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="gestao">Gestão</SelectItem>
              <SelectItem value="qualidade">Qualidade</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="projetos">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projetos">Projetos</TabsTrigger>
          <TabsTrigger value="tarefas">Tarefas</TabsTrigger>
          <TabsTrigger value="equipe">Equipe</TabsTrigger>
          <TabsTrigger value="departamentos">Departamentos</TabsTrigger>
        </TabsList>

        <TabsContent value="projetos" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Progresso dos Projetos</CardTitle>
                <CardDescription>Visualização do progresso atual dos projetos ativos</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectProgressChart data={projetosData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Projetos por Status</CardTitle>
                <CardDescription>Distribuição dos projetos por status atual</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="h-full flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="flex flex-col items-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-green-500">4</div>
                      <div className="text-sm text-gray-500">Concluídos</div>
                    </div>
                    <div className="flex flex-col items-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-blue-500">8</div>
                      <div className="text-sm text-gray-500">Em andamento</div>
                    </div>
                    <div className="flex flex-col items-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-amber-500">3</div>
                      <div className="text-sm text-gray-500">Atrasados</div>
                    </div>
                    <div className="flex flex-col items-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-gray-500">2</div>
                      <div className="text-sm text-gray-500">Não iniciados</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Lista de Projetos</CardTitle>
                <CardDescription>Detalhes dos projetos ativos e concluídos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-3 font-medium">
                    <div className="col-span-5">Nome do Projeto</div>
                    <div className="col-span-3">Progresso</div>
                    <div className="col-span-2">Prazo</div>
                    <div className="col-span-2">Status</div>
                  </div>
                  <div className="divide-y">
                    {projetosData.map((projeto, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 p-3 items-center">
                        <div className="col-span-5 font-medium">{projeto.nome}</div>
                        <div className="col-span-3">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${projeto.progresso}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{projeto.progresso}%</span>
                          </div>
                        </div>
                        <div className="col-span-2 text-gray-500">{projeto.prazo}</div>
                        <div className="col-span-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              projeto.progresso === 100
                                ? "bg-green-100 text-green-800"
                                : projeto.progresso < 40
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {projeto.progresso === 100
                              ? "Concluído"
                              : projeto.progresso < 40
                                ? "Inicial"
                                : "Em andamento"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tarefas" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Conclusão de Tarefas</CardTitle>
                <CardDescription>Tarefas concluídas vs. pendentes por mês</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskCompletionChart data={tarefasData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumo de Tarefas</CardTitle>
                <CardDescription>Visão geral das tarefas no período selecionado</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="h-full flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="flex flex-col items-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-green-500">110</div>
                      <div className="text-sm text-gray-500">Concluídas</div>
                    </div>
                    <div className="flex flex-col items-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-blue-500">48</div>
                      <div className="text-sm text-gray-500">Em andamento</div>
                    </div>
                    <div className="flex flex-col items-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-amber-500">23</div>
                      <div className="text-sm text-gray-500">Atrasadas</div>
                    </div>
                    <div className="flex flex-col items-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-purple-500">85%</div>
                      <div className="text-sm text-gray-500">Taxa de conclusão</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="equipe" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Desempenho da Equipe</CardTitle>
                <CardDescription>Avaliação de desempenho por departamento</CardDescription>
              </CardHeader>
              <CardContent>
                <TeamPerformanceChart data={desempenhoEquipeData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Membros Mais Produtivos</CardTitle>
                <CardDescription>Top 5 membros com mais tarefas concluídas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="font-medium w-40">Helena Martins</span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">45</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-40">Bruno Costa</span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "84%" }}></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">42</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-40">Carla Dias</span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">35</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-40">Daniel Rocha</span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "62%" }}></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">31</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-40">Ana Silva</span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "56%" }}></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">28</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departamentos" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Departamento</CardTitle>
                <CardDescription>Número de membros por departamento</CardDescription>
              </CardHeader>
              <CardContent>
                <DepartmentDistributionChart data={distribuicaoDepartamentoData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Carga de Trabalho por Departamento</CardTitle>
                <CardDescription>Número de tarefas atribuídas por departamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="font-medium w-40">Desenvolvimento</span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">85</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-40">Design</span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "62%" }}></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">62</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-40">Gestão</span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">45</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-40">Qualidade</span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "38%" }}></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">38</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-40">Marketing</span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">25</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
