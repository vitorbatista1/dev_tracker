"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/date-picker"
import { ArrowLeft, Save } from "lucide-react"

export default function NovoProjeto() {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    dataInicio: "",
    prazo: "",
    responsavel: "",
    prioridade: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Dados do formulário:", formData)
    // Aqui você implementaria a lógica para salvar o projeto
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Novo Projeto</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informações do Projeto</CardTitle>
            <CardDescription>Preencha os detalhes do novo projeto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label htmlFor="titulo" className="text-sm font-medium">
                  Título do Projeto
                </label>
                <Input
                  id="titulo"
                  placeholder="Digite o título do projeto"
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
                  placeholder="Descreva o projeto"
                  rows={4}
                  value={formData.descricao}
                  onChange={(e) => handleChange("descricao", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="dataInicio" className="text-sm font-medium">
                  Data de Início
                </label>
                <DatePicker id="dataInicio" onChange={(date) => handleChange("dataInicio", date)} />
              </div>

              <div className="space-y-2">
                <label htmlFor="prazo" className="text-sm font-medium">
                  Prazo
                </label>
                <DatePicker id="prazo" onChange={(date) => handleChange("prazo", date)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="responsavel" className="text-sm font-medium">
                  Responsável
                </label>
                <Select onValueChange={(value) => handleChange("responsavel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ana-silva">Ana Silva</SelectItem>
                    <SelectItem value="bruno-costa">Bruno Costa</SelectItem>
                    <SelectItem value="carla-dias">Carla Dias</SelectItem>
                    <SelectItem value="daniel-rocha">Daniel Rocha</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="prioridade" className="text-sm font-medium">
                  Prioridade
                </label>
                <Select onValueChange={(value) => handleChange("prioridade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-6 flex justify-end gap-2">
            <Link href="/">
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Salvar Projeto
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
