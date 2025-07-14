'use client'
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface RateData {
  fecha: string;
  venta: number;
}

export default function BolivianoUsdGraph() {
  const [rate, setRate] = useState<number | null>(null);
  const [history, setHistory] = useState<RateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch("https://bo.dolarapi.com/v1/dolares/binance");
        const data = await res.json();
        setRate(data.venta);
        // For demo: mock last 7 days using the current rate ± random small change
        const today = new Date();
        const mockHistory: RateData[] = Array.from({ length: 7 }, (_, i) => {
          const d = new Date(today);
          d.setDate(today.getDate() - (6 - i));
          return {
            fecha: d.toISOString().slice(0, 10),
            venta: +(data.venta + (Math.random() - 0.5) * 0.1).toFixed(4),
          };
        });
        setHistory(mockHistory);
      } catch (e) {
        setError("No se pudo obtener la tasa de cambio.");
      } finally {
        setLoading(false);
      }
    }
    fetchRate();
  }, []);

  return (
    <section className="w-full max-w-xl mx-auto bg-white/10 rounded-xl p-6 mt-8 text-white">
      <h2 className="text-2xl font-bold mb-4">Boliviano vs USD</h2>
      {loading ? (
        <div>Cargando tasa de cambio...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <>
          <div className="mb-4">
            <span className="font-semibold">1 USD = </span>
            <span className="text-[hsl(280,100%,70%)] text-xl">{rate}</span>
            <span className="ml-2">BOB</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={history} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" />
              <XAxis dataKey="fecha" stroke="#fff" />
              <YAxis stroke="#fff" domain={[dataMin => Math.floor(dataMin * 0.98), dataMax => Math.ceil(dataMax * 1.02)]} />
              <Tooltip contentStyle={{ background: '#222', color: '#fff' }} />
              <Line type="monotone" dataKey="venta" stroke="#8884d8" strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </section>
  );
}
