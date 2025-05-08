"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  id?: string
  className?: string
  onChange: (date: string) => void
  initialDate?: string
}

export function DatePicker({ id, className, onChange, initialDate }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (initialDate) {
      const parts = initialDate.split("/")
      if (parts.length === 3) {
        const [day, month, year] = parts
        return new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
      }
    }
    return undefined
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate)
            if (newDate) {
              onChange(format(newDate, "dd/MM/yyyy"))
            }
          }}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  )
}
