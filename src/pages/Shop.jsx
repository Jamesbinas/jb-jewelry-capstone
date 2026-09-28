import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import './Shop.css'

const filters = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches']

function Shop({ addToCart }) {
  const [active, setActive] = useState('All')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
      if (error) {
        console.error(error)
      } else {
        setProducts(data)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const filtered = active === 'All'
    ? products
    : products.filter(p => p.category === active)

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1 className="shop-title">Our Collection</h1>
        <p className="shop-sub">Handpicked pieces, crafted with love</p>
      </div>

      <div className="shop-filters">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-btn ${active === f ? 'active' : ''}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="shop-loading">Loading collection...</p>
      ) : filtered.length === 0 ? (
        <p className="shop-loading">No products yet!!</p>
      ) : (
        <div className="shop-grid">
          {filtered.map(product => (
            <div key={product.id} className="product-card">
              <div className="card-image">
                {product.image_url
                  ? <img src={product.image_url} alt={product.name} />
                  : '💍'}
              </div>
              <span className="card-type">{product.type}</span>
              <h3 className="card-name">{product.name}</h3>
              <p className="card-price">₱{product.price.toLocaleString()}</p>
              <p className="card-status">{product.status}</p>
              <button
                className="card-btn"
                onClick={() => addToCart(product)}
                disabled={product.status !== 'Available'}
              >
                {product.status === 'Available' ? 'Add to Cart' : product.status}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Shop