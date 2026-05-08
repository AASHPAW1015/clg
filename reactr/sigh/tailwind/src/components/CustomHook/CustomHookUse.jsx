import useCustomHook from './CustomHook.jsx'

const CustomHookUse = () => {
  const [data, loading, error] = useCustomHook("https://jsonplaceholder.typicode.com/users")
  
  if (loading) return <div>Loading...</div>
  
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <ul>
        {data && data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default CustomHookUse


