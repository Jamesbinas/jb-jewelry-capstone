import './Contact.css'

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1 className="contact-title">Get In Touch</h1>
        <p className="contact-sub">We'd love to hear from you</p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <div className="contact-icon">📍</div>
          <h3>Visit Us</h3>
          <p>123 Jewelry Street<br/>Doha, Qatar</p>
        </div>

        <div className="contact-card">
          <div className="contact-icon">⏰</div>
          <h3>Store Hours</h3>
          <p>Mon - Sat: 9AM - 7PM<br/>Sunday: 10AM - 5PM</p>
        </div>

        <div className="contact-card">
          <div className="contact-icon">📱</div>
          <h3>Call or WhatsApp</h3>
          <p>+63 912 345 6789</p>
        </div>

        <div className="contact-card">
          <div className="contact-icon">📧</div>
          <h3>Email Us</h3>
          <p>jbjewelry@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Contact