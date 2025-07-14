"use client"

import { useState, useEffect } from "react"
import { TrendingUp, DollarSign, Users, Building2 } from "lucide-react"
import { fetchIndicator } from "@/lib/worldbank"
import ChartCard from "./ChartCard"

type CategoryKey = "External Sector" | "Monetary" | "Growth & Fiscal" | "Labor & Demographics";

const categories: CategoryKey[] = [
  "External Sector",
  "Monetary",
  "Growth & Fiscal",
  "Labor & Demographics",
];

interface Indicator {
  label: string;
  code: string;
}

const indicatorConfig: Record<CategoryKey, Indicator[]> = {
  "External Sector": [
    { label: "External Debt (USD)", code: "DT.DOD.DLXF.CD" },
    { label: "Reserves (USD)", code: "FI.RES.TOTL.CD" },
    { label: "Exports (USD)", code: "NE.EXP.GNFS.CD" },
    { label: "Exchange Rate (BOB/USD)", code: "PA.NUS.FCRF" },
  ],
  Monetary: [
    { label: "Inflation (% annual)", code: "FP.CPI.TOTL.ZG" },
    { label: "Real Interest Rate", code: "FR.INR.RINR" },
  ],
  "Growth & Fiscal": [
    { label: "GDP (USD)", code: "NY.GDP.MKTP.CD" },
    { label: "GDP Growth (%)", code: "NY.GDP.MKTP.KD.ZG" },
  ],
  "Labor & Demographics": [
    { label: "Unemployment Rate", code: "SL.UEM.TOTL.ZS" },
    { label: "Population Total", code: "SP.POP.TOTL" },
  ],
};

const categoryIcons: Record<CategoryKey, React.ElementType> = {
  "External Sector": DollarSign,
  Monetary: TrendingUp,
  "Growth & Fiscal": Building2,
  "Labor & Demographics": Users,
};

export default function DashboardSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("External Sector")

  // Get indicator configs for the active category
  const activeIndicators = indicatorConfig[activeCategory];

  // State to hold fetched data for all indicators
  const [indicatorData, setIndicatorData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          activeIndicators.map((indicator) =>
            fetchIndicator(indicator.code)
          )
        );
        if (!cancelled) {
          setIndicatorData(results);
        }
      } catch (err: any) {
        setError("Error fetching data");
        setIndicatorData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
    return () => { cancelled = true; };
  }, [activeCategory]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-light text-gray-900 mb-4">Indicadores Económicos</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explora los principales indicadores económicos de Bolivia con datos históricos y tendencias actuales
        </p>
      </div>

      {/* Category Toggle */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => {
          const Icon = categoryIcons[category as keyof typeof categoryIcons]
          const isActive = activeCategory === category

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-900/25"
                    : "bg-white/60 text-gray-700 hover:bg-white/80 border border-gray-200/50"
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{category}</span>
            </button>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 flex items-center justify-center h-72">Cargando...</div>
        ) : error ? (
          <div className="col-span-2 flex items-center justify-center h-72 text-red-500">{error}</div>
        ) : (
          activeIndicators.map((indicator, index) => {
            const dataArr = indicatorData[index] || [];
            const chartData = dataArr.map((item: any) => ({
              date: item.date || item.fecha || "",
              value: item.value ?? item.venta ?? 0,
            })).filter((d: any) => d.date && typeof d.value === "number");
            return (
              <div
                key={indicator.code}
                className="opacity-0 animate-fadeInUp"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <ChartCard data={chartData} title={indicator.label} />
            </div>
          );
        }))}
      </div>

      {/* Stats Summary */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/30">
          <div className="text-2xl font-light text-gray-900 mb-2">
            {activeIndicators.length}
          </div>
          <div className="text-sm text-gray-600 uppercase tracking-wide">Indicadores</div>
        </div>
        <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/30">
          <div className="text-2xl font-light text-gray-900 mb-2">2019-2023</div>
          <div className="text-sm text-gray-600 uppercase tracking-wide">Período</div>
        </div>
        <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/30">
          <div className="text-2xl font-light text-gray-900 mb-2">Banco Mundial</div>
          <div className="text-sm text-gray-600 uppercase tracking-wide">Fuente</div>
        </div>
        <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/30">
          <div className="text-2xl font-light text-gray-900 mb-2">Actualizado</div>
          <div className="text-sm text-gray-600 uppercase tracking-wide">2024</div>
        </div>
      </div>
    </section>
  )
}
