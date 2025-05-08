import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface StatCardProps {
  titulo: string
  valor: string
  descricao: string
  icone: ReactNode
}

export function StatCard({ titulo, valor, descricao, icone }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{titulo}</CardTitle>
        {icone}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{valor}</div>
        <CardDescription>{descricao}</CardDescription>
      </CardContent>
    </Card>
  )
}
