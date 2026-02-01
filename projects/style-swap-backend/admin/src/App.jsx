import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ProductForm from './pages/ProductForm'
import Brands from './pages/Brands'
import BrandForm from './pages/BrandForm'
import Categories from './pages/Categories'
import Analytics from './pages/Analytics'

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
          
          <Route path="brands" element={<Brands />} />
          <Route path="brands/new" element={<BrandForm />} />
          <Route path="brands/:id/edit" element={<BrandForm />} />
          
          <Route path="categories" element={<Categories />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
