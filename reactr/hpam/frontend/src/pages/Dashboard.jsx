import { useEffect, useState } from 'react'
import { api } from '../api'
import { addToCart } from '../cart'

function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/api/products')
      .then((r) => setProducts(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-10 text-center text-white">Loading products...</div>
  if (error) return <div className="p-10 text-center text-neutral-400">{error}</div>

  return (
    <div className="bg-black min-h-screen text-white">
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      {products.length === 0 ? (
        <p className="text-neutral-500">No products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => {
            const outOfStock = p.stock != null && p.stock <= 0
            return (
              <div key={p._id} className="border border-neutral-800 rounded-lg p-4 bg-neutral-950 flex flex-col">
                {p.image && <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded mb-3" />}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-white">{p.name}</h3>
                  {p.rating != null && (
                    <span className="text-xs border border-neutral-700 text-neutral-300 px-2 py-0.5 rounded shrink-0">
                      ★ {p.rating}
                    </span>
                  )}
                </div>
                {p.brand && <p className="text-xs text-neutral-500 mt-1">{p.brand}</p>}
                {p.category && (
                  <span className="inline-block text-xs border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded mt-1 self-start">
                    {p.category}
                  </span>
                )}
                {p.description && <p className="text-sm text-neutral-400 mt-2">{p.description}</p>}
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-semibold text-white">₹{p.price.toFixed(2)}</p>
                  {p.stock != null && (
                    <span className={`text-xs ${outOfStock ? 'text-neutral-600' : 'text-neutral-400'}`}>
                      {outOfStock ? 'Out of stock' : `${p.stock} in stock`}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(p)}
                  disabled={outOfStock}
                  className="mt-3 w-full bg-white text-black py-2 rounded hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed font-medium"
                >
                  {outOfStock ? 'Unavailable' : 'Add to Cart'}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
    </div>
  )
}

export default Dashboard
