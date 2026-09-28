import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import './Repair.css'

const services = [
  { id: 1, icon: '🧼', name: 'Cleaning', desc: 'Professional cleaning for all jewelry types', price: 'Starting at ₱150' },
  { id: 2, icon: '🔧', name: 'Repair', desc: 'Fix broken clasps, chains, prongs and more', price: 'Price upon inspection' },
  { id: 3, icon: '💍', name: 'Resizing', desc: 'Ring resizing to your perfect fit', price: 'Starting at ₱200' },
  { id: 4, icon: '✨', name: 'Polishing', desc: 'Restore shine and luster to worn pieces', price: 'Starting at ₱100' },
]

function Repair() {
  const [selected, setSelected] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    )
  }

  async function handleSubmit() {
    if (!name || !phone) {
      setError('Please fill in your name and phone!!')
      return
    }

    setLoading(true)

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      navigate('/login')
      return
    }

    const selectedServices = services.filter(s => selected.includes(s.id))

    const { error } = await supabase.from('repairs').insert({
      user_id: session.user.id,
      services: selectedServices,
      status: 'Received',
      notes: notes,
      customer_name: name,
      customer_phone: phone
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/repair-confirmation')
    }
  }

  return (
    <div className="repair-page">
      <div className="repair-header">
        <h1 className="repair-title">Repair Services</h1>
        <p className="repair-sub">Restore your treasured pieces back to life</p>
      </div>

      <div className="services-grid">
        {services.map(service => (
          <div
            key={service.id}
            className={`service-card ${selected.includes(service.id) ? 'selected' : ''}`}
            onClick={() => toggle(service.id)}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-name">{service.name}</h3>
            <p className="service-desc">{service.desc}</p>
            <p className="service-price">{service.price}</p>
            {selected.includes(service.id) && (
              <span className="selected-badge">✓ Selected</span>
            )}
          </div>
        ))}
      </div>

      {selected.length > 0 && !showForm && (
        <div className="repair-cta">
          <p className="cta-text">{selected.length} service(s) selected</p>
          <button className="cta-btn" onClick={() => setShowForm(true)}>
            Request Service
          </button>
        </div>
      )}

      {showForm && (
        <div className="repair-form">
          <h2>Your Details</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            placeholder="Additional notes (optional) — describe your piece, damage, etc."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <div className="form-actions">
            <button className="btn-back" onClick={() => setShowForm(false)}>
              Back
            </button>
            <button className="cta-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Repair