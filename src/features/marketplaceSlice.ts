import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Category = 'All' | 'Vegetables' | 'Fruits' | 'Dairy' | 'Pantry'
export type Product = { id: string; name: string; farm: string; price: number; unit: string; category: Exclude<Category, 'All'>; image: string; tag: string }
type CartItem = { id: string; quantity: number }
type MarketplaceState = { products: Product[]; cart: CartItem[]; category: Category; query: string; isCartOpen: boolean; isSellerOpen: boolean; notice: string | null }

const products: Product[] = [
  { id: 'p1', name: 'Heirloom tomatoes', farm: 'Mango Hill Farm', price: 110, unit: 'per kg', category: 'Vegetables', image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0c?auto=format&fit=crop&w=700&q=80', tag: 'Just picked' },
  { id: 'p2', name: 'Tender green beans', farm: 'Meadow & Co.', price: 85, unit: 'per 500g', category: 'Vegetables', image: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=700&q=80', tag: 'Organic' },
  { id: 'p3', name: 'Wildflower honey', farm: 'Bee Kind Apiary', price: 220, unit: 'per jar', category: 'Pantry', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=700&q=80', tag: 'Small batch' },
  { id: 'p4', name: 'Free-range eggs', farm: 'Sunny Side Farm', price: 145, unit: 'per dozen', category: 'Dairy', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=700&q=80', tag: 'Farm fresh' },
  { id: 'p5', name: 'Sweet Alphonso mangoes', farm: 'Sahyadri Orchard', price: 260, unit: 'per box', category: 'Fruits', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=700&q=80', tag: 'Seasonal' },
  { id: 'p6', name: 'Creamy A2 milk', farm: 'Nandi Dairy', price: 76, unit: 'per litre', category: 'Dairy', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80', tag: 'Delivered daily' },
]

const initialState: MarketplaceState = { products, cart: [], category: 'All', query: '', isCartOpen: false, isSellerOpen: false, notice: null }

const marketplaceSlice = createSlice({
  name: 'marketplace', initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => { state.category = action.payload },
    setQuery: (state, action: PayloadAction<string>) => { state.query = action.payload },
    addToCart: (state, action: PayloadAction<string>) => { const line = state.cart.find(item => item.id === action.payload); if (line) line.quantity += 1; else state.cart.push({ id: action.payload, quantity: 1 }); state.notice = 'Added to your basket' },
    removeFromCart: (state, action: PayloadAction<string>) => { state.cart = state.cart.filter(item => item.id !== action.payload) },
    setCartOpen: (state, action: PayloadAction<boolean>) => { state.isCartOpen = action.payload },
    setSellerOpen: (state, action: PayloadAction<boolean>) => { state.isSellerOpen = action.payload },
    showNotice: (state, action: PayloadAction<string>) => { state.notice = action.payload },
    clearNotice: state => { state.notice = null },
    publishProduct: (state, action: PayloadAction<Product>) => { state.products.unshift(action.payload); state.category = 'All'; state.query = ''; state.isSellerOpen = false; state.notice = `${action.payload.name} is now live in the market` },
  },
})

export const { setCategory, setQuery, addToCart, removeFromCart, setCartOpen, setSellerOpen, showNotice, clearNotice, publishProduct } = marketplaceSlice.actions
export default marketplaceSlice.reducer
