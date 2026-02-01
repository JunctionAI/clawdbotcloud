import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ArrowLeft, Save } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchBrands()
    fetchCategories()
    if (isEdit) {
      fetchProduct()
    }
  }, [id])

  const fetchBrands = async () => {
    try {
      const { data } = await axios.get('/api/brands')
      setBrands(data)
    } catch (error) {
      console.error('Error fetching brands:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories')
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}`)
      Object.keys(data).forEach(key => {
        setValue(key, data[key])
      })
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Failed to load product')
    }
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      if (isEdit) {
        await axios.put(`/api/products/${id}`, data)
        toast.success('Product updated successfully')
      } else {
        await axios.post('/api/products', data)
        toast.success('Product created successfully')
      }
      navigate('/products')
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={() => navigate('/products')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Products
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card max-w-3xl">
        <div className="space-y-6">
          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand *
            </label>
            <select
              {...register('brand_id', { required: 'Brand is required' })}
              className="input"
            >
              <option value="">Select a brand</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand_id && (
              <p className="text-red-600 text-sm mt-1">{errors.brand_id.message}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="input"
              placeholder="e.g., Air Max 270"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              {...register('slug', { required: 'Slug is required' })}
              className="input"
              placeholder="e.g., nike-air-max-270"
            />
            {errors.slug && (
              <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              className="input"
              rows={4}
              placeholder="Product description..."
            />
          </div>

          {/* Price & Sale Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                {...register('price', { required: 'Price is required' })}
                className="input"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sale Price
              </label>
              <input
                type="number"
                step="0.01"
                {...register('sale_price')}
                className="input"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Primary Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Image URL *
            </label>
            <input
              type="url"
              {...register('primary_image_url', { required: 'Image URL is required' })}
              className="input"
              placeholder="https://example.com/image.jpg"
            />
            {errors.primary_image_url && (
              <p className="text-red-600 text-sm mt-1">{errors.primary_image_url.message}</p>
            )}
          </div>

          {/* Color & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <input
                type="text"
                {...register('color')}
                className="input"
                placeholder="e.g., Black/White"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select {...register('gender')} className="input">
                <option value="">Select gender</option>
                <option value="mens">Men's</option>
                <option value="womens">Women's</option>
                <option value="unisex">Unisex</option>
                <option value="kids">Kids</option>
              </select>
            </div>
          </div>

          {/* Stock Status & Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Status
              </label>
              <select {...register('stock_status')} className="input">
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="pre_order">Pre Order</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </div>
            <div className="flex items-center mt-8">
              <input
                type="checkbox"
                {...register('is_featured')}
                className="w-4 h-4 text-blue-600"
              />
              <label className="ml-2 text-sm text-gray-700">
                Featured Product
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
