
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Authentication utilities
export function setUser(user: User) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export function getUser(): User | null {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

export function clearUser() {
  localStorage.removeItem('currentUser');
}

export function isAuthenticated(): boolean {
  return !!getUser();
}

export function isAdmin(): boolean {
  const user = getUser();
  return user ? user.role === 'admin' : false;
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

// Mock data utilities
export function saveUsers(users: User[]) {
  localStorage.setItem('users', JSON.stringify(users));
}

export function getUsers(): User[] {
  const usersStr = localStorage.getItem('users');
  return usersStr ? JSON.parse(usersStr) : [];
}

export function saveProducts(products: Product[]) {
  localStorage.setItem('products', JSON.stringify(products));
}

export function getProducts(): Product[] {
  const productsStr = localStorage.getItem('products');
  return productsStr ? JSON.parse(productsStr) : [];
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}
