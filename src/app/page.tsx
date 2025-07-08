export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Energy Dashboard</h1>
            <div className="space-x-4">
              <a
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Your existing dashboard content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Energy Monitoring Dashboard
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-700">Total Power</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">234.7 kW</p>
              <p className="text-sm text-gray-500 mt-1">+12% from last hour</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-700">Consumption</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">1,847 kWh</p>
              <p className="text-sm text-gray-500 mt-1">Today's total</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-700">Voltage</h3>
              <p className="text-3xl font-bold text-yellow-600 mt-2">415.2 V</p>
              <p className="text-sm text-gray-500 mt-1">Average L1-L3</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-700">Power Factor</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">0.92</p>
              <p className="text-sm text-gray-500 mt-1">System average</p>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Welcome to Your Energy Dashboard
            </h2>
            <p className="text-gray-600">
              Your professional energy monitoring solution is ready for development!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              App Name: {process.env.NEXT_PUBLIC_APP_NAME}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}