"use client"

import { useEffect, useRef } from "react"

interface ProjectProgressChartProps {
  data: Array<{
    nome: string
    progresso: number
    prazo: string
  }>
}

export function ProjectProgressChart({ data }: ProjectProgressChartProps) {
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
    const barHeight = 30
    const barGap = 15
    const leftPadding = 150
    const topPadding = 20
    const maxBarWidth = rect.width - leftPadding - 50

    // Desenhar barras de progresso
    data.forEach((projeto, index) => {
      const y = topPadding + index * (barHeight + barGap)

      // Nome do projeto
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.textAlign = "right"
      ctx.fillText(projeto.nome, leftPadding - 10, y + barHeight / 2 + 5)

      // Barra de fundo
      ctx.fillStyle = "#e5e7eb"
      ctx.fillRect(leftPadding, y, maxBarWidth, barHeight)

      // Barra de progresso
      const progressWidth = (projeto.progresso / 100) * maxBarWidth
      ctx.fillStyle = getColorForProgress(projeto.progresso)
      ctx.fillRect(leftPadding, y, progressWidth, barHeight)

      // Texto de porcentagem
      ctx.fillStyle = "#fff"
      ctx.font = "bold 12px Arial"
      ctx.textAlign = "center"
      if (progressWidth > 40) {
        ctx.fillText(`${projeto.progresso}%`, leftPadding + progressWidth / 2, y + barHeight / 2 + 4)
      } else {
        ctx.fillStyle = "#000"
        ctx.fillText(`${projeto.progresso}%`, leftPadding + progressWidth + 20, y + barHeight / 2 + 4)
      }
    })
  }, [data])

  // Função para determinar a cor com base no progresso
  const getColorForProgress = (progress: number) => {
    if (progress < 30) return "#f59e0b" // Amber
    if (progress < 70) return "#3b82f6" // Blue
    return "#10b981" // Green
  }

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
