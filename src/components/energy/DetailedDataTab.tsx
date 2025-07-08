'use client'

import { useState, useEffect } from 'react'

interface DetailedDataTabProps {
  frequency: 'detailed'
}

export function DetailedDataTab({ frequency }: DetailedDataTabProps) {
  const [startDate, setStartDate] = useState('2022-12-28')
  const [startTime, setStartTime] = useState('00:00')
  const [endDate, setEndDate] = useState('2022-12-28')
  const [endTime, setEndTime] = useState('23:45')
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Section and Feeder Selection (like your Streamlit multiselect)
  const [availableSections] = useState(['Production', 'HVAC', 'Lighting', 'Office'])
  const [selectedSections, setSelectedSections] = useState<string[]>(['Production', 'HVAC', 'Lighting', 'Office'])
  const [selectAllSections, setSelectAllSections] = useState(true)
  
  const [availableFeeders] = useState(['Main Feeder 1', 'Main Feeder 2', 'HVAC Unit 1', 'Production Line A'])
  const [selectedFeeders, setSelectedFeeders] = useState<string[]>(['Main Feeder 1', 'Main Feeder 2', 'HVAC Unit 1', 'Production Line A'])
  const [selectAllFeeders, setSelectAllFeeders] = useState(true)

  // Handle Select All Sections
  const handleSelectAllSections = (checked: boolean) => {
    setSelectAllSections(checked)
    if (checked) {
      setSelectedSections(availableSections)
    } else {
      setSelectedSections([])
    }
  }

  // Handle Select All Feeders
  const handleSelectAllFeeders = (checked: boolean) => {
    setSelectAllFeeders(checked)
    if (checked) {
      setSelectedFeeders(availableFeeders)
    } else {
      setSelectedFeeders([])
    }
  }

  const generateReport = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Mock detailed data (like your Streamlit detailed report)
      const mockDetailedData = [
        {
          'S. No.': 1,
          'SECTION': 'Production',
          'Meter Description': 'Production Line A',
          'Initial (KWH)': 1250.5,
          'Final (KWH)': 1298.7,
          'Consumed (KWH)': 48.2
        },
        {
          'S. No.': 2,
          'SECTION': 'Production',
          'Meter Description': 'Production Line B',
          'Initial (KWH)': 980.3,
          'Final (KWH)': 1015.8,
          'Consumed (KWH)': 35.5
        },
        {
          'S. No.': 3,
          'SECTION': 'HVAC',
          'Meter Description': 'HVAC Unit 1',
          'Initial (KWH)': 890.3,
          'Final (KWH)': 915.8,
          'Consumed (KWH)': 25.5
        },
        {
          'S. No.': 4,
          'SECTION': 'HVAC',
          'Meter Description': 'HVAC Unit 2',
          'Initial (KWH)': 750.1,
          'Final (KWH)': 772.4,
          'Consumed (KWH)': 22.3
        },
        {
          'S. No.': 5,
          'SECTION': 'Lighting',
          'Meter Description': 'Floor 1 Lighting',
          'Initial (KWH)': 456.2,
          'Final (KWH)': 468.9,
          'Consumed (KWH)': 12.7
        },
        {
          'S. No.': 6,
          'SECTION': 'Office',
          'Meter Description': 'Office Equipment',
          'Initial (KWH)': 234.8,
          'Final (KWH)': 245.2,
          'Consumed (KWH)': 10.4
        }
      ]
      
      // Filter by selected sections and feeders
      const filteredData = mockDetailedData.filter(item => 
        selectedSections.includes(item.SECTION) && 
        selectedFeeders.includes(item['Meter Description'])
      ).map((item, index) => ({
        ...item,
        'S. No.': index + 1 // Re-index after filtering
      }))
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      setData(filteredData)
      
    } catch (err) {
      setError('Failed to generate detailed report')
    } finally {
      setLoading(false)
    }
  }

  const exportToExcel = () => {
    alert('Excel export with charts will be implemented with database connection')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Energy Data</h2>
        
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section Selection (like your Streamlit multiselect) */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter by Sections</h3>
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectAllSections}
                onChange={(e) => handleSelectAllSections(e.target.checked)}
                className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700">Select All Sections</span>
            </label>
            
            {!selectAllSections && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                {availableSections.map((section) => (
                  <label key={section} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSections.includes(section)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSections([...selectedSections, section])
                        } else {
                          setSelectedSections(selectedSections.filter(s => s !== section))
                        }
                      }}
                      className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{section}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Feeder Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter by Feeders (Meters)</h3>
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectAllFeeders}
                onChange={(e) => handleSelectAllFeeders(e.target.checked)}
                className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700">Select All Feeders</span>
            </label>
            
            {!selectAllFeeders && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                {availableFeeders.map((feeder) => (
                  <label key={feeder} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFeeders.includes(feeder)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFeeders([...selectedFeeders, feeder])
                        } else {
                          setSelectedFeeders(selectedFeeders.filter(f => f !== feeder))
                        }
                      }}
                      className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{feeder}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Generate Report Button */}
        <div className="mb-6">
          <button
            onClick={generateReport}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Detailed Report...
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

        {/* Detailed Data Table */}
        {data.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Detailed Consumption Report</h3>
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
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r">S. No.</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r">Section</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r">Meter Description</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r">Initial (KWH)</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r">Final (KWH)</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Consumed (KWH)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 border-r">{row['S. No.']}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-left text-gray-900 border-r">{row.SECTION}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-left text-gray-900 border-r">{row['Meter Description']}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700 border-r">{row['Initial (KWH)'].toFixed(0)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700 border-r">{row['Final (KWH)'].toFixed(0)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700 font-medium">{row['Consumed (KWH)'].toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Charts Section (Pie and Bar charts like your Streamlit) */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Section-wise Energy Consumption</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg h-64 flex flex-col items-center justify-center border border-blue-200">
                  <div className="text-blue-600 mb-2">📊</div>
                  <p className="text-blue-700 font-medium text-center">Pie Chart</p>
                  <p className="text-blue-600 text-sm text-center mt-1">Section-wise consumption breakdown</p>
                  <p className="text-blue-500 text-xs text-center mt-2">(Will be implemented with Recharts)</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg h-64 flex flex-col items-center justify-center border border-green-200">
                  <div className="text-green-600 mb-2">📈</div>
                  <p className="text-green-700 font-medium text-center">Bar Chart</p>
                  <p className="text-green-600 text-sm text-center mt-1">Comparative energy consumption</p>
                  <p className="text-green-500 text-xs text-center mt-2">(Will be implemented with Recharts)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Data Message */}
        {data.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-lg font-medium text-gray-600">No Data Available</p>
            <p className="text-sm text-gray-500 mt-2">
              Select your filters and click "Generate Report" to view detailed energy consumption data
            </p>
          </div>
        )}
      </div>
    </div>
  )
}