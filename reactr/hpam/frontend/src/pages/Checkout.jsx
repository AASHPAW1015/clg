import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { getCart, clearCart } from '../cart'

const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })

function Checkout() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('Preparing payment...')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const cart = getCart()
    if (cart.length === 0) {
      navigate('/cart', { replace: true })
      return
    }
    pay(cart)
  }, [])

  const pay = async (cart) => {
    const ok = await loadRazorpay()
    if (!ok) {
      setError('Failed to load Razorpay. Check your internet.')
      return
    }

    try {
      const { data } = await api.post('/api/payment/create-order', {
        items: cart.map((c) => ({ productId: c.productId, qty: c.qty })),
      })

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: data.appName,
        description: 'Order payment',
        order_id: data.orderId,
        theme: { color: '#000000' },
        handler: () => {
          clearCart()
          setSuccess(true)
        },
        modal: {
          ondismiss: () => navigate('/cart', { replace: true }),
        },
      })

      rzp.on('payment.failed', (resp) => setError('Payment failed: ' + resp.error.description))
      rzp.open()
      setStatus('Razorpay opened. Complete the payment.')
    } catch (err) {
      setError(err.response?.data?.error || err.message)
    }
  }

  return (
    <div className="p-10 text-center bg-black min-h-screen text-white">
      {success ? (
        <div className="max-w-md mx-auto border border-neutral-800 rounded-lg p-10 bg-neutral-950">
          <h1 className="text-3xl font-bold mb-3">Payment successful</h1>
          <p className="text-neutral-400 mb-6">Thank you for your order.</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white text-black px-6 py-2 rounded hover:bg-neutral-200 font-medium"
            >
              Continue shopping
            </button>
          </div>
        </div>
      ) : error ? (
        <>
          <p className="text-neutral-400">{error}</p>
          <button onClick={() => navigate('/cart')} className="mt-4 text-white hover:underline">Back to cart</button>
        </>
      ) : (
        <p>{status}</p>
      )}
    </div>
  )
}

export default Checkout
