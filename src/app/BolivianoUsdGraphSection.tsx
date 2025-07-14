"use client"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Loader2 } from "lucide-react"
import CurrencyConverter from "./CurrencyConverter"

interface RateData {
  fecha: string
  venta: number
}

export default function BolivianoUsdGraphSection() {
  const [rate, setRate] = useState<number | null>(null)
  const [history, setHistory] = useState<RateData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch("https://bo.dolarapi.com/v1/dolares/binance")
        const data = await res.json()
        setRate(data.venta)

        // For demo: mock last 7 days using the current rate ± random small change
        const today = new Date()
        const mockHistory: RateData[] = Array.from({ length: 7 }, (_, i) => {
          const d = new Date(today)
          d.setDate(today.getDate() - (6 - i))
          return {
            fecha: d.toISOString().slice(5, 10), // Show MM-DD format
            venta: +(data.venta + (Math.random() - 0.5) * 0.1).toFixed(4),
          }
        })
        setHistory(mockHistory)
      } catch (e) {
        setError("No se pudo obtener la tasa de cambio.")
      } finally {
        setLoading(false)
        setTimeout(() => setIsVisible(true), 100)
      }
    }
    fetchRate()
  }, [])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">
            Tipo de cambio: <span className="font-semibold text-gray-900">Bs {payload[0].value}</span>
          </p>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-light text-gray-900 mb-1">Boliviano / USD</h3>
            <p className="text-sm text-gray-500">Tipo de cambio en tiempo real</p>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="flex items-center gap-3 text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Cargando datos...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-light text-gray-900 mb-1">Boliviano / USD</h3>
            <p className="text-sm text-gray-500">Tipo de cambio en tiempo real</p>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-2">⚠️</div>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  let dailyChange = 0;
  if (history.length > 1) {
    const last = history[history.length - 1];
    const prev = history[history.length - 2];
    if (prev && last) {
      dailyChange = last.venta - prev.venta;
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-light text-gray-900 mb-1">Boliviano / USD</h3>
          <p className="text-sm text-gray-500">Tipo de cambio en tiempo real</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="text-2xl font-light text-gray-900">{rate?.toFixed(2)}</span>
          </div>
          <div className={`flex items-center gap-1 text-sm ${dailyChange >= 0 ? "text-green-600" : "text-red-600"}`}>
            {dailyChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>
              {dailyChange >= 0 ? "+" : ""}
              {dailyChange.toFixed(4)}
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div
        className={`h-64 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6B7280" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#6B7280" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />
            <XAxis dataKey="fecha" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              dx={-10}
              domain={[
                (dataMin: number) => Math.floor(dataMin * 0.998),
                (dataMax: number) => Math.ceil(dataMax * 1.002),
              ]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="venta"
              stroke="#6B7280"
              strokeWidth={2.5}
              dot={{ fill: "#374151", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#374151", strokeWidth: 2, stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-lg font-light text-gray-900">{Math.min(...history.map((h) => h.venta)).toFixed(4)}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Mínimo</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-light text-gray-900">{Math.max(...history.map((h) => h.venta)).toFixed(4)}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Máximo</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-light text-gray-900">
            {(history.reduce((sum, h) => sum + h.venta, 0) / history.length).toFixed(4)}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Promedio</div>
        </div>
      </div>

      {/* Currency Converter */}
      <div className="mt-10 p-6 bg-white/60 rounded-2xl shadow border border-gray-200/50 max-w-xl mx-auto">
        <h4 className="text-xl font-light text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-gray-500" /> Conversor de Moneda
        </h4>
        <CurrencyConverter rate={rate} />
      </div>
    </div>
  )
}
