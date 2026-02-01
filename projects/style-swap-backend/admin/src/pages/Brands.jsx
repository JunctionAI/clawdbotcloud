import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2 } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Brands() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/brands')
      setBrands(data)
    } catch (error) {
      console.error('Error fetching brands:', error)
      toast.error('Failed to load brands')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this brand?')) return

    try {
      await axios.delete(`/api/brands/${id}`)
      toast.success('Brand deleted successfully')
      fetchBrands()
    } catch (error) {
      console.error('Error deleting brand:', error)
      toast.error('Failed to delete brand')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brands</h1>
          <p className="text-gray-600 mt-1">{brands.length} total brands</p>
        </div>
        <Link to="/brands/new" className="btn btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Brand
        </Link>
      </div>

      <div className="card">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : brands.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No brands found. Add your first brand!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Partnership</th>
                  <th>Commission</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => (
                  <tr key={brand.id}>
                    <td>
                      <div className="flex items-center">
                        {brand.logo_url && (
                          <img
                            src={brand.logo_url}
                            alt={brand.name}
                            className="w-10 h-10 rounded-lg object-cover mr-3"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {brand.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {brand.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        brand.partnership_status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : brand.partnership_status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {brand.partnership_status || 'None'}
                      </span>
                      {brand.partnership_tier && (
                        <span className="ml-2 text-xs text-gray-500">
                          ({brand.partnership_tier})
                        </span>
                      )}
                    </td>
                    <td>
                      {brand.commission_rate ? `${brand.commission_rate}%` : 'N/A'}
                    </td>
                    <td>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        brand.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {brand.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/brands/${brand.id}/edit`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(brand.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
