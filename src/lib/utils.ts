
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "@/integrations/supabase/client";
import { Product, CartItem, User } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Cart utilities
export function getCart(): CartItem[] {
  const cartStr = localStorage.getItem('cart');
  return cartStr ? JSON.parse(cartStr) : [];
}

export function addToCart(product: Product, quantity: number = 1) {
  const cart = getCart();
  const existingItem = cart.find(item => item.productId === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId: number) {
  let cart = getCart();
  cart = cart.filter(item => item.productId !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartItemQuantity(productId: number, quantity: number) {
  let cart = getCart();
  const item = cart.find(item => item.productId === productId);
  
  if (item) {
    item.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

export function clearCart() {
  localStorage.setItem('cart', JSON.stringify([]));
}

export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// User/Product utilities for localStorage (used for mock data)
export function saveUsers(users: User[]): void {
  localStorage.setItem('users', JSON.stringify(users));
}

export function getUsers(): User[] {
  const usersStr = localStorage.getItem('users');
  return usersStr ? JSON.parse(usersStr) : [];
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem('products', JSON.stringify(products));
}

export async function getProducts(): Promise<Product[]> {
  // First try to get products from Supabase
  try {
    const products = await getProductsFromSupabase();
    if (products && products.length > 0) {
      return products;
    }
    
    // Fall back to localStorage if no products in Supabase
    const productsStr = localStorage.getItem('products');
    return productsStr ? JSON.parse(productsStr) : [];
  } catch (err) {
    // If Supabase query fails, fall back to localStorage
    console.error("Error fetching products from Supabase:", err);
    const productsStr = localStorage.getItem('products');
    return productsStr ? JSON.parse(productsStr) : [];
  }
}

// Utility function to get products from Supabase
export async function getProductsFromSupabase(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) {
    console.error('Error fetching products from Supabase:', error);
    throw error;
  }
  
  return data || [];
}

// Function to get product by ID
export async function getProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
  
  return data;
}
