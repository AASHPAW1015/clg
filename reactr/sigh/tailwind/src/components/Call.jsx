import { useEffect, useState } from 'react';

const Call = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);
  
  return (
    <>
      <div>
        <h2 className = "text-3xl font-bold mb-4 align-center text-center bg-purple-300">Users List</h2>
        {users.map(user => 
          <div className="text-left p-8 bg-purple-200" > 
          <p key = {user.id} className = "mb-2 bg-white p-4 rounded shadow gap-2">{user.name}</p>
          <p key = {user.id}className="text-lg font-semibold">{user.email}</p> 
          </div>
        )}
      </div>
    </>
  );
}

export default Call
