"use client"

import { useEffect, useRef } from "react"

interface TaskCompletionChartProps {
  data: {
    labels: string[]
    concluidas: number[]
    pendentes: number[]
  }
}

export function TaskCompletionChart({ data }: TaskCompletionChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Simulação de renderização de gráfico
    // Em uma aplicação real, você usaria uma biblioteca como Chart.js
    const canvas = canvasRef.current
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Limpar o canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Configurações do gráfico
    const padding = { top: 30, right: 20, bottom: 40, left: 40 }
    const chartWidth = rect.width - padding.left - padding.right
    const chartHeight = rect.height - padding.top - padding.bottom

    // Encontrar o valor máximo para escala
    const maxValue = Math.max(...data.concluidas, ...data.pendentes) * 1.2

    // Desenhar eixo Y
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, rect.height - padding.bottom)
    ctx.strokeStyle = "#d1d5db"
    ctx.stroke()

    // Desenhar eixo X
    ctx.beginPath()
    ctx.moveTo(padding.left, rect.height - padding.bottom)
    ctx.lineTo(rect.width - padding.right, rect.height - padding.bottom)
    ctx.strokeStyle = "#d1d5db"
    ctx.stroke()

    // Desenhar linhas de grade horizontais
    const gridLines = 5
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartHeight / gridLines) * i
      const value = Math.round(maxValue - (maxValue / gridLines) * i)

      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(rect.width - padding.right, y)
      ctx.strokeStyle = "#f3f4f6"
      ctx.stroke()

      // Valores do eixo Y
      ctx.fillStyle = "#6b7280"
      ctx.font = "12px Arial"
      ctx.textAlign = "right"
      ctx.fillText(value.toString(), padding.left - 10, y + 4)
    }

    // Largura das barras
    const numBars = data.labels.length
    const barWidth = chartWidth / numBars / 3
    const groupWidth = barWidth * 2 + 10

    // Desenhar barras
    data.labels.forEach((label, i) => {
      const x = padding.left + (chartWidth / numBars) * i + chartWidth / numBars / 2 - groupWidth / 2

      // Barra de tarefas concluídas
      const concluidasHeight = (data.concluidas[i] / maxValue) * chartHeight
      ctx.fillStyle = "#10b981" // Verde
      ctx.fillRect(x, rect.height - padding.bottom - concluidasHeight, barWidth, concluidasHeight)

      // Barra de tarefas pendentes
      const pendentesHeight = (data.pendentes[i] / maxValue) * chartHeight
      ctx.fillStyle = "#f59e0b" // Âmbar
      ctx.fillRect(x + barWidth + 10, rect.height - padding.bottom - pendentesHeight, barWidth, pendentesHeight)

      // Labels do eixo X
      ctx.fillStyle = "#6b7280"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(label, x + groupWidth / 2, rect.height - padding.bottom + 20)
    })

    // Legenda
    const legendX = rect.width - 120
    const legendY = padding.top + 10

    // Concluídas
    ctx.fillStyle = "#10b981"
    ctx.fillRect(legendX, legendY, 15, 15)
    ctx.fillStyle = "#000"
    ctx.font = "12px Arial"
    ctx.textAlign = "left"
    ctx.fillText("Concluídas", legendX + 20, legendY + 12)

    // Pendentes
    ctx.fillStyle = "#f59e0b"
    ctx.fillRect(legendX, legendY + 25, 15, 15)
    ctx.fillStyle = "#000"
    ctx.fillText("Pendentes", legendX + 20, legendY + 37)
  }, [data])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
