"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Vote, Users } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function BoliviaMapAnimated() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Election date: August 17, 2025
  const electionDate = new Date("2025-08-17T00:00:00-04:00") // Bolivia timezone (BOT)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = electionDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [mounted, electionDate])

  const timeUnits = [
    { label: "Días", value: timeLeft.days, icon: Calendar },
    { label: "Horas", value: timeLeft.hours, icon: Clock },
    { label: "Minutos", value: timeLeft.minutes, icon: Clock },
    { label: "Segundos", value: timeLeft.seconds, icon: Clock },
  ]

  if (!mounted) {
    return (
      <div className="w-full max-w-2xl">
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Cargando...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Header */}
      <div
        className={`text-center mb-12 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Vote className="w-8 h-8 text-gray-700" />
          <h2 className="text-4xl font-light text-gray-900">Elecciones 2025</h2>
        </div>
        <p className="text-xl text-gray-600 mb-2">Cuenta regresiva hacia las elecciones generales</p>
        <p className="text-sm text-gray-500">17 de Agosto, 2025</p>
      </div>

      {/* Countdown Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {timeUnits.map((unit, index) => {
          const Icon = unit.icon
          return (
            <div
              key={unit.label}
              className={`
                relative bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 text-center
                transition-all duration-700 ease-out hover:bg-white/80 hover:shadow-lg hover:shadow-gray-900/5
                ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}
              `}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>
              </div>

              {/* Number */}
              <div className="mb-2">
                <div className="text-4xl md:text-5xl font-light text-gray-900 tabular-nums">
                  {unit.value.toString().padStart(2, "0")}
                </div>
              </div>

              {/* Label */}
              <div className="text-sm text-gray-600 uppercase tracking-wide font-medium">{unit.label}</div>

              {/* Pulse animation for seconds */}
              {unit.label === "Segundos" && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-200/20 to-gray-300/20 animate-pulse" />
              )}
            </div>
          )
        })}
      </div>

      {/* Election Info */}
      <div
        className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200/30 p-8 transition-all duration-1000 delay-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-light text-gray-900 mb-2">Elecciones Generales</h3>
          <p className="text-gray-600">Presidente, Vicepresidente y Asamblea Legislativa Plurinacional</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="p-3 bg-white rounded-xl mb-3 shadow-sm">
              <Users className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-lg font-light text-gray-900">~8.7M</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">Electores Habilitados</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-3 bg-white rounded-xl mb-3 shadow-sm">
              <Vote className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-lg font-light text-gray-900">Nacional</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">Alcance</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-3 bg-white rounded-xl mb-3 shadow-sm">
              <Calendar className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-lg font-light text-gray-900">Domingo</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">Día de Votación</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className={`mt-8 transition-all duration-1000 delay-1200 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Tiempo transcurrido</span>
          <span>Faltan {timeLeft.days} días</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-gray-400 to-gray-600 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${Math.max(0, Math.min(100, ((new Date().getTime() - new Date("2024-08-17").getTime()) / (electionDate.getTime() - new Date("2024-08-17").getTime())) * 100))}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
