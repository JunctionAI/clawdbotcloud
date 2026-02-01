import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Tag, TrendingUp, DollarSign } from 'lucide-react'
import axios from 'axios'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [analyticsRes, productsRes, brandsRes] = await Promise.all([
        axios.get('/api/analytics/overview'),
        axios.get('/api/products?limit=1'),
        axios.get('/api/brands')
      ])

      setStats({
        analytics: analyticsRes.data,
        totalProducts: productsRes.data.pagination?.total || 0,
        totalBrands: brandsRes.data?.length || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  const statCards = [
    {
      name: 'Total Clicks',
      value: stats?.analytics?.totalClicks || 0,
      icon: TrendingUp,
      color: 'bg-blue-500'
    },
    {
      name: 'Conversions',
      value: stats?.analytics?.totalConversions || 0,
      icon: ShoppingBag,
      color: 'bg-green-500'
    },
    {
      name: 'Revenue',
      value: `$${stats?.analytics?.totalRevenue?.toFixed(2) || 0}`,
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      name: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: Tag,
      color: 'bg-orange-500'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to Style Swap Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/products/new"
            className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            <span className="font-medium">Add Product</span>
          </Link>
          <Link
            to="/brands/new"
            className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Tag className="w-5 h-5 mr-2" />
            <span className="font-medium">Add Brand</span>
          </Link>
          <Link
            to="/analytics"
            className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            <span className="font-medium">View Analytics</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h2>
        {stats?.analytics && (
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Conversion Rate</span>
              <span className="font-semibold text-gray-900">
                {stats.analytics.conversionRate}%
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Commission Earned</span>
              <span className="font-semibold text-green-600">
                ${stats.analytics.totalCommission?.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Active Brands</span>
              <span className="font-semibold text-gray-900">{stats.totalBrands}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
