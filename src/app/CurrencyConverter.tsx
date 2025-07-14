"use client"
import { useState } from "react"

interface CurrencyConverterProps {
  rate: number | null
}

const currencies = [
  { code: "USD", name: "Dólar estadounidense" },
  // Add more currencies here if you fetch more rates
]

export default function CurrencyConverter({ rate }: CurrencyConverterProps) {
  const [amount, setAmount] = useState(1)
  const [currency, setCurrency] = useState("USD")

  let converted = 0
  if (rate && currency === "USD") {
    converted = amount / rate
  }
  // Add logic for more currencies as needed

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1" htmlFor="bob-amount">
            Monto en Bolivianos (BOB)
          </label>
          <input
            id="bob-amount"
            type="number"
            min={0}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            placeholder="Ingresa el monto en BOB"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1" htmlFor="currency-select">
            Convertir a
          </label>
          <select
            id="currency-select"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
            value={currency}
            onChange={e => setCurrency(e.target.value)}
          >
            {currencies.map(c => (
              <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-center mt-2">
        <span className="text-lg text-gray-700 font-light">
          {amount} BOB = {rate ? converted.toFixed(2) : "-"} {currency}
        </span>
      </div>
      {!rate && (
        <div className="text-center text-sm text-gray-500 mt-2">Tasa de cambio no disponible.</div>
      )}
    </div>
  )
}
