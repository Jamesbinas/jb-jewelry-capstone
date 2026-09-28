import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import './Checkout.css'

function Checkout({ cart, setCart }) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  async function handleCheckout() {
    if (!name || !phone) {
      setError('Please fill in all fields!!')
      return
    }

    setLoading(true)

    const orderCode = 'JBJ-2026-' + Math.random().toString(36).slice(2, 6).toUpperCase()

    const { data: { session } } = await supabase.auth.getSession()

    const { error } = await supabase.from('orders').insert({
      user_id: session?.user?.id,
      order_code: orderCode,
      items: cart,
      total: total,
      status: 'Pending',
      customer_name: name,
      customer_phone: phone
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setCart([])
      navigate('/receipt', { state: { orderCode, name, total, items: cart } })
    }
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-summary">
        <h2>Order Summary</h2>
        {cart.map(item => (
          <div key={item.id} className="checkout-item">
            <span>{item.name} × {item.quantity}</span>
            <span>₱{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="checkout-total">
          <strong>Total: ₱{total.toLocaleString()}</strong>
        </div>
      </div>

      <div className="checkout-form">
        <h2>Your Details</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone (include country code e.g. +63, +1, +974"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleCheckout} disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  )
}

export default Checkout