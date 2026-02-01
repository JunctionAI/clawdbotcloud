import { useEffect, useState } from 'react'
import axios from 'axios'
import { TrendingUp, DollarSign, ShoppingCart, MousePointer } from 'lucide-react'

export default function Analytics() {
  const [overview, setOverview] = useState(null)
  const [topProducts, setTopProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const [overviewRes, productsRes] = await Promise.all([
        axios.get('/api/analytics/overview'),
        axios.get('/api/analytics/top-products?limit=10')
      ])
      setOverview(overviewRes.data)
      setTopProducts(productsRes.data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Performance metrics and insights</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {overview?.totalClicks?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <MousePointer className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {overview?.totalConversions?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {overview?.conversionRate?.toFixed(2) || 0}%
              </p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Commission</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${overview?.totalCommission?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-orange-500 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Clicks</th>
                <th>Conversions</th>
                <th>Revenue</th>
                <th>Commission</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="flex items-center">
                      <img
                        src={product.primary_image_url}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover mr-3"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40'
                        }}
                      />
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.brand?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{product.stats.clicks.toLocaleString()}</td>
                  <td>{product.stats.conversions.toLocaleString()}</td>
                  <td className="font-medium">
                    ${product.stats.revenue.toFixed(2)}
                  </td>
                  <td className="font-medium text-green-600">
                    ${product.stats.commission.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
