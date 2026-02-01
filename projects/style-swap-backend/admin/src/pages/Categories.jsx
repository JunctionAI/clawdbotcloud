import { useEffect, useState } from 'react'
import axios from 'axios'
import { Folder } from 'lucide-react'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories')
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderCategory = (category, level = 0) => (
    <div key={category.id} style={{ marginLeft: `${level * 24}px` }} className="py-2">
      <div className="flex items-center">
        <Folder className="w-4 h-4 mr-2 text-gray-400" />
        <span className="font-medium text-gray-900">{category.name}</span>
        <span className="ml-2 text-sm text-gray-500">({category.slug})</span>
      </div>
      {category.children && category.children.map(child => renderCategory(child, level + 1))}
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-600 mt-1">Product categories hierarchy</p>
      </div>

      <div className="card">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No categories found
          </div>
        ) : (
          <div>
            {categories.map(category => renderCategory(category))}
          </div>
        )}
      </div>
    </div>
  )
}
