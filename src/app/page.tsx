import BoliviaMapAnimated from "./BoliviaMapAnimated"
import BolivianoUsdGraphSection from "./BolivianoUsdGraphSection"
import DashboardSection from "./components/DashboardSection"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-light tracking-tight text-gray-900 mb-4">
            Bolivia
            <span className="block text-gray-600 font-extralight">en Números</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Datos económicos y sociales de Bolivia visualizados con elegancia y precisión
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Election Countdown */}
          <div className="flex flex-col items-center lg:items-start space-y-8">
            <div className="relative">
              <BoliviaMapAnimated />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full opacity-20 blur-xl"></div>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-light text-gray-800 mb-3">Cuenta Regresiva Electoral</h2>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Sigue el tiempo restante hasta las elecciones generales de Bolivia 2025 y mantente informado sobre el
                proceso democrático.
              </p>
            </div>
          </div>

          {/* Right: USD Graph */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl opacity-30 blur-3xl transform rotate-1"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl shadow-gray-900/5 p-8">
              <BolivianoUsdGraphSection />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-8 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200/30">
            <div className="text-3xl font-light text-gray-900 mb-2">11.8M</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Población</div>
          </div>
          <div className="text-center p-8 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200/30">
            <div className="text-3xl font-light text-gray-900 mb-2">1.099M</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">km² Superficie</div>
          </div>
          <div className="text-center p-8 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200/30">
            <div className="text-3xl font-light text-gray-900 mb-2">La Paz</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Capital</div>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <DashboardSection />
    </main>
  )
}
