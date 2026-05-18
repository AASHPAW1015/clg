import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, updateQty, removeFromCart, cartTotal } from '../cart'

function Cart() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const refresh = () => setCart(getCart())
    refresh()
    window.addEventListener('cart-updated', refresh)
    return () => window.removeEventListener('cart-updated', refresh)
  }, [])

  if (cart.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
          <div className="border border-neutral-800 rounded-lg p-10 bg-neutral-950 text-center max-w-md mx-auto">
            <p className="text-neutral-500 mb-4">Your cart is empty.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white text-black px-6 py-2 rounded hover:bg-neutral-200 font-medium"
            >
              Browse products
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8 gap-6 flex-wrap">
          <h1 className="text-4xl font-bold">Your Cart</h1>
          <div className="border border-neutral-800 rounded-lg p-5 bg-neutral-950 inline-flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-neutral-400">Cart total</p>
              <span className="text-xl font-bold">₹{cartTotal().toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-white text-black px-6 py-2 rounded hover:bg-neutral-200 font-medium"
            >
              Buy Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cart.map((item) => (
              <div key={item.productId} className="border border-neutral-800 rounded-lg p-4 bg-neutral-950 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-white">{item.name}</h3>
                  <span className="text-xs border border-neutral-700 text-neutral-300 px-2 py-0.5 rounded shrink-0">
                    × {item.qty}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">Unit price</p>
                <span className="inline-block text-xs border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded mt-1 self-start">
                  ₹{item.price.toFixed(2)}
                </span>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg font-semibold text-white">₹{(item.price * item.qty).toFixed(2)}</p>
                  <span className="text-xs text-neutral-400">Subtotal</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => updateQty(item.productId, item.qty - 1)}
                    className="w-8 h-8 flex items-center justify-center border border-neutral-700 rounded text-white hover:bg-neutral-900"
                  >−</button>
                  <span className="flex-1 text-center text-sm">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.productId, item.qty + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-neutral-700 rounded text-white hover:bg-neutral-900"
                  >+</button>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="mt-3 w-full border border-neutral-800 text-neutral-400 py-2 rounded hover:bg-neutral-900 hover:text-white text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Cart
