import { useLocation, useNavigate } from 'react-router-dom'
import './Receipt.css'

function Receipt() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    navigate('/')
    return null
  }

  const { orderCode, name, total, items } = state

  return (
    <div className="receipt-page">
      <div className="receipt-card">
        <div className="receipt-header">
          <h1>Order Confirmed!!</h1>
          <p className="receipt-code">{orderCode}</p>
        </div>

        <div className="receipt-body">
          <p className="receipt-greeting">Thank you, {name}!!</p>
          <p className="receipt-note">
            Grandpa will contact you via WhatsApp to confirm your order!!
          </p>

          <div className="receipt-items">
            {items.map(item => (
              <div key={item.id} className="receipt-item">
                <span>{item.name} × {item.quantity}</span>
                <span>₱{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="receipt-total">
            <strong>Total: ₱{total.toLocaleString()}</strong>
          </div>
        </div>

        <button
          className="receipt-btn"
          onClick={() => navigate('/shop')}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default Receipt