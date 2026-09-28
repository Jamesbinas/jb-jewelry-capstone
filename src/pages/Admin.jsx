import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import './Admin.css'

const ADMIN_EMAIL = 'grandpa@jbjewelry.com'

function Admin() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [repairs, setRepairs] = useState([])
  const [products, setProducts] = useState([])
  const [activeTab, setActiveTab] = useState('orders')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [editingProduct, setEditingProduct] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', category: '', type: '',
    stock: '', status: 'Available', description: '', image_url: ''
  })

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session || session.user.email !== ADMIN_EMAIL) {
        navigate('/')
        return
      }

      setUser(session.user)
      await fetchAll()
      setLoading(false)
    }
    init()
  }, [])

  async function fetchAll() {
    const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    const { data: repairsData } = await supabase.from('repairs').select('*').order('created_at', { ascending: false })
    const { data: productsData } = await supabase.from('products').select('*').order('created_at', { ascending: false })

    setOrders(ordersData || [])
    setRepairs(repairsData || [])
    setProducts(productsData || [])
  }

  async function updateOrderStatus(id, status) {
    await supabase.from('orders').update({ status }).eq('id', id)
    await fetchAll()
  }

  async function updateRepairStatus(id, status) {
    await supabase.from('repairs').update({ status }).eq('id', id)
    await fetchAll()
  }

  async function deleteProduct(id) {
    await supabase.from('products').delete().eq('id', id)
    await fetchAll()
  }

  async function handleAddProduct() {
    if (!newProduct.name || !newProduct.price || !newProduct.category) return

    await supabase.from('products').insert([{
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    }])

  setNewProduct({
    name: '', price: '', category: '', type: '',
    stock: '', status: 'Available', description: '', image_url: ''
  })
  setShowAddForm(false)
  await fetchAll()
}
 async function handleEditProduct() {
  await supabase.from('products').update({
    name: editingProduct.name,
    price: parseFloat(editingProduct.price),
    category: editingProduct.category,
    type: editingProduct.type,
    stock: parseInt(editingProduct.stock),
    status: editingProduct.status,
    description: editingProduct.description,
    image_url: editingProduct.image_url
  }).eq('id', editingProduct.id)

  setEditingProduct(null)
  await fetchAll()
}

  if (loading) return <div className="admin-loading">Loading dashboard...</div>

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>👑 Grandpa's Dashboard</h1>
        <p>Welcome back, {user?.email}</p>
      </div>

      <div className="admin-tabs">
        {['orders', 'repairs', 'products'].map(tab => (
          <button
            key={tab}
            className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'orders' && (
        <div className="admin-section">
          <h2>Orders ({orders.length})</h2>
          {orders.length === 0 ? <p className="admin-empty">No orders yet!!</p> : (
            orders.map(order => (
              <div key={order.id} className="admin-card">
                <div className="admin-card-header">
                  <span className="admin-code">{order.order_code}</span>
                  <span className="admin-customer">{order.customer_name} — {order.customer_phone}</span>
                </div>
                <div className="admin-items">
                  {order.items.map((item, i) => (
                    <span key={i}>{item.name} ×{item.quantity}</span>
                  ))}
                </div>
                <div className="admin-card-footer">
                  <span className="admin-total">₱{order.total.toLocaleString()}</span>

                    <a href={`https://wa.me/${order.customer_phone.replace(/\D/g,'')}`}
                    target="_blank"
                    className="admin-whatsapp"

                    >
                      💬 WhatsApp
                    </a>

                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="admin-select"
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'repairs' && (
        <div className="admin-section">
          <h2>Repair Requests ({repairs.length})</h2>
          {repairs.length === 0 ? <p className="admin-empty">No repair requests yet!!</p> : (
            repairs.map(repair => (
              <div key={repair.id} className="admin-card">
                <div className="admin-card-header">
                  <span className="admin-customer">{repair.customer_name} — {repair.customer_phone}</span>
                </div>
                <div className="admin-items">
                  {repair.services.map((s, i) => (
                    <span key={i}>{s.name}</span>
                  ))}
                </div>
                {repair.notes && <p className="admin-notes">Notes: {repair.notes}</p>}
                <div className="admin-card-footer">

                    href={`https://wa.me/${repair.customer_phone.replace(/^0/, '')}`}
                    target="_blank"
                    className="admin-whatsapp"
                 
                  <select
                    value={repair.status}
                    onChange={(e) => updateRepairStatus(repair.id, e.target.value)}
                    className="admin-select"
                  >
                    <option>Received</option>
                    <option>In Progress</option>
                    <option>Ready for Pickup</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'products' && (
        <div className="admin-section">
          <div className="admin-products-header">
            <h2>Products ({products.length})</h2>
            <button
              className="admin-add-btn"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? '✕ Cancel' : '+ Add Product'}
            </button>
          </div>

        {showAddForm && (
          <div className="admin-add-form">
            <input placeholder="Product Name *" value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
            <input placeholder="Price (₱) *" type="number" value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
            <select value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
              <option value="">Select Category *</option>
              <option>Rings</option>
              <option>Necklaces</option>
              <option>Earrings</option>
              <option>Bracelets</option>
              <option>Watches</option>
            </select>

            <select value={newProduct.type}
              onChange={(e) => setNewProduct({...newProduct, type: e.target.value})}>
              <option value="">Select Type</option>
              <option>New</option>
              <option>Pre-loved</option>
              <option>Custom Made</option>
            </select>

            <input placeholder="Stock" type="number" value={newProduct.stock}
              onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} />
            <select value={newProduct.status}
              onChange={(e) => setNewProduct({...newProduct, status: e.target.value})}>
              <option>Available</option>
              <option>Reserved</option>
              <option>Sold</option>
            </select>

            <input placeholder="Image URL" value={newProduct.image_url}
              onChange={(e) => setNewProduct({...newProduct, image_url: e.target.value})} />
            <input placeholder="Description" value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} />
            <button className="admin-submit-btn" onClick={handleAddProduct}>
              Add Product
            </button>
          </div>
        )}
        {products.map(product => (
          <div key={product.id} className="admin-card">
            {editingProduct?.id === product.id ? (
              <div className="admin-add-form">
                <input placeholder="Product Name" value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
                <input placeholder="Price (₱)" type="number" value={editingProduct.price}
                  onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} />
                <select value={editingProduct.category}
                  onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}>
                  <option>Rings</option>
                  <option>Necklaces</option>
                  <option>Earrings</option>
                  <option>Bracelets</option>
                  <option>Watches</option>
                </select>
                <select value={editingProduct.type}
                  onChange={(e) => setEditingProduct({...editingProduct, type: e.target.value})}>
                  <option>New</option>
                  <option>Pre-loved</option>
                  <option>Custom Made</option>
                </select>
                <input placeholder="Stock" type="number" value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})} />
                <select value={editingProduct.status}
                  onChange={(e) => setEditingProduct({...editingProduct, status: e.target.value})}>
                  <option>Available</option>
                  <option>Reserved</option>
                  <option>Sold</option>
                </select>
                <input placeholder="Image URL" value={editingProduct.image_url}
                  onChange={(e) => setEditingProduct({...editingProduct, image_url: e.target.value})} />
                <input placeholder="Description" value={editingProduct.description}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} />
                <div className="admin-edit-actions">
                  <button className="admin-submit-btn" onClick={handleEditProduct}>Save</button>
                  <button className="admin-cancel-btn" onClick={() => setEditingProduct(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="admin-card-header">
                <span className="admin-code">{product.name}</span>
                <span className="admin-customer">{product.category} — {product.type}</span>
                <div className="admin-card-footer">
                  <span className="admin-total">₱{product.price.toLocaleString()} | Stock: {product.stock}</span>
                  <button
                    className="admin-edit"
                    onClick={() => setEditingProduct({...product})}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-delete"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
             )}
         </div>
        ))}
        </div>
      )}
    </div>
  )
}

export default Admin