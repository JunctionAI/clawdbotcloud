// ============================================================================
// Type Definitions for Style Swap API Integration
// ============================================================================

// Brand Types
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  description?: string;
  website_url?: string;
  partnership_status?: 'none' | 'pending' | 'active' | 'inactive';
  partnership_tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
  commission_rate?: number;
  contact_email?: string;
  contact_name?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  sort_order: number;
  is_active: boolean;
  children?: Category[];
  created_at: string;
  updated_at: string;
}

// Product Types
export interface Product {
  id: string;
  brand_id: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  price: number;
  sale_price?: number;
  primary_image_url: string;
  color?: string;
  size_range?: string;
  gender?: 'mens' | 'womens' | 'unisex' | 'kids';
  season?: 'spring' | 'summer' | 'fall' | 'winter' | 'all-season';
  stock_status?: 'in_stock' | 'out_of_stock' | 'pre_order' | 'discontinued';
  is_featured: boolean;
  is_active: boolean;
  published_at?: string;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
  brand?: Brand;
  categories?: { category: Category }[];
  tags?: { tag: Tag }[];
  affiliate_links?: AffiliateLink[];
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

// Affiliate Link Types
export interface AffiliateLink {
  id: string;
  product_id: string;
  retailer_name: string;
  retailer_url?: string;
  affiliate_url: string;
  affiliate_network?: string;
  affiliate_id?: string;
  is_primary: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Shopping Cart Types
export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  affiliate_link_id: string;
  quantity: number;
  price_at_addition: number;
  created_at: string;
  updated_at: string;
  product?: Product;
  affiliate_link?: AffiliateLink;
}

export interface Cart {
  id: string;
  session_id: string;
  user_id?: string;
  status: 'active' | 'abandoned' | 'converted';
  expires_at: string;
  created_at: string;
  updated_at: string;
  items: CartItem[];
}

// Analytics Types
export interface ClickEvent {
  id: string;
  affiliate_link_id: string;
  session_id?: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  device_type?: 'desktop' | 'mobile' | 'tablet';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  clicked_at: string;
}

export interface Conversion {
  id: string;
  affiliate_link_id: string;
  click_id?: string;
  order_id: string;
  order_value: number;
  currency: string;
  commission_earned: number;
  commission_rate: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'paid';
  converted_at: string;
  confirmed_at?: string;
  paid_at?: string;
}

export interface AnalyticsOverview {
  totalClicks: number;
  totalConversions: number;
  conversionRate: number;
  totalRevenue: number;
  totalCommission: number;
  avgOrderValue: number;
  period: {
    start_date: string;
    end_date: string;
  };
}

export interface ProductStats {
  id: string;
  name: string;
  slug: string;
  primary_image_url: string;
  brand: { name: string };
  stats: {
    clicks: number;
    conversions: number;
    revenue: number;
    commission: number;
    conversionRate: number;
  };
}

// User Action Types (for local analytics tracking)
export interface UserAction {
  action: 'upload' | 'swap' | 'select_product' | 'view_results' | 'click_buy' | 'add_to_cart' | 'share' | 'download';
  productId?: string;
  productSlug?: string;
  affiliateLinkId?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

// API Response Types
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: PaginationMeta;
}

export interface ApiError {
  error: string;
  errors?: Array<{ msg: string; param: string }>;
}

// API Request Types
export interface ProductFilters {
  page?: number;
  limit?: number;
  brand_id?: string;
  category_id?: string;
  gender?: 'mens' | 'womens' | 'unisex' | 'kids';
  search?: string;
  featured?: boolean;
}

export interface TrackClickRequest {
  affiliate_link_id: string;
  session_id?: string;
  metadata?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  };
}

export interface TrackClickResponse {
  click_id: string;
  redirect_url: string;
}

export interface AddToCartRequest {
  product_id: string;
  affiliate_link_id: string;
  quantity?: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// Commerce Service Types
export interface CheckoutSession {
  sessionId: string;
  redirectUrl: string;
  affiliateLinks: Array<{
    productId: string;
    url: string;
    retailer: string;
  }>;
}
