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
import { Label } from "@/components/ui/label"
import { FileUp, Plus } from "lucide-react"

interface UploadDocumentDialogProps {
  onUpload: (document: { nome: string; descricao: string; arquivo: File }) => void
}

export function UploadDocumentDialog({ onUpload }: UploadDocumentDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState("")

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      // Verificar tamanho do arquivo (10MB máximo)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setFileError("O arquivo não pode ser maior que 10MB")
        setFile(null)
      } else {
        setFileError("")
        setFile(selectedFile)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setFileError("Por favor, selecione um arquivo")
      return
    }

    onUpload({
      nome: formData.nome || file.name,
      descricao: formData.descricao,
      arquivo: file,
    })

    setFormData({
      nome: "",
      descricao: "",
    })
    setFile(null)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Documento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Enviar Documento</DialogTitle>
            <DialogDescription>Adicione um novo documento ao projeto.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="arquivo" className="text-sm font-medium">
                Arquivo
              </Label>
              <Input id="arquivo" type="file" onChange={handleFileChange} className="cursor-pointer" />
              {fileError && <p className="text-sm text-red-500">{fileError}</p>}
              {file && (
                <p className="text-sm text-green-600">
                  Arquivo selecionado: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome" className="text-sm font-medium">
                Nome do Documento (opcional)
              </Label>
              <Input
                id="nome"
                placeholder="Nome personalizado para o documento"
                value={formData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao" className="text-sm font-medium">
                Descrição (opcional)
              </Label>
              <Textarea
                id="descricao"
                placeholder="Breve descrição do documento"
                rows={3}
                value={formData.descricao}
                onChange={(e) => handleChange("descricao", e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!file}>
              <FileUp className="mr-2 h-4 w-4" />
              Enviar Documento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
