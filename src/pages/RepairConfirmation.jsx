import { useNavigate } from 'react-router-dom'
import './RepairConfirmation.css'

function RepairConfirmation() {
  const navigate = useNavigate()

  return (
    <div className="repair-confirm-page">
      <div className="repair-confirm-card">
        <div className="confirm-icon">🔧</div>
        <h1>Request Received!!</h1>
        <p>Grandpa will contact you via WhatsApp to discuss your repair!!</p>
        <p className="confirm-note">Please prepare your piece for drop-off.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  )
}

export default RepairConfirmation