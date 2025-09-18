import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart,
  Home as HomeIcon,
  BookOpen,
  Flag,
  Bell,
  Activity,
  Calendar,
  Package,
  TrendingUp,
} from 'lucide-react'
import './App.css'

/** -----------------------------
 *  Demo Data
 *  ----------------------------- */
const missions = [
  { title: 'Empower Youth', description: 'Providing resources and support to help young people succeed.' },
  { title: 'Community Engagement', description: 'Building strong connections through local events and programs.' },
  { title: 'Sustainable Growth', description: 'Fostering long-term development for a better future.' },
]

const inventory = [
  { id: 1, name: 'T-Shirt', price: 20, description: 'Comfortable cotton t-shirt', image: 'https://images.unsplash.com/photo-1520975961120-6c46d8d8d8a6?w=400&auto=format&fit=crop' },
  { id: 2, name: 'Mug', price: 10, description: 'Ceramic mug with logo', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&auto=format&fit=crop' },
  { id: 3, name: 'Sticker Pack', price: 5, description: 'Set of 5 stickers', image: 'https://images.unsplash.com/photo-1607083206968-13617fbbf5d0?w=400&auto=format&fit=crop' },
  { id: 4, name: 'Hoodie', price: 35, description: 'Cozy hoodie with front pocket', image: 'https://images.unsplash.com/photo-1617957741643-c1a503d17b96?w=400&auto=format&fit=crop' },
  { id: 5, name: 'Cap', price: 15, description: 'Adjustable baseball cap', image: 'https://images.unsplash.com/photo-1622445276279-c57a2a72e8d1?w=400&auto=format&fit=crop' },
]

type CartItem = { id: number; name: string; price: number; quantity: number }

const updates = [
  { id: 'u1', title: 'New community clean-up route', detail: 'Two new homes added to Friday route.', tag: 'Operations', when: 'Today', impact: 'Low' as const },
  { id: 'u2', title: 'Volunteer onboarding refreshed', detail: 'Shorter form + SMS reminders.', tag: 'Volunteers', when: 'This week', impact: 'Medium' as const },
  { id: 'u3', title: 'Shop drop: fall items', detail: 'New consigned items—proceeds fund services.', tag: 'Shop', when: 'This week', impact: 'High' as const },
]

/** -----------------------------
 *  Helpers
 *  ----------------------------- */
function currency(n: number) {
  return `$${n.toFixed(2)}`
}
function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/** -----------------------------
 *  App
 *  ----------------------------- */
export default function App() {
  const [tab, setTab] = useState<'home' | 'mission' | 'program' | 'updates' | 'shop'>('home')
  const [cart, setCart] = useState<CartItem[]>([])
  const [query, setQuery] = useState('')

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0)
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const filteredInventory = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return inventory
    return inventory.filter(i => `${i.name} ${i.description}`.toLowerCase().includes(q))
  }, [query])

  function addToCart(item: Omit<CartItem, 'quantity'>) {
    setCart(prev => {
      const found = prev.find(i => i.id === item.id)
      if (found) return prev.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      return [...prev, { ...item, quantity: 1 }]
    })
  }
  function removeFromCart(id: number) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const year = new Date().getFullYear()

  return (
    <div className="app-container">
      {/* Header */}
      <header className="site-header">
        <h1 className="site-title">Trillogy Empowers</h1>
        <nav className="tabbar">
          <button className={cx('tab', tab === 'home' && 'active')} onClick={() => setTab('home')} aria-label="Home">
            <HomeIcon size={18} /> Home
          </button>
          <button className={cx('tab', tab === 'mission' && 'active')} onClick={() => setTab('mission')} aria-label="Mission">
            <Flag size={18} /> Mission
          </button>
          <button className={cx('tab', tab === 'program' && 'active')} onClick={() => setTab('program')} aria-label="Program">
            <BookOpen size={18} /> Program
          </button>
          <button className={cx('tab', tab === 'updates' && 'active')} onClick={() => setTab('updates')} aria-label="Updates">
            <Bell size={18} /> Updates
          </button>
          <button className={cx('tab', tab === 'shop' && 'active')} onClick={() => setTab('shop')} aria-label="Shop">
            <ShoppingCart size={18} /> Shop ({cartCount})
          </button>
        </nav>
      </header>

      {/* Body */}
      <main className="site-main">
        <AnimatePresence mode="wait">
          {tab === 'home' && (
            <motion.section key="home" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="card">
              <h2 className="section-title">Welcome to Trillogy Empowers</h2>
              <p className="muted">We are dedicated to empowering youth and building strong communities through innovative programs and initiatives.</p>

              {/* Gallery (multiple pictures, compact like the website) */}
              <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {[
                  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1520975922325-24c44fbe5f2c?q=80&w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1516542076529-1ea3854896e1?q=80&w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1520975693415-1f94f979e1a5?q=80&w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop'
                ].map((src, idx) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}
                  >
                    <img
                      src={src}
                      alt={`Gallery ${idx + 1}`}
                      style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="stat-row">
                <div className="stat">
                  <Activity size={18} />
                  <span>Weekly Visits</span>
                  <strong>12</strong>
                </div>
                <div className="stat">
                  <Calendar size={18} />
                  <span>Upcoming Shifts</span>
                  <strong>7</strong>
                </div>
                <div className="stat">
                  <TrendingUp size={18} />
                  <span>Items Sold</span>
                  <strong>58</strong>
                </div>
              </div>
            </motion.section>
          )}

          {tab === 'mission' && (
            <motion.section key="mission" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="card">
              <h2 className="section-title">Our Mission</h2>
              <ul className="stack">
                {missions.map(m => (
                  <li key={m.title} className="bullet">
                    <h3 className="bullet-title">{m.title}</h3>
                    <p className="muted">{m.description}</p>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {tab === 'program' && (
            <motion.section key="program" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="card">
              <h2 className="section-title">Our Program</h2>
              <p className="muted center">Our programs focus on education, mentorship, and community involvement to create lasting impact.</p>
              <ul className="two-col">
                <li>After-school tutoring and workshops</li>
                <li>Mentorship matching with professionals</li>
                <li>Community service projects and events</li>
              </ul>
            </motion.section>
          )}

          {tab === 'updates' && (
            <motion.section key="updates" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <div className="grid">
                {/* Timeline */}
                <div className="card">
                  <h2 className="section-title">Update Bay</h2>
                  <ul className="updates">
                    {updates.map(u => (
                      <li key={u.id} className="update-row">
                        <div className="update-icon"><Bell size={18} /></div>
                        <div className="update-main">
                          <div className="update-title"><strong>{u.title}</strong></div>
                          <div className="update-detail muted">{u.detail}</div>
                          <div className="update-tags">
                            <span className="tag">{u.tag}</span>
                            <span className="tag ghost">{u.when}</span>
                            <span className={cx('tag', u.impact === 'High' && 'danger', u.impact === 'Medium' && 'warn')}>{u.impact} impact</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Side panel */}
                <div className="card">
                  <h3 className="section-subtitle"><Calendar size={16} /> This Week</h3>
                  <ul className="stack small">
                    <li>Tue 4:00 PM — Volunteer onboarding call</li>
                    <li>Thu 11:00 AM — Route C home visit</li>
                    <li>Fri 1:00 PM — Shop intake (donations & consignment)</li>
                  </ul>

                  <div className="divider" />

                  <h3 className="section-subtitle"><Package size={16} /> Shop Highlights</h3>
                  <ul className="stack small">
                    <li>New: Fall household bundle</li>
                    <li>Restock: Reading lamps</li>
                    <li>Sale: Cozy throw blanket</li>
                  </ul>
                </div>
              </div>
            </motion.section>
          )}

          {tab === 'shop' && (
            <motion.section key="shop" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="card">
              <h2 className="section-title">Shop</h2>

              <div className="search">
                <input className="input" placeholder="Search items…" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>

              <div className="inventory">
                {filteredInventory.map(item => (
                  <div key={item.id} className="item-card">
                    {item.image && (
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
                    )}
                    <h3>{item.name}</h3>
                    <p className="muted">{item.description}</p>
                    <p className="price">{currency(item.price)}</p>
                    <button className="button" onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}>
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>

              <h3 className="section-subtitle cart-title">Your Cart</h3>
              {cart.length === 0 ? (
                <p className="muted">Your cart is empty.</p>
              ) : (
                <ul className="cart-list">
                  {cart.map(({ id, name, price, quantity }) => (
                    <li key={id} className="cart-item">
                      <span>{name} × {quantity}</span>
                      <span>{currency(price * quantity)}</span>
                      <button className="icon-btn" onClick={() => removeFromCart(id)} aria-label={`Remove ${name} from cart`}>×</button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="cart-total">Total: {currency(total)}</div>
              <button className="button primary" disabled={cart.length === 0}>Checkout (mock)</button>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <p>© {year} Trillogy Empowers. All rights reserved.</p>
      </footer>
    </div>
  )
}
