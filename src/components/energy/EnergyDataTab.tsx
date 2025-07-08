'use client'

import { useState } from 'react'

interface EnergyDataTabProps {
  frequency: '15min' | 'hourly'
}

export function EnergyDataTab({ frequency }: EnergyDataTabProps) {
  const [startDate, setStartDate] = useState('2022-12-28')
  const [startTime, setStartTime] = useState('00:00')
  const [endDate, setEndDate] = useState('2022-12-28')
  const [endTime, setEndTime] = useState('23:45')
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateReport = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Mock data for layout - replace with real API later
      const mockData = [
        {
          timeRange: '2022-12-28 00:00 to 00:15',
          'Production Line': 45.2,
          'HVAC System': 23.1,
          'Lighting': 12.5,
          'Office Equipment': 8.3
        },
        {
          timeRange: '2022-12-28 00:15 to 00:30',
          'Production Line': 47.8,
          'HVAC System': 24.2,
          'Lighting': 13.1,
          'Office Equipment': 9.1
        },
        {
          timeRange: '2022-12-28 00:30 to 00:45',
          'Production Line': 46.5,
          'HVAC System': 22.8,
          'Lighting': 12.9,
          'Office Equipment': 8.7
        },
        {
          timeRange: '2022-12-28 00:45 to 01:00',
          'Production Line': 48.1,
          'HVAC System': 25.3,
          'Lighting': 11.8,
          'Office Equipment': 9.4
        }
      ]
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setData(mockData)
      
    } catch (err) {
      setError('Failed to generate report')
    } finally {
      setLoading(false)
    }
  }

  const exportToExcel = () => {
    alert('Excel export functionality will be implemented with database connection')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {frequency === '15min' ? '15-Minute' : 'Hourly'} Energy Data
        </h2>
        
        {/* Date Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Start Date & Time</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">End Date & Time</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Generate Report Button */}
        <div className="mb-6">
          <button
            onClick={generateReport}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Report...
              </div>
            ) : (
              'Generate Report'
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Data Table */}
        {data.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Energy Consumption Data</h3>
              <button
                onClick={exportToExcel}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors cursor-pointer"
              >
                Download Excel
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    {data.length > 0 && Object.keys(data[0]).map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50 cursor-pointer">
                      {Object.values(row).map((value: any, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`px-6 py-4 whitespace-nowrap text-sm border-r ${
                            cellIndex === 0 ? 'text-left text-gray-900' : 'text-center text-gray-700'
                          }`}
                        >
                          {typeof value === 'number' ? value.toFixed(1) : value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Data Message */}
        {data.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            Click "Generate Report" to view energy consumption data
          </div>
        )}
      </div>
    </div>
  )
}