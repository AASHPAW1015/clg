import { useEffect, useState } from 'react'

const EffectHook = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const fetchUser = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://randomuser.me/api/')
      const data = await response.json()
      setUser(data.results[0])  
      setLoading(false)
    } 
    catch (error) {
      console.error("Fetch Error:", error);
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchUser()
  }, [])
  
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <h2 className="text-center text-xl font-semibold">Loading User.....</h2>
    </div>
  )
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md border border-gray-300 p-6 rounded-2xl shadow-lg bg-white">
        <img 
          src={user.picture.large} 
          alt="user" 
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />  
        <h1 className="text-2xl font-bold text-center mb-2">
          {user.name.first} {user.name.last}
        </h1>
        <p className="text-gray-600 text-center mb-4">Email: {user.email}</p>
        <button 
          onClick={fetchUser}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Get New User
        </button>
      </div>
    </div>
  );
}

export default EffectHook
