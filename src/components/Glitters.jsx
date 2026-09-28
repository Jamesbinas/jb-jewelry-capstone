import { useEffect, useRef } from 'react'
import './Glitters.css'

function Glitter() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const particles = 35

    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div')
      particle.className = 'glitter-particle'

      const size = Math.random() * 4 + 2
      const left = Math.random() * 100
      const delay = Math.random() * 8
      const duration = Math.random() * 6 + 6
      const isGold = Math.random() > 0.5

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}vw;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        background: ${isGold ? '#FFD700' : '#B76E79'};
      `
      container.appendChild(particle)
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  return <div ref={containerRef} className="glitter-container" />
}

export default Glitter