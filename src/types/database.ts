
// Database types based on SQL Server schema
export interface Account {
  account_id: number;
  username: string;
  password_hash: string;
  email: string;
  full_name: string;
  role: 0 | 1; // 0: admin, 1: customer
  phone?: string;
  address?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  product_id: number;
  name: string;
  category: number; // Updated to number: 1=Cây có hoa, 2=Mini, 3=Phong thủy
  description?: string;
  price: number;
  stock_quantity: number;
  // Extended properties for UI
  salePrice?: number;
  image?: string;
  images?: string[];
  careInstructions?: {
    light: string;
    water: string;
    temperature: string;
    humidity: string;
  };
  features?: string[];
}

export interface Order {
  order_id: number;
  account_id: number;
  order_date: Date;
  total_amount: number;
  status: 'Chờ xử lý' | 'Đã giao' | 'Đã hủy';
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface Cart {
  cart_id: number;
  account_id: number;
  created_at: Date;
}

export interface CartItem {
  cart_item_id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
}

// Extended types for frontend use
export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface OrderWithDetails extends Order {
  details: OrderDetail[];
  account: Account;
}

// Category mapping utilities
export const CATEGORY_MAPPING = {
  1: "Cây có hoa",
  2: "Mini", 
  3: "Phong thủy"
} as const;

export const getCategoryName = (categoryId: number): string => {
  return CATEGORY_MAPPING[categoryId as keyof typeof CATEGORY_MAPPING] || "Không xác định";
};

export const getCategoryId = (categoryName: string): number => {
  const entries = Object.entries(CATEGORY_MAPPING);
  const found = entries.find(([_, name]) => name === categoryName);
  return found ? parseInt(found[0]) : 2; // Default to Mini
};
