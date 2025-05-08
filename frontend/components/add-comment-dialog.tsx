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
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare } from "lucide-react"

interface AddCommentDialogProps {
  onAddComment: (comentario: string) => void
}

export function AddCommentDialog({ onAddComment }: AddCommentDialogProps) {
  const [open, setOpen] = useState(false)
  const [comentario, setComentario] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (comentario.trim()) {
      onAddComment(comentario)
      setComentario("")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          Comentar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar Comentário</DialogTitle>
            <DialogDescription>Compartilhe suas ideias ou atualizações sobre o projeto.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Escreva seu comentário aqui..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={5}
              required
              className="resize-none"
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!comentario.trim()}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Publicar Comentário
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
