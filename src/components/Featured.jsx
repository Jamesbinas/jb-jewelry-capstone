import './Featured.css'

const products = [
  { id: 1, name: 'Gold Ring', price: 2500, category: 'Rings', type: 'Pre-loved' },
  { id: 2, name: 'Silver Necklace', price: 1800, category: 'Necklaces', type: 'New' },
  { id: 3, name: 'Custom Bracelet', price: 3200, category: 'Bracelets', type: 'Custom Made' },
]

function Featured() {
  return (
    <section className="featured">
      <h2 className="featured-title">Featured Pieces</h2>
      <div className="featured-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="card-image">📦</div>
            <span className="card-type">{product.type}</span>
            <h3 className="card-name">{product.name}</h3>
            <p className="card-price">₱{product.price.toLocaleString()}</p>
            <button className="card-btn">Order</button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Featured