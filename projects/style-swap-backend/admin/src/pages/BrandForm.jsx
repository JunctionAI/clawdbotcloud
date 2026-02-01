import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ArrowLeft, Save } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function BrandForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      fetchBrand()
    }
  }, [id])

  const fetchBrand = async () => {
    try {
      const { data } = await axios.get(`/api/brands/${id}`)
      Object.keys(data).forEach(key => {
        setValue(key, data[key])
      })
    } catch (error) {
      console.error('Error fetching brand:', error)
      toast.error('Failed to load brand')
    }
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      if (isEdit) {
        await axios.put(`/api/brands/${id}`, data)
        toast.success('Brand updated successfully')
      } else {
        await axios.post('/api/brands', data)
        toast.success('Brand created successfully')
      }
      navigate('/brands')
    } catch (error) {
      console.error('Error saving brand:', error)
      toast.error('Failed to save brand')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={() => navigate('/brands')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Brands
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Brand' : 'Add New Brand'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card max-w-3xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Name *
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="input"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              {...register('slug', { required: 'Slug is required' })}
              className="input"
            />
            {errors.slug && (
              <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              className="input"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <input
              type="url"
              {...register('website_url')}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            <input
              type="url"
              {...register('logo_url')}
              className="input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Partnership Status
              </label>
              <select {...register('partnership_status')} className="input">
                <option value="none">None</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Partnership Tier
              </label>
              <select {...register('partnership_tier')} className="input">
                <option value="">Select tier</option>
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commission Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              {...register('commission_rate')}
              className="input"
              placeholder="5.50"
            />
          </div>

          <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              {loading ? 'Saving...' : isEdit ? 'Update Brand' : 'Create Brand'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/brands')}
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
