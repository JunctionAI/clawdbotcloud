// ============================================================================
// Product Service - Handles product catalog API calls
// ============================================================================

import { backendClient, retryRequest } from './api';
import type { 
  Product, 
  ProductsResponse, 
  ProductFilters, 
  Brand, 
  Category 
} from '../types';

class ProductService {
  /**
   * Get all products with optional filtering and pagination
   */
  async getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
    try {
      const response = await retryRequest(() =>
        backendClient.get<ProductsResponse>('/products', { params: filters })
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }

  /**
   * Get a single product by ID
   */
  async getProductById(id: string): Promise<Product> {
    try {
      const response = await retryRequest(() =>
        backendClient.get<Product>(`/products/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      throw error;
    }
  }

  /**
   * Get a product by slug
   */
  async getProductBySlug(slug: string): Promise<Product> {
    try {
      const response = await retryRequest(() =>
        backendClient.get<Product>(`/products/slug/${slug}`)
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      throw error;
    }
  }

  /**
   * Search products by query
   */
  async searchProducts(query: string, filters?: Omit<ProductFilters, 'search'>): Promise<ProductsResponse> {
    try {
      const response = await retryRequest(() =>
        backendClient.get<ProductsResponse>('/products', {
          params: { ...filters, search: query }
        })
      );
      return response.data;
    } catch (error) {
      console.error('Failed to search products:', error);
      throw error;
    }
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit: number = 10): Promise<ProductsResponse> {
    try {
      const response = await retryRequest(() =>
        backendClient.get<ProductsResponse>('/products', {
          params: { featured: true, limit }
        })
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      throw error;
    }
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(categoryId: string, filters?: ProductFilters): Promise<ProductsResponse> {
    try {
      const response = await retryRequest(() =>
        backendClient.get<ProductsResponse>('/products', {
          params: { ...filters, category_id: categoryId }
        })
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products by category:', error);
      throw error;
    }
  }

  /**
   * Get products by brand
   */
  async getProductsByBrand(brandId: string, filters?: ProductFilters): Promise<ProductsResponse> {
    try {
      const response = await retryRequest(() =>
        backendClient.get<ProductsResponse>('/products', {
          params: { ...filters, brand_id: brandId }
        })
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products by brand:', error);
      throw error;
    }
  }

  /**
   * Get products by gender
   */
  async getProductsByGender(
    gender: 'mens' | 'womens' | 'unisex' | 'kids', 
    filters?: ProductFilters
  ): Promise<ProductsResponse> {
    try {
      const response = await retryRequest(() =>
        backendClient.get<ProductsResponse>('/products', {
          params: { ...filters, gender }
        })
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products by gender:', error);
      throw error;
    }
  }

  /**
   * Get all brands
   */
  async getBrands(): Promise<Brand[]> {
    try {
      const response = await retryRequest(() =>
        backendClient.get<Brand[]>('/brands')
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch brands:', error);
      throw error;
    }
  }

  /**
   * Get brand by ID
   */
  async getBrandById(id: string): Promise<Brand> {
    try {
      const response = await retryRequest(() =>
        backendClient.get<Brand>(`/brands/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch brand:', error);
      throw error;
    }
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    try {
      const response = await retryRequest(() =>
        backendClient.get<Category[]>('/categories')
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  }

  /**
   * Get category by ID
   */
  async getCategoryById(id: string): Promise<Category> {
    try {
      const response = await retryRequest(() =>
        backendClient.get<Category>(`/categories/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch category:', error);
      throw error;
    }
  }
}

export default new ProductService();
