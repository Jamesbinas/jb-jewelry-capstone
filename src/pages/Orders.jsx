import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import './Orders.css'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchOrders() {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        navigate('/login')
        return
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error(error)
      } else {
        console.log('orders fetched:', data)
        setOrders(data)
      }
      setLoading(false)
    }
    fetchOrders()
  }, [])

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {loading ? (
        <p className="orders-loading">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <div className="orders-empty">
          <p>No orders yet!!</p>
          <button onClick={() => navigate('/shop')}>Start Shopping</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-code">{order.order_code}</span>
                <span className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₱{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span className="order-date">
                  {new Date(order.created_at).toLocaleDateString('en-PH', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>
                <span className="order-total">
                  Total: ₱{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders