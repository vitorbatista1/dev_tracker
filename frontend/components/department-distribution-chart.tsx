"use client"

import { useEffect, useRef } from "react"

interface DepartmentDistributionChartProps {
  data: {
    labels: string[]
    valores: number[]
  }
}

export function DepartmentDistributionChart({ data }: DepartmentDistributionChartProps) {
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
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) - 60

    // Cores para os departamentos
    const colors = [
      "#3b82f6", // Azul
      "#10b981", // Verde
      "#f59e0b", // Âmbar
      "#8b5cf6", // Roxo
      "#ec4899", // Rosa
    ]

    // Calcular o total
    const total = data.valores.reduce((sum, value) => sum + value, 0)

    // Desenhar o gráfico de pizza
    let startAngle = 0

    data.labels.forEach((label, i) => {
      const sliceAngle = (data.valores[i] / total) * (Math.PI * 2)
      const endAngle = startAngle + sliceAngle

      // Desenhar fatia
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      ctx.fillStyle = colors[i % colors.length]
      ctx.fill()

      // Preparar para a próxima fatia
      startAngle = endAngle
    })

    // Desenhar círculo central (para efeito de donut)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2)
    ctx.fillStyle = "#fff"
    ctx.fill()

    // Desenhar legenda
    const legendX = rect.width - 150
    const legendY = 30
    const legendItemHeight = 25

    data.labels.forEach((label, i) => {
      const y = legendY + i * legendItemHeight

      // Quadrado colorido
      ctx.fillStyle = colors[i % colors.length]
      ctx.fillRect(legendX, y, 15, 15)

      // Texto da legenda
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.textAlign = "left"
      ctx.fillText(`${label} (${data.valores[i]})`, legendX + 25, y + 12)
    })

    // Desenhar total no centro
    ctx.fillStyle = "#000"
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Total", centerX, centerY - 10)
    ctx.font = "bold 24px Arial"
    ctx.fillText(total.toString(), centerX, centerY + 20)
  }, [data])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
