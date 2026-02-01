// ============================================================================
// useProducts Hook - React hook for product catalog management
// ============================================================================

import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services';
import type { Product, ProductsResponse, ProductFilters } from '../types';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: ProductsResponse['pagination'] | null;
  searchProducts: (query: string, filters?: Omit<ProductFilters, 'search'>) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  hasMore: boolean;
}

export function useProducts(initialFilters?: ProductFilters): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<ProductsResponse['pagination'] | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters || {});

  // Fetch products
  const fetchProducts = useCallback(async (newFilters?: ProductFilters, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getProducts(newFilters || filters);
      
      setProducts(append ? [...products, ...response.products] : response.products);
      setPagination(response.pagination);
      
      if (newFilters) {
        setFilters(newFilters);
      }
    } catch (err: any) {
      setError(err.error || 'Failed to fetch products');
      console.error('Products fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, products]);

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Search products
  const searchProducts = useCallback(async (
    query: string, 
    additionalFilters?: Omit<ProductFilters, 'search'>
  ) => {
    const newFilters = { ...additionalFilters, search: query, page: 1 };
    await fetchProducts(newFilters);
  }, [fetchProducts]);

  // Load more (pagination)
  const loadMore = useCallback(async () => {
    if (!pagination || pagination.page >= pagination.totalPages) return;
    
    const newFilters = { ...filters, page: pagination.page + 1 };
    await fetchProducts(newFilters, true);
  }, [pagination, filters, fetchProducts]);

  // Refresh
  const refresh = useCallback(async () => {
    const newFilters = { ...filters, page: 1 };
    await fetchProducts(newFilters);
  }, [filters, fetchProducts]);

  const hasMore = pagination ? pagination.page < pagination.totalPages : false;

  return {
    products,
    loading,
    error,
    pagination,
    searchProducts,
    loadMore,
    refresh,
    hasMore,
  };
}

// ============================================================================
// useProduct Hook - Single product fetching
// ============================================================================

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useProduct(productId?: string, productSlug?: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!productId && !productSlug) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const productData = productId 
        ? await productService.getProductById(productId)
        : await productService.getProductBySlug(productSlug!);
      
      setProduct(productData);
    } catch (err: any) {
      setError(err.error || 'Failed to fetch product');
      console.error('Product fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [productId, productSlug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refresh: fetchProduct,
  };
}
