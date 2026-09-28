import { useState, useRef } from 'react'
import './Mascot.css'

const faqs = [
  { q: "Where are you located?", a: "We're at 123 Jewelry Street, Philippines! Come visit us anytime!!" },
  { q: "What are your store hours?", a: "Mon-Sat: 9AM-7PM, Sunday: 10AM-5PM!!" },
  { q: "How do I place an order?", a: "Browse our Shop, add items, and checkout! Cash on pickup!!" },
  { q: "How do custom orders work?", a: "Click Inquire on any Custom Made item and fill the form. We'll contact you via WhatsApp!!" },
  { q: "How long does repair take?", a: "Usually 3-7 days depending on the work needed!!" },
  { q: "What payment methods?", a: "Cash on pickup only for now. GCash/Maya coming soon!!" },
  { q: "How do I track my order?", a: "Log in to your account and check your order history!!" },
  { q: "How do I contact you directly?", a: "WhatsApp or call us at +63 912 345 6789!!" },
]

function Mascot() {
  const [open, setOpen] = useState(false)
  const [answer, setAnswer] = useState(null)
  const [flying, setFlying] = useState(false)
  const mascotRef = useRef(null)
  const glitterInterval = useRef(null)

  const spawnGlitter = () => {
    if (!mascotRef.current) return
    const rect = mascotRef.current.getBoundingClientRect()
    const glitter = document.createElement('div')
    glitter.className = 'glitter'
    glitter.style.left = `${rect.left + rect.width / 2}px`
    glitter.style.top = `${rect.top + rect.height / 2}px`
    glitter.innerHTML = ['✨','⭐','💛','🌟'][Math.floor(Math.random() * 4)]
    document.body.appendChild(glitter)
    setTimeout(() => glitter.remove(), 500)
  }

  const handleOpen = () => {
    if (flying || open) return
    setFlying(true)

    const mascot = mascotRef.current
    const duration = 2500
    const start = performance.now()

    glitterInterval.current = setInterval(spawnGlitter, 80)

    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const x = -progress * 600
      const y = -200 * Math.sin(progress * Math.PI * 2) - (progress * 400)
      mascot.style.transform = `translate(${x}px, ${y}px)`

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        clearInterval(glitterInterval.current)
        mascot.style.transform = ''
        setFlying(false)
        setTimeout(() => setOpen(true))
      }
    }

    requestAnimationFrame(animate)
  }

  const handleClose = () => {
    setOpen(false)
    setAnswer(null)
  }

  return (
    <>
      <div
        ref={mascotRef}
        className={`mascot ${flying ? 'flying' : ''}`}
        onClick={handleOpen}
      />

      {open && (
        <div className="mascot-overlay">
          <div className="mascot-box">
            <div className="mascot-header">
              <div className="mascot-avatar-sprite" />
              <div>
                <h3>Hi!! I'm Jewel!!</h3>
                <p>Ask me anything about JB Jewelry!!</p>
              </div>
              <button className="mascot-close" onClick={handleClose}>✕</button>
            </div>

            <div className="mascot-questions">
              {faqs.map((faq, i) => (
                <button
                  key={i}
                  className={`faq-btn ${answer === i ? 'active' : ''}`}
                  onClick={() => setAnswer(i)}
                >
                  {faq.q}
                </button>
              ))}
            </div>

            {answer !== null && (
              <div className="mascot-answer">
                💍 {faqs[answer].a}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Mascot