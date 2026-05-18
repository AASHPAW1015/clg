const KEY = 'myshop_cart'

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export const saveCart = (cart) => {
  localStorage.setItem(KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event('cart-updated'))
}

export const addToCart = (product) => {
  const cart = getCart()
  const existing = cart.find((i) => i.productId === product._id)
  if (existing) {
    existing.qty += 1
  } else {
    cart.push({ productId: product._id, name: product.name, price: product.price, qty: 1 })
  }
  saveCart(cart)
}

export const updateQty = (productId, qty) => {
  const cart = getCart().map((i) => (i.productId === productId ? { ...i, qty } : i))
  saveCart(cart.filter((i) => i.qty > 0))
}

export const removeFromCart = (productId) => {
  saveCart(getCart().filter((i) => i.productId !== productId))
}

export const clearCart = () => saveCart([])

export const cartTotal = () => getCart().reduce((s, i) => s + i.price * i.qty, 0)
