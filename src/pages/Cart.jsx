import { useNavigate } from 'react-router-dom'
import './Cart.css'

function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty!!</p>
          <button onClick={() => navigate('/shop')}>Browse Collection</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>₱{item.price.toLocaleString()} × {item.quantity}</p>
                </div>
                <div className="cart-item-right">
                  <p className="cart-item-total">
                    ₱{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    className="cart-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ₱{total.toLocaleString()}</h2>
            <button
              className="cart-checkout"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart