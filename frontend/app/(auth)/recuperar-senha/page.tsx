"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail } from "lucide-react"

export default function RecuperarSenhaPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setIsLoading(true)

    try {
      // Simulação de envio de email
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Aqui você implementaria a lógica real de recuperação de senha
      setSuccess(true)
    } catch (err) {
      setError("Ocorreu um erro ao enviar o email. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center">
            <Link href="/login" className="mr-2">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle className="text-2xl font-bold">Recuperar senha</CardTitle>
          </div>
          <CardDescription>Enviaremos um link para redefinir sua senha no seu email</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                <p>{error}</p>
              </div>
            )}

            {success ? (
              <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
                <p>
                  Enviamos um email para <strong>{email}</strong> com instruções para redefinir sua senha. Por favor,
                  verifique sua caixa de entrada.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {!success && (
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar link de recuperação"}
              </Button>
            )}
            <div className="text-center text-sm">
              Lembrou sua senha?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Voltar para o login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
