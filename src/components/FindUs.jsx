import './FindUs.css'

function FindUs() {
  return (
    <section className="findus">
      <div className="findus-header">
        <p className="findus-label">Find Us</p>
        <h2 className="findus-title">Come Visit The Shop</h2>
      </div>

      <div className="findus-content">
        <div className="findus-details">
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <div>
              <h4>Address</h4>
              <p>123 blah blah, city blah blah, Philippines</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">⏰</span>
            <div>
              <h4>Store Hours</h4>
              <p>Mon - Sat: 9AM - 7PM</p>
              <p>Sunday: 10AM - 5PM</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📱</span>
            <div>
              <h4>WhatsApp / Call</h4>
              <p>+12312312312</p>
            </div>
          </div>
        </div>

        <div className="findus-map">
          <div className="map-placeholder">🗺️ Map Placeholder</div>
        </div>
      </div>
    </section>
  )
}

export default FindUs