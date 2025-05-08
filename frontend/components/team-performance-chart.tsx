"use client"

import { useEffect, useRef } from "react"

interface TeamPerformanceChartProps {
  data: {
    labels: string[]
    valores: number[]
  }
}

export function TeamPerformanceChart({ data }: TeamPerformanceChartProps) {
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
    const radius = Math.min(centerX, centerY) - 40

    // Desenhar linhas de referência
    const steps = 5
    for (let i = 1; i <= steps; i++) {
      const currentRadius = (radius / steps) * i

      ctx.beginPath()
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2)
      ctx.strokeStyle = "#e5e7eb"
      ctx.stroke()

      // Valor da linha de referência
      const value = Math.round((100 / steps) * i)
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(value.toString(), centerX, centerY - currentRadius - 5)
    }

    // Desenhar eixos para cada categoria
    const numPoints = data.labels.length
    const angleStep = (Math.PI * 2) / numPoints

    data.labels.forEach((label, i) => {
      const angle = i * angleStep - Math.PI / 2
      const endX = centerX + Math.cos(angle) * radius
      const endY = centerY + Math.sin(angle) * radius

      // Linha do eixo
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(endX, endY)
      ctx.strokeStyle = "#d1d5db"
      ctx.stroke()

      // Label
      const labelX = centerX + Math.cos(angle) * (radius + 20)
      const labelY = centerY + Math.sin(angle) * (radius + 20)

      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(label, labelX, labelY)
    })

    // Desenhar dados
    ctx.beginPath()
    data.valores.forEach((valor, i) => {
      const angle = i * angleStep - Math.PI / 2
      const scaledRadius = (valor / 100) * radius
      const pointX = centerX + Math.cos(angle) * scaledRadius
      const pointY = centerY + Math.sin(angle) * scaledRadius

      if (i === 0) {
        ctx.moveTo(pointX, pointY)
      } else {
        ctx.lineTo(pointX, pointY)
      }
    })

    // Fechar o polígono
    const firstAngle = -Math.PI / 2
    const firstScaledRadius = (data.valores[0] / 100) * radius
    const firstPointX = centerX + Math.cos(firstAngle) * firstScaledRadius
    const firstPointY = centerY + Math.sin(firstAngle) * firstScaledRadius
    ctx.lineTo(firstPointX, firstPointY)

    // Estilo do polígono
    ctx.fillStyle = "rgba(59, 130, 246, 0.2)" // Azul transparente
    ctx.fill()
    ctx.strokeStyle = "rgb(59, 130, 246)" // Azul
    ctx.lineWidth = 2
    ctx.stroke()

    // Desenhar pontos nos vértices
    data.valores.forEach((valor, i) => {
      const angle = i * angleStep - Math.PI / 2
      const scaledRadius = (valor / 100) * radius
      const pointX = centerX + Math.cos(angle) * scaledRadius
      const pointY = centerY + Math.sin(angle) * scaledRadius

      ctx.beginPath()
      ctx.arc(pointX, pointY, 4, 0, Math.PI * 2)
      ctx.fillStyle = "rgb(59, 130, 246)"
      ctx.fill()
    })
  }, [data])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
