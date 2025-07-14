"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function ChartCard({
  data,
  title,
}: {
  data: { date: string; value: number }[]
  title: string
}) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">
            Valor: <span className="font-semibold text-gray-900">{payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/5">
      <h3 className="text-lg font-light text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} dx={-10} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6B7280"
            strokeWidth={2.5}
            dot={{ fill: "#374151", strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, fill: "#374151", strokeWidth: 2, stroke: "#fff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
