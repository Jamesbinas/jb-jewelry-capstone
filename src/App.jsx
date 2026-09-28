import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Mascot from './components/Mascot'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Repair from './pages/Repair'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { supabase } from './supabase'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Receipt from './pages/Receipt'
import Toast from './components/Toast'
import Orders from './pages/Orders'
import Glitters from './components/Glitters'
import RepairConfirmation from './pages/RepairConfirmation'
import Test from './pages/Test'
import Admin from './pages/Admin'

function App() {
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState('')

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  setToast(`💍 ${product.name} added to cart!!`)
}

  function removeFromCart(productId) {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  return (
    <BrowserRouter>
      <Glitters />
      <Navbar cartCount={cart.length} />
      <Mascot />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        <Route path="/repair" element={<Repair />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart}/>} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/repair-confirmation" element={<RepairConfirmation />} />
        <Route path="/test" element={<Test />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </BrowserRouter>
  )
}

export default App