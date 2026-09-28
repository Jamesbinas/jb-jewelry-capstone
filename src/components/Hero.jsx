import { useState, useEffect } from 'react'
import './Hero.css'

const slides = [
  { emoji: '💍', label: 'Rings' },
  { emoji: '📿', label: 'Necklaces' },
  { emoji: '✨', label: 'Earrings' },
  { emoji: '⌚', label: 'Watches' },
  { emoji: '💎', label: 'Bracelets' },
]

function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">JB Jewelry</h1>
        <p className="hero-tagline">Crafted with love. Trusted for generations.</p>
        <div className="hero-buttons">
          <button className="hero-btn-signup">Sign Up</button>
          <button className="hero-btn-login">Login</button>
        </div>
      </div>

      <div className="hero-slideshow">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === current ? 'active' : ''}`}
          >
            {slide.emoji} {slide.label}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero